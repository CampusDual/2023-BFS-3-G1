package com.campusdual.springontimize.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository(value="CategoryDao")
@Lazy
@ConfigurationFile(
        configurationFile = "dao/CategoryDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")

public class CategoryDao extends OntimizeJdbcDaoSupport {
    public static final String ATTR_ID = "id";
    public static final String ATTR_ES_NAME = "es_name";
    public static final String ATTR_EN_NAME = "en_name";
    public static final String ATTR_IMAGE = "image";

}
