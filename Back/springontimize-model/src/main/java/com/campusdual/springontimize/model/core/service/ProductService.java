package com.campusdual.springontimize.model.core.service;

import com.campusdual.springontimize.api.core.service.IProductService;
import com.campusdual.springontimize.model.core.dao.ProductDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Lazy
@Service("ProductService")
public class ProductService implements IProductService {

	@Autowired
	private ProductDao productDao;

	@Autowired
	private DefaultOntimizeDaoHelper daoHelper;



	//Sample to permission
	//@Secured({ PermissionsProviderSecured.SECURED })
	public EntityResult productQuery(Map<String, Object> keyMap, List<String> attrList) {
		return this.daoHelper.query(productDao, keyMap, attrList);
	}

	public EntityResult productInsert(Map<String, Object> attrMap) {
		return this.daoHelper.insert(productDao, attrMap);
	}

	public EntityResult productUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
		return this.daoHelper.update(productDao, attrMap, keyMap);
	}

	public EntityResult productDelete(Map<String, Object> keyMap) {
		return this.daoHelper.delete(this.productDao, keyMap);
	}
	@Override
	public EntityResult featuredproductQuery(Map<String, Object> keyMap, List<String> attrList) {
		keyMap.put(ProductDao.ATTR_FEATURED,true);
		return this.daoHelper.query(productDao, keyMap, attrList);
	}

	public EntityResult productTableQuery(Map<String, Object> keyMap, List<String> attrList) {
		var result = this.daoHelper.query(this.productDao, keyMap, attrList,
				productDao.QUERY_VPRODUCTCATEGORY);
		return result;
		//return this.daoHelper.query(productDao, keyMap, attrList);
	}
}
