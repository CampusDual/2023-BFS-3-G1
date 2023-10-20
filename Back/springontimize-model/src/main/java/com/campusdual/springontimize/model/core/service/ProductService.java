package com.campusdual.springontimize.model.core.service;

import com.campusdual.springontimize.api.core.service.IProductService;
import com.campusdual.springontimize.model.core.dao.ProductDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		attrMap.put(ProductDao.ATTR_WHOLESALER,authentication.getName());
		return this.daoHelper.insert(productDao, attrMap);
	}

	public EntityResult productUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
		return this.daoHelper.update(productDao, attrMap, keyMap);
	}

	public EntityResult productDelete(Map<String, Object> keyMap) {
		return this.daoHelper.delete(productDao, keyMap);
	}
	@Override
	public EntityResult featuredproductQuery(Map<String, Object> keyMap, List<String> attrList) {
		keyMap.put(ProductDao.ATTR_FEATURED,true);
		return this.daoHelper.query(this.productDao, keyMap, attrList);
	}

	public EntityResult productTableQuery(Map<String, Object> keyMap, List<String> attrList) {
		var result = this.daoHelper.query(productDao, keyMap, attrList,
				productDao.QUERY_VPRODUCTCATEGORY);
		return result;
	}
	// Devuelvo los productos del vendedor que está haciendo la consulta
	public EntityResult wholesalerproductQuery(Map<String, Object> keyMap, List<String> attrList) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) keyMap);
		userKeyMap.put(ProductDao.ATTR_WHOLESALER,authentication.getName());
		return this.daoHelper.query(productDao, userKeyMap, attrList);
	}
}
