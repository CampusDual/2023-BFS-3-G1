package com.campusdual.springontimize.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository(value="SaleOrdersHDao")
@Lazy
@ConfigurationFile(
        configurationFile = "dao/SaleOrdersHDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")

public class SaleOrdersHDao extends OntimizeJdbcDaoSupport{

    public static final String ATTR_ID = "id";
    public static final String ATTR_USER_ = "user_";
    public static final String ATTR_SALEDATE = "saledate";
    public static final String QUERY_VTOTAL = "total";



}