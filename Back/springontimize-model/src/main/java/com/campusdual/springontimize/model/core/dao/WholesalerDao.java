package com.campusdual.springontimize.model.core.dao;

import com.ontimize.jee.server.dao.common.ConfigurationFile;
import com.ontimize.jee.server.dao.jdbc.OntimizeJdbcDaoSupport;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

@Repository(value="WholesalerDao")
@Lazy
@ConfigurationFile(
        configurationFile = "dao/WholesalerDao.xml",
        configurationFilePlaceholder = "dao/placeholders.properties")

public class WholesalerDao extends OntimizeJdbcDaoSupport {

    public static final String QUERY_VTOTALSALES = "totalsales";
    public static final String QUERY_VSALESDETAIL = "salesdetail";
    public static final String QUERY_VBESTSELLERS = "bestsellers";
    public static final String QUERY_VSALESBYYEARMONTH = "salesbyyearmonth";

    public static final String ATTR_ID = "id";
    public static final String ATTR_ES_NAME = "es_name";
    public static final String ATTR_EN_NAME = "en_name";
    public static final String ATTR_IMAGE = "image";

    public static final String ATTR_USER_ = "user_";
    public static final String ATTR_SALE_USER = "sale_user";

    public static final String ATTR_SALE_YEAR = "saleyear";
    public static final String ATTR_SALE_MONTH = "salemonth";

    public static final String ATTR_TOTAL_SALES = "totalsales";




}
