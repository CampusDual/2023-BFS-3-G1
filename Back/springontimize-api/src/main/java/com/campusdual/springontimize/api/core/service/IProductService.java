package com.campusdual.springontimize.api.core.service;


import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;


public interface IProductService {

    public EntityResult productQuery(Map<String, Object> keyMap, List<String> attrList);
    public EntityResult productInsert(Map<String, Object> attrMap);
    public EntityResult productUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);
    public EntityResult productDelete(Map<String, Object> keyMap);
    public EntityResult featuredproductQuery(Map<String, Object> keyMap, List<String> attrList);
    // Para traernos los productos con datos relacionados para las tablas
    public EntityResult productTableQuery(Map<String, Object> keyMap, List<String> attrList);
    // Quiero los productos del vendedor que está logueado
    public EntityResult wholesalerproductQuery(Map<String, Object> keyMap, List<String> attrList);


}