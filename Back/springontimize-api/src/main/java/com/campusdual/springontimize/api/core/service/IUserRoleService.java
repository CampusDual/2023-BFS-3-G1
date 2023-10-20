package com.campusdual.springontimize.api.core.service;

import com.ontimize.jee.common.dto.EntityResult;

import java.util.List;
import java.util.Map;

/**
 * The interface User role service.
 */
public interface IUserRoleService {
    /*User Role Entity Operations*/

    /**
     * Userrole query entity result.
     *
     * @param keyMap   the key map
     * @param attrList the attr list
     * @return the entity result
     */
    public EntityResult userroleQuery(Map<String, Object> keyMap, List<String> attrList);

    /**
     * Userrole insert entity result.
     *
     * @param attrMap the attr map
     * @return the entity result
     */
    public EntityResult userroleInsert(Map<String, Object> attrMap);

    /**
     * Userrole update entity result.
     *
     * @param attrMap the attr map
     * @param keyMap  the key map
     * @return the entity result
     */
    public EntityResult userroleUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap);

    /**
     * Userrole delete entity result.
     *
     * @param keyMap the key map
     * @return the entity result
     */
    public EntityResult userroleDelete(Map<String, Object> keyMap);

    /*Query Own Role Operation*/

    /**
     * My role query entity result.
     *
     * @param keyMap   the key map
     * @param attrList the attr list
     * @return the entity result
     */
    public EntityResult myRoleQuery(Map<String, Object> keyMap, List<String> attrList);
}
