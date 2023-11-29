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
    public static final String ATTR_ID = "id";
    public static final String ATTR_USER_ = "user_";
    public static final String ATTR_PRODUCT_ID = "product_id";
    public static final String ATTR_QTY = "qty";
    public static final String ATTR_PRICE = "price";
    public static final String ATTR_TOTAL = "total";
    public static final String QUERY_VRELATED = "related";

}
