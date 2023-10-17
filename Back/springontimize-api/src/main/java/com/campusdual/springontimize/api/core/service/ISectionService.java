package com.campusdual.springontimize.api.core.service;


import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;


public interface ISectionService {

    public EntityResult sectionQuery(Map<String, Object> keyMap, List<String> attrList);
    public EntityResult sectionInsert(Map<String, Object> attrMap);
    public EntityResult sectionUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);
    public EntityResult sectionDelete(Map<String, Object> keyMap);
}