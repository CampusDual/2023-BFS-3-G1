package com.campusdual.springontimize.model.core.service;

import com.campusdual.springontimize.api.core.service.ICategoryService;
import com.campusdual.springontimize.model.core.dao.CategoryDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Lazy
@Service("CategoryService")
public class CategoryService implements ICategoryService {

	@Autowired
	private CategoryDao categoryDao;

	@Autowired
	private DefaultOntimizeDaoHelper daoHelper;



	//Sample to permission
	//@Secured({ PermissionsProviderSecured.SECURED })
	@Override
	public EntityResult categoryQuery(Map<String, Object> keyMap, List<String> attrList) {
		return this.daoHelper.query(this.categoryDao, keyMap, attrList);
	}

	@Override
	public EntityResult categoryInsert(Map<String, Object> attrMap) {
		return this.daoHelper.insert(this.categoryDao, attrMap);
	}

	@Override
	public EntityResult categoryUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
		return this.daoHelper.update(this.categoryDao, attrMap, keyMap);
	}

	@Override
	public EntityResult categoryDelete(Map<String, Object> keyMap) {
		return this.daoHelper.delete(this.categoryDao, keyMap);
	}

}
