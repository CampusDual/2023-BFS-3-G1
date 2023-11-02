package com.campusdual.springontimize.model.core.service;

import com.campusdual.springontimize.api.core.service.IShoppingCartService;
import com.campusdual.springontimize.model.core.dao.ShoppingCartDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import javax.swing.text.Keymap;
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
        return this.daoHelper.insert(this.shoppingCartDao,attrMap);
    }

    @Override
    public EntityResult shoppingcartUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.update(this.shoppingCartDao,keyMap,attrMap);
    }

    @Override
    public EntityResult shoppingcartDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException {
        return this.daoHelper.delete(this.shoppingCartDao,keyMap);
    }
}
