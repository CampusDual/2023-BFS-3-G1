package com.campusdual.springontimize.model.core.service;

import com.campusdual.springontimize.api.core.service.ISaleOrdersHService;
import com.campusdual.springontimize.model.core.dao.SaleOrdersLDao;
import com.campusdual.springontimize.model.core.dao.SaleOrdersHDao;
import com.campusdual.springontimize.model.core.dao.ShoppingCartDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Lazy
@Service("SaleOrdersHService")
public class SaleOrdersHService implements ISaleOrdersHService {

    @Autowired
    private SaleOrdersHDao saleOrdersHDao;
    @Autowired
    private SaleOrdersLDao saleOrdersLDao;
    @Autowired
    private ShoppingCartDao shoppingCartDao;
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;


    //Sample to permission
    //@Secured({ PermissionsProviderSecured.SECURED })
    public EntityResult saleordershQuery(Map<String, Object> keyMap, List<String> attrList) {
        return this.daoHelper.query(saleOrdersHDao, keyMap, attrList);
    }

    public EntityResult saleordershInsert(Map<String, Object> attrMap) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); //Recogemos el nombre de usuario
        attrMap.put(SaleOrdersHDao.ATTR_USER_, authentication.getName());
        attrMap.put(SaleOrdersHDao.ATTR_SALEDATE, new Date()); //Recogemos la fecha del pedido
        EntityResult resultInsert = this.daoHelper.insert(saleOrdersHDao, attrMap);
        if (resultInsert.isWrong()) { //En caso de que haya fallado la consulta devolvemos el error al front
            return resultInsert;
        }
        Integer saleId = (Integer) resultInsert.get(SaleOrdersHDao.ATTR_ID);// guardamos el id de la cabecera del pedido
        Date saleDate = (Date) attrMap.get(SaleOrdersHDao.ATTR_SALEDATE);
        List<String> fields = new ArrayList<>(); //campos por los cuales voy a consultar
        fields.add(ShoppingCartDao.ATTR_USER_);
        fields.add(ShoppingCartDao.ATTR_PRODUCT_ID);
        fields.add(ShoppingCartDao.ATTR_QTY);
        fields.add(ShoppingCartDao.ATTR_PRICE);
        fields.add(ShoppingCartDao.ATTR_TOTAL);
        Map<String, Object> filter = new HashMap<>(); //filtro que voy a realizar para la consulta para saber si ya existe en el carrito el producto
        filter.put(ShoppingCartDao.ATTR_USER_, authentication.getName());
        EntityResult shoppingCartLines = daoHelper.query(shoppingCartDao, filter, fields); // hago la consulta para ver si tengo ese producto y cuantos tengo
        int i;
        for (i = 0; i < shoppingCartLines.calculateRecordNumber(); i++) {
            Integer id = (Integer) shoppingCartLines.getRecordValues(i).get(ShoppingCartDao.ATTR_QTY);
            Map<String, Object> updateKeys = new HashMap<>();
            updateKeys.put(SaleOrdersLDao.ATTR_PRODUCT_ID, shoppingCartLines.getRecordValues(i).get(ShoppingCartDao.ATTR_PRODUCT_ID));
            updateKeys.put(SaleOrdersLDao.ATTR_USER_, attrMap.put(SaleOrdersHDao.ATTR_USER_, authentication.getName()));
            updateKeys.put(SaleOrdersLDao.ATTR_QTY, shoppingCartLines.getRecordValues(i).get(ShoppingCartDao.ATTR_QTY));
            updateKeys.put(SaleOrdersLDao.ATTR_TOTAL, shoppingCartLines.getRecordValues(i).get(ShoppingCartDao.ATTR_TOTAL));
			updateKeys.put(SaleOrdersLDao.ATTR_SALEORDERSH_ID, saleId);
			updateKeys.put(SaleOrdersLDao.ATTR_PRICE, shoppingCartLines.getRecordValues(i).get(ShoppingCartDao.ATTR_PRICE));
			updateKeys.put(SaleOrdersLDao.ATTR_SALEDATE, saleDate);
			EntityResult result =this.daoHelper.insert(this.saleOrdersLDao,updateKeys);
        }
        Map<String, Object> deleteFilter = new HashMap<>();
        deleteFilter.put(ShoppingCartDao.ATTR_USER_, authentication.getName());
        //EntityResult deleteResult=this.daoHelper.delete(this.shoppingCartDao,deleteFilter);
        return resultInsert;
    }

    public EntityResult saleordershUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
        return this.daoHelper.update(saleOrdersHDao, attrMap, keyMap);
    }

    public EntityResult saleordershDelete(Map<String, Object> keyMap) {
        return this.daoHelper.delete(this.saleOrdersHDao, keyMap);
    }

    @Override
    public EntityResult saleordershtotalQuery(Map<String, Object> keyMap, List<String> attrList) {
        return this.daoHelper.query(saleOrdersHDao, keyMap, attrList, SaleOrdersHDao.QUERY_VTOTAL);
    }

}
