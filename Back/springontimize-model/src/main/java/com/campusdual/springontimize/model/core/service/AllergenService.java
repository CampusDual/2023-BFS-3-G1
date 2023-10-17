package com.campusdual.springontimize.model.core.service;

import com.campusdual.springontimize.api.core.service.IAllergenService;
import com.campusdual.springontimize.model.core.dao.AllergenDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Lazy
@Service("AllergenService")
public class AllergenService implements IAllergenService {

	@Autowired
	private AllergenDao allergenDao;

	@Autowired
	private DefaultOntimizeDaoHelper daoHelper;



	//Sample to permission
	//@Secured({ PermissionsProviderSecured.SECURED })
	public EntityResult allergenQuery(Map<String, Object> keyMap, List<String> attrList) {
		return this.daoHelper.query(allergenDao, keyMap, attrList);
	}

	public EntityResult allergenInsert(Map<String, Object> attrMap) {
		return this.daoHelper.insert(allergenDao, attrMap);
	}

	public EntityResult allergenUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
		return this.daoHelper.update(allergenDao, attrMap, keyMap);
	}

	public EntityResult allergenDelete(Map<String, Object> keyMap) {
		return this.daoHelper.delete(this.allergenDao, keyMap);
	}

}
