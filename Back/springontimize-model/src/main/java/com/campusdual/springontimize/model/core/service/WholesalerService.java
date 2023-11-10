package com.campusdual.springontimize.model.core.service;

import com.campusdual.springontimize.api.core.service.IWholesalerService;
import com.campusdual.springontimize.model.core.dao.ProductDao;
import com.campusdual.springontimize.model.core.dao.SaleOrdersLDao;
import com.campusdual.springontimize.model.core.dao.WholesalerDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Lazy
@Service("WholesalerService")
public class WholesalerService implements IWholesalerService {

	@Autowired
	private WholesalerDao wholesalerDao;

	// necesito el total de ventas que estará en la tabla de sales
	@Autowired
	private SaleOrdersLDao saleOrdersLDao;

	@Autowired
	private DefaultOntimizeDaoHelper daoHelper;



	//Sample to permission
	//@Secured({ PermissionsProviderSecured.SECURED })
	public EntityResult wholesalerQuery(Map<String, Object> keyMap, List<String> attrList) {
		return this.daoHelper.query(wholesalerDao, keyMap, attrList);
	}

	public EntityResult wholesalerInsert(Map<String, Object> attrMap) {
		return this.daoHelper.insert(wholesalerDao, attrMap);
	}

	public EntityResult wholesalerUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
		return this.daoHelper.update(wholesalerDao, attrMap, keyMap);
	}

	public EntityResult wholesalerDelete(Map<String, Object> keyMap) {
		return this.daoHelper.delete(this.wholesalerDao, keyMap);
	}


	public EntityResult wholesalerbalanceQuery(Map<String, Object> keyMap, List<String> attrList) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) keyMap);
		userKeyMap.put(ProductDao.ATTR_WHOLESALER, authentication.getName());
		return this.daoHelper.query(wholesalerDao, userKeyMap, attrList,
				WholesalerDao.QUERY_VTOTALSALES);
	}

	public EntityResult wholesalersalesdetailQuery(Map<String, Object> keyMap, List<String> attrList) {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) keyMap);
			userKeyMap.put(ProductDao.ATTR_WHOLESALER,authentication.getName());
			return this.daoHelper.query(wholesalerDao, userKeyMap, attrList,
					WholesalerDao.QUERY_VSALESDETAIL);
	}

	@Override
	public EntityResult wholesalerbestsellersQuery(Map<String, Object> keyMap, List<String> attrList) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) keyMap);
		userKeyMap.put(ProductDao.ATTR_WHOLESALER,authentication.getName());
		return this.daoHelper.query(wholesalerDao, userKeyMap, attrList,
				WholesalerDao.QUERY_VBESTSELLERS);
	}

}
