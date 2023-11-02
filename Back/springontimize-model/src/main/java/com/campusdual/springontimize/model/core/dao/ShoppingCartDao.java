package com.campusdual.springontimize.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Lazy
@Repository(value = "ShoppingCartDao")
@ConfigurationFile(
        configurationFile = "dao/ShoppingCartDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")
public class ShoppingCartDao extends OntimizeJdbcDaoSupport {
    public static final String ATTR_ID = "ID";
    public static final String ATTR_USER_ = "USER";
    public static final String ATTR_PRODUCT_ID = "PRODUCT_ID;";
    public static final String ATTR_QTY = "QTY";
    public static final String ATTR_PRICE = "PRICE";
    public static final String ATTR_TOTAL = "TOTAL";

}
