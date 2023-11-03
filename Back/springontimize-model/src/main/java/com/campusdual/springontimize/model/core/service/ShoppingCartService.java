package com.campusdual.springontimize.model.core.service;

import com.campusdual.springontimize.api.core.service.IShoppingCartService;
import com.campusdual.springontimize.model.core.dao.ShoppingCartDao;
import com.campusdual.springontimize.model.core.dao.WholesalerDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.swing.text.Keymap;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("ShoppingCartService")
@Lazy
public class ShoppingCartService implements IShoppingCartService {
    @Autowired private ShoppingCartDao shoppingCartDao;
    @Autowired private DefaultOntimizeDaoHelper daoHelper;
    @Override
    public EntityResult shoppingcartQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException {
        return this.daoHelper.query(this.shoppingCartDao, keyMap,attrList);
    }

    @Override
    public EntityResult shoppingcartInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException {
        List<String> fields = new ArrayList<>(); //campos por los cuales voy a consultar
        fields.add(ShoppingCartDao.ATTR_QTY);
        fields.add(ShoppingCartDao.ATTR_PRODUCT_ID);
        fields.add(ShoppingCartDao.ATTR_ID);
        Map<String, Object> filter = new HashMap<>(); //filtro que voy a realizar para la consulta para saber si ya existe en el carrito el producto
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        filter.put(ShoppingCartDao.ATTR_USER_,authentication.getName());
        filter.put(ShoppingCartDao.ATTR_PRODUCT_ID,attrMap.get(ShoppingCartDao.ATTR_PRODUCT_ID));
        EntityResult existQuery= daoHelper.query(shoppingCartDao, filter, fields); // hago la consulta para ver si tengo ese producto y cuantos tengo
        if(existQuery.isWrong()){ //En caso de que haya fallado la consulta devolvemos el error al front
            return existQuery;
        }
        if (existQuery.isEmpty()){ // Hago la comprobación de si el carrito está vacío
            attrMap.put(ShoppingCartDao.ATTR_USER_,authentication.getName());
            return this.daoHelper.insert(this.shoppingCartDao,attrMap);
        }
        Integer nProducts= (Integer) existQuery.getRecordValues(0).get(ShoppingCartDao.ATTR_QTY); // De aquí saco el numero de productos que tiene el producto que estoy buscando
        Map<String,Object> updateKeys = new HashMap<>();
        updateKeys.put(ShoppingCartDao.ATTR_ID,existQuery.getRecordValues(0).get(ShoppingCartDao.ATTR_ID) ); //Creo un filtro para realizar una actualización a partir del id del carrito
        Map<String, Object> atributes = new HashMap<>();
        atributes.put(ShoppingCartDao.ATTR_QTY,nProducts + (Integer.parseInt(attrMap.get(ShoppingCartDao.ATTR_QTY).toString())) ); // Hago la actualización del carrito
        return this.daoHelper.update(shoppingCartDao, atributes , updateKeys);
    }

    @Override
    public EntityResult shoppingcartUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.shoppingCartDao,attrMap,keyMap);
    }

    @Override
    public EntityResult shoppingcartDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.shoppingCartDao,keyMap);
    }
}
