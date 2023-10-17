package com.campusdual.springontimize.api.core.service;


import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;


public interface IAllergenService {

    public EntityResult allergenQuery(Map<String, Object> keyMap, List<String> attrList);
    public EntityResult allergenInsert(Map<String, Object> attrMap);
    public EntityResult allergenUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);
    public EntityResult allergenDelete(Map<String, Object> keyMap);
}