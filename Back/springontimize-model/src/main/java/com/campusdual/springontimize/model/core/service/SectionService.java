package com.campusdual.springontimize.model.core.service;

import com.campusdual.springontimize.api.core.service.ISectionService;
import com.campusdual.springontimize.model.core.dao.SectionDao;
import com.ontimize.jee.common.dto.EntityResult;
import com.ontimize.jee.server.dao.DefaultOntimizeDaoHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Lazy
@Service("SectionService")
public class SectionService implements ISectionService {

	@Autowired
	private SectionDao sectionDao;

	@Autowired
	private DefaultOntimizeDaoHelper daoHelper;



	//Sample to permission
	//@Secured({ PermissionsProviderSecured.SECURED })
	public EntityResult sectionQuery(Map<String, Object> keyMap, List<String> attrList) {
		return this.daoHelper.query(sectionDao, keyMap, attrList);
	}

	public EntityResult sectionInsert(Map<String, Object> attrMap) {
		return this.daoHelper.insert(sectionDao, attrMap);
	}

	public EntityResult sectionUpdate(Map<String, Object> attrMap, Map<String, Object> keyMap) {
		return this.daoHelper.update(sectionDao, attrMap, keyMap);
	}

	public EntityResult sectionDelete(Map<String, Object> keyMap) {
		return this.daoHelper.delete(this.sectionDao, keyMap);
	}

}
