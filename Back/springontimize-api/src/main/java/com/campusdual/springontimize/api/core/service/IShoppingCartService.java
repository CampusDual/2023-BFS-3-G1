package com.campusdual.springontimize.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.exceptions.OntimizeJEERuntimeException;

import java.util.List;
import java.util.Map;

public interface IShoppingCartService {
    public EntityResult shoppingcartQuery(Map<String, Object> keyMap, List<String> attrList) throws OntimizeJEERuntimeException;
    public EntityResult shoppingcartInsert(Map<String, Object> attrMap) throws OntimizeJEERuntimeException;
    public EntityResult shoppingcartUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
    public EntityResult shoppingcartDelete(Map<String, Object> keyMap) throws OntimizeJEERuntimeException;
}
