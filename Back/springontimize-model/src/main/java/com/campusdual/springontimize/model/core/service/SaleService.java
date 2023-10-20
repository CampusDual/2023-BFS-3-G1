package com.campusdual.springontimize.model.core.service;

import com.campusdual.springontimize.api.core.service.ISaleService;
import com.campusdual.springontimize.model.core.dao.SaleDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Lazy
@Service("SaleService")
public class SaleService implements ISaleService {

	@Autowired
	private SaleDao saleDao;

	@Autowired
	private DefaultOntimizeDaoHelper daoHelper;



	//Sample to permission
	//@Secured({ PermissionsProviderSecured.SECURED })
	public EntityResult saleQuery(Map<String, Object> keyMap, List<String> attrList) {
		return this.daoHelper.query(saleDao, keyMap, attrList);
	}

	public EntityResult saleInsert(Map<String, Object> attrMap) {
		return this.daoHelper.insert(saleDao, attrMap);
	}

	public EntityResult saleUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
		return this.daoHelper.update(saleDao, attrMap, keyMap);
	}

	public EntityResult saleDelete(Map<String, Object> keyMap) {
		return this.daoHelper.delete(this.saleDao, keyMap);
	}

}
