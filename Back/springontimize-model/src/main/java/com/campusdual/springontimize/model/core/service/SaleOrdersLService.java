package com.campusdual.springontimize.model.core.service;

import com.campusdual.springontimize.api.core.service.ISaleOrdersLService;
import com.campusdual.springontimize.model.core.dao.SaleOrdersLDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Lazy
@Service("SaleOrdersLService")
public class SaleOrdersLService implements ISaleOrdersLService {

	@Autowired
	private SaleOrdersLDao saleOrdersLDao;

	@Autowired
	private DefaultOntimizeDaoHelper daoHelper;



	//Sample to permission
	//@Secured({ PermissionsProviderSecured.SECURED })
	public EntityResult saleorderslQuery(Map<String, Object> keyMap, List<String> attrList) {
		return this.daoHelper.query(saleOrdersLDao, keyMap, attrList);
	}

	public EntityResult saleorderslInsert(Map<String, Object> attrMap) {
		return this.daoHelper.insert(saleOrdersLDao, attrMap);
	}

	public EntityResult saleorderslUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
		return this.daoHelper.update(saleOrdersLDao, attrMap, keyMap);
	}

	public EntityResult saleorderslDelete(Map<String, Object> keyMap) {
		return this.daoHelper.delete(this.saleOrdersLDao, keyMap);
	}

}
