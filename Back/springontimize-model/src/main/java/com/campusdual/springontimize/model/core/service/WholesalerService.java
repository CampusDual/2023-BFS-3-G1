package com.campusdual.springontimize.model.core.service;

import com.campusdual.springontimize.api.core.service.IWholesalerService;
import com.campusdual.springontimize.model.core.dao.*;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.common.dto.EntityResultMapImpl;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.util.*;

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
	@Override
	public EntityResult wholesalersalesthisyearQuery(Map<String, Object> keyMap, List<String> attrList) {
		keyMap.put(WholesalerDao.ATTR_SALE_YEAR, Year.now().getValue());
		return this.wholesalersalesbyyearmonthQuery(keyMap,attrList);

	}
	@Override
	public EntityResult wholesalersalespreviusyearQuery(Map<String, Object> keyMap, List<String> attrList) {
		keyMap.put(WholesalerDao.ATTR_SALE_YEAR, Year.now().getValue()-1);
		return this.wholesalersalesbyyearmonthQuery(keyMap,attrList);
	}

	@Override
	public EntityResult wholesalersalesbyyearmonthQuery(Map<String, Object> keyMap, List<String> attrList) {
		List<String> fixAttr = new ArrayList<>();
		fixAttr.add(WholesalerDao.ATTR_SALE_YEAR);
		fixAttr.add(WholesalerDao.ATTR_SALE_MONTH);
		fixAttr.add(WholesalerDao.ATTR_TOTAL_SALES);
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		Map<String, Object> userKeyMap = new HashMap<>((Map<String, Object>) keyMap);
		userKeyMap.put(WholesalerDao.ATTR_USER_, authentication.getName());
		EntityResult existQuery= daoHelper.query(wholesalerDao, userKeyMap, fixAttr,
				WholesalerDao.QUERY_VSALESBYYEARMONTH);
		if (existQuery.isWrong()) {
			return existQuery;
		}
		EntityResult result = new EntityResultMapImpl();
		List<String> sales = (List<String>) existQuery.get(WholesalerDao.ATTR_SALE_MONTH);
		if (sales == null) {
			sales = new ArrayList<>();
		}
		List<String> months = Arrays.asList("12 Dic", "11 Nov", "10 Oct", "09 Sept","08 Ago","07 Jul","06 Jun"," 05 May","04 Abr","03 Mar","02 Feb","01 Ene");
		Integer saleyear = (Integer) userKeyMap.get(WholesalerDao.ATTR_SALE_YEAR);
		if (saleyear == null){
			result.setCode(EntityResult.OPERATION_WRONG);
			result.setMessage("saleyear is mandatory");
			return result;
		}
		for(String month : months) {
			if (!sales.contains(month)) {
				result.addRecord(addEmptyMonth(month, saleyear));
			} else {
				Integer pos = sales.indexOf(month);
				Map<String,Object> register = existQuery.getRecordValues(pos);
				result.addRecord(register);
			}
		}

		return result;
	}

	private Map<String, Object> addEmptyMonth(String salemonth, Integer saleyear)  {
		Map<String,Object> newresult = new HashMap<>();
		newresult.put(WholesalerDao.ATTR_SALE_MONTH,salemonth);
		newresult.put(WholesalerDao.ATTR_SALE_YEAR, saleyear);
		newresult.put(WholesalerDao.ATTR_TOTAL_SALES, 0);
		return newresult;
	}

	private Date addMonth(Date date, int amount){
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.MONTH, amount);
		return calendar.getTime();
	}
}
