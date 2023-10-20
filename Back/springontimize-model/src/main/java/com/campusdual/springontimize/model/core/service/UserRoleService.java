package com.campusdual.springontimize.model.core.service;

import com.campusdual.springontimize.api.core.service.IUserRoleService;
import com.campusdual.springontimize.model.core.dao.UserRoleDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Lazy
@Service("UserRoleService")
public class UserRoleService implements IUserRoleService {

    @Autowired
    private UserRoleDao userRoleDao;

    @Autowired
    private DefaultOntimizeDaoHelper daoHelper;

    @Override
    public EntityResult userroleQuery(Map<String, Object> keyMap, List<String> attrList) {
        return daoHelper.query(userRoleDao,keyMap,attrList);
    }

    @Override
    public EntityResult userroleInsert(Map<String, Object> attrMap) {
        return daoHelper.insert(userRoleDao,attrMap);
    }

    @Override
    public EntityResult userroleUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
        return daoHelper.update(userRoleDao,attrMap,keyMap);
    }

    @Override
    public EntityResult userroleDelete(Map<String, Object> keyMap) {
        return daoHelper.delete(userRoleDao,keyMap);
    }

    @Override
    public EntityResult myRoleQuery(Map<String, Object> keyMap, List<String> attrList) {
        //ad the user role to the query
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        keyMap.put(UserRoleDao.ATTT_USER_,auth.getName());
        attrList.add(UserRoleDao.ATTT_ROLENAME);
        EntityResult result =  daoHelper.query(userRoleDao,keyMap,attrList,UserRoleDao.QUERY_USERROLE);
        return result;
    }
}
