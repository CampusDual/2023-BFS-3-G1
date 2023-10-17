package com.campusdual.springontimize.api.core.service;


import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;


public interface ICategoryService {

    public EntityResult categoryQuery(Map<String, Object> keyMap, List<String> attrList);
    public EntityResult categoryInsert(Map<String, Object> attrMap);
    public EntityResult categoryUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);
    public EntityResult categoryDelete(Map<String, Object> keyMap);
}