package com.campusdual.springontimize.ws.core.rest;

import com.campusdual.springontimize.api.core.service.ISectionService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sections")
public class SectionRestController extends ORestController<ISectionService> {

    @Autowired
    private ISectionService sectionService;

    @Override
    public ISectionService getService() {
        return this.sectionService;
    }
}
