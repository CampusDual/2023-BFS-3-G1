package com.campusdual.springontimize.api.core.service;


import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;


public interface ICountryService {

    public EntityResult countryQuery(Map<String, Object> keyMap, List<String> attrList);
    public EntityResult countryInsert(Map<String, Object> attrMap);
    public EntityResult countryUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);
    public EntityResult countryDelete(Map<String, Object> keyMap);
}