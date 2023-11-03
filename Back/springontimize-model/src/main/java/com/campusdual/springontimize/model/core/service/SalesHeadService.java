package com.campusdual.springontimize.model.core.service;

import com.campusdual.springontimize.api.core.service.ISaleService;
import com.campusdual.springontimize.api.core.service.ISalesHeadService;
import com.campusdual.springontimize.model.core.dao.SaleDao;
import com.campusdual.springontimize.model.core.dao.SalesHeadDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Lazy
@Service("SalesHeadService")
public class SalesHeadService implements ISalesHeadService {

	@Autowired
	private SalesHeadDao salesHeadDao;

	@Autowired
	private DefaultOntimizeDaoHelper daoHelper;



	//Sample to permission
	//@Secured({ PermissionsProviderSecured.SECURED })
	public EntityResult salesHeadQuery(Map<String, Object> keyMap, List<String> attrList) {
		return this.daoHelper.query(salesHeadDao, keyMap, attrList);
	}

	public EntityResult salesHeadInsert(Map<String, Object> attrMap) {
		return this.daoHelper.insert(salesHeadDao, attrMap);
	}

	public EntityResult salesHeadUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
		return this.daoHelper.update(salesHeadDao, attrMap, keyMap);
	}

	public EntityResult salesHeadDelete(Map<String, Object> keyMap) {
		return this.daoHelper.delete(this.salesHeadDao, keyMap);
	}

}
