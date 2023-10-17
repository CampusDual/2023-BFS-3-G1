package com.campusdual.springontimize.model.core.service;

import com.campusdual.springontimize.api.core.service.ICountryService;
import com.campusdual.springontimize.model.core.dao.CountryDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Lazy
@Service("CountryService")
public class CountryService implements ICountryService {

	@Autowired
	private CountryDao countryDao;

	@Autowired
	private DefaultOntimizeDaoHelper daoHelper;



	//Sample to permission
	//@Secured({ PermissionsProviderSecured.SECURED })
	public EntityResult countryQuery(Map<String, Object> keyMap, List<String> attrList) {
		return this.daoHelper.query(countryDao, keyMap, attrList);
	}

	public EntityResult countryInsert(Map<String, Object> attrMap) {
		return this.daoHelper.insert(countryDao, attrMap);
	}

	public EntityResult countryUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
		return this.daoHelper.update(countryDao, attrMap, keyMap);
	}

	public EntityResult countryDelete(Map<String, Object> keyMap) {
		return this.daoHelper.delete(this.countryDao, keyMap);
	}

}
