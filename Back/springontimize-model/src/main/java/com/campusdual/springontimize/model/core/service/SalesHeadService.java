package com.campusdual.springontimize.model.core.service;

import com.campusdual.springontimize.api.core.service.ISaleService;
import com.campusdual.springontimize.api.core.service.ISalesHeadService;
import com.campusdual.springontimize.model.core.dao.SaleDao;
import com.campusdual.springontimize.model.core.dao.SalesHeadDao;
import com.campusdual.springontimize.model.core.dao.ShoppingCartDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.*;

@Lazy
@Service("SalesHeadService")
public class SalesHeadService implements ISalesHeadService {

    @Autowired
    private SalesHeadDao salesHeadDao;
    @Autowired
    private SaleDao saleDao;
    @Autowired
    private ShoppingCartDao shoppingCartDao;
    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;


    //Sample to permission
    //@Secured({ PermissionsProviderSecured.SECURED })
    public EntityResult salesHeadQuery(Map<String, Object> keyMap, List<String> attrList) {
        return this.daoHelper.query(salesHeadDao, keyMap, attrList);
    }

    public EntityResult salesHeadInsert(Map<String, Object> attrMap) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); //Recogemos el nombre de usuario
        attrMap.put(SalesHeadDao.ATTR_USER_, authentication.getName());
        attrMap.put(SalesHeadDao.ATTR_SALEDATE, new Date()); //Recogemos la fecha del pedido
        EntityResult resultInsert = this.daoHelper.insert(salesHeadDao, attrMap);
        if (resultInsert.isWrong()) { //En caso de que haya fallado la consulta devolvemos el error al front
            return resultInsert;
        }
        Integer saleId = (Integer) resultInsert.get(SalesHeadDao.ATTR_ID);// guardamos el id de la cabecera del pedido
        Date saleDate = (Date) attrMap.get(SalesHeadDao.ATTR_SALEDATE);
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
            updateKeys.put(SaleDao.ATTR_PRODUCT_ID, shoppingCartLines.getRecordValues(i).get(ShoppingCartDao.ATTR_PRODUCT_ID));
            updateKeys.put(SaleDao.ATTR_USER_, attrMap.put(SalesHeadDao.ATTR_USER_, authentication.getName()));
            updateKeys.put(SaleDao.ATTR_QTY, shoppingCartLines.getRecordValues(i).get(ShoppingCartDao.ATTR_QTY));
            updateKeys.put(SaleDao.ATTR_TOTAL, shoppingCartLines.getRecordValues(i).get(ShoppingCartDao.ATTR_TOTAL));
			updateKeys.put(SaleDao.ATTR_SALES_HEAD_ID, saleId);
			updateKeys.put(SaleDao.ATTR_PRICE, shoppingCartLines.getRecordValues(i).get(ShoppingCartDao.ATTR_PRICE));
			updateKeys.put(SaleDao.ATTR_SALEDATE, saleDate);
			EntityResult result =this.daoHelper.insert(this.saleDao,updateKeys);
        }
        Map<String, Object> deleteFilter = new HashMap<>();
        deleteFilter.put(ShoppingCartDao.ATTR_USER_, authentication.getName());
        EntityResult deleteResult=this.daoHelper.delete(this.shoppingCartDao,deleteFilter);
        return resultInsert;
    }

    public EntityResult salesHeadUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
        return this.daoHelper.update(salesHeadDao, attrMap, keyMap);
    }

    public EntityResult salesHeadDelete(Map<String, Object> keyMap) {
        return this.daoHelper.delete(this.salesHeadDao, keyMap);
    }

    @Override
    public EntityResult salesHeadTotalQuery(Map<String, Object> keyMap, List<String> attrList) {
        return this.daoHelper.query(salesHeadDao, keyMap, attrList, SalesHeadDao.QUERY_VSALESHEADTOTAL);
    }

}
