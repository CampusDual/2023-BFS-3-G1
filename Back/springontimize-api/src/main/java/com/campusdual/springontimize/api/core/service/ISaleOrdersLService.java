package com.campusdual.springontimize.api.core.service;


import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;


public interface ISaleOrdersLService {

    public EntityResult saleorderslQuery(Map<String, Object> keyMap, List<String> attrList);
    public EntityResult saleorderslInsert(Map<String, Object> attrMap);
    public EntityResult saleorderslUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);
    public EntityResult saleorderslDelete(Map<String, Object> keyMap);
}