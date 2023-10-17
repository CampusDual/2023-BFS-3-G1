package com.campusdual.springontimize.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository(value="CountryDao")
@Lazy
@ConfigurationFile(
        configurationFile = "dao/CountryDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")

public class CountryDao extends OntimizeJdbcDaoSupport {
    public static final String ATTR_ID = "id";
    public static final String ATTR_CODE = "code";
    public static final String ATTR_EN_NAME = "en_name";

}
