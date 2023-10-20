package com.campusdual.springontimize.api.core.service;


import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;


public interface ISaleService {

    public EntityResult saleQuery(Map<String, Object> keyMap, List<String> attrList);
    public EntityResult saleInsert(Map<String, Object> attrMap);
    public EntityResult saleUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);
    public EntityResult saleDelete(Map<String, Object> keyMap);
}