package com.campusdual.springontimize.api.core.service;


import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;


public interface ISalesHeadService {

    public EntityResult salesHeadQuery(Map<String, Object> keyMap, List<String> attrList);
    public EntityResult salesHeadInsert(Map<String, Object> attrMap);
    public EntityResult salesHeadUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);
    public EntityResult salesHeadDelete(Map<String, Object> keyMap);
    public EntityResult salesHeadTotalQuery(Map<String, Object> keyMap, List<String> attrList);
}