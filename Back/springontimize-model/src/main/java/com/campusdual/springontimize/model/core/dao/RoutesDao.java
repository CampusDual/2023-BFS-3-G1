package com.campusdual.springontimize.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository(value = "RouteDao")
@Lazy
@ConfigurationFile( configurationFile = "dao/RoutesDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")
public class RoutesDao extends OntimizeJdbcDaoSupport {
    public static final String ATTR_ID = "ID";
    public static final String ATTR_PERMISSIONID = "PERMISSIONID";
    public static final String ATTR_ENABLED = "ENABLED";
    public static final String ATTR_ROLENAME = "ROLENAME";
    public static final String ATTR_ID_ROLENAME = "ID_ROLENAME";
}
