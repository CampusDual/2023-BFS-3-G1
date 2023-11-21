package com.campusdual.springontimize.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository(value="ProductDao")
@Lazy
@ConfigurationFile(
        configurationFile = "dao/ProductDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")

public class ProductDao extends OntimizeJdbcDaoSupport {
    public static final String QUERY_VPRODUCTCATEGORY = "productcategory";
    public static final String QUERY_VWHOLESALERPRODUCT = "wholesalerproduct";

    public static final String ATTR_ID = "id";
    public static final String ATTR_ES_DESCRIPTION_SHORT = "es_description_short";
    public static final String ATTR_FEATURED = "featured";
    public static final String ATTR_WHOLESALER = "wholesaler";
}
