package com.campusdual.springontimize.api.core.service;


import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;


public interface IWholesalerService {

    public EntityResult wholesalerQuery(Map<String, Object> keyMap, List<String> attrList);
    public EntityResult wholesalerInsert(Map<String, Object> attrMap);
    public EntityResult wholesalerUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);
    public EntityResult wholesalerDelete(Map<String, Object> keyMap);

    // Obtiene el total de ventas de un mayorista
    public EntityResult wholesalerbalanceQuery(Map<String, Object> keyMap, List<String> attrList);

    // Obtiene una lista con todas las ventas del mayorista logueado
    public EntityResult wholesalersalesdetailQuery(Map<String, Object> keyMap, List<String> attrList);

    // Devuelve los productos mas vendidos del mayorista seleccionado
    public EntityResult wholesalerbestsellersQuery(Map<String, Object> keyMap, List<String> attrList);

    public EntityResult  wholesalersalesbyyearmonthQuery(Map<String, Object>keyMap, List<String>attrList);


}