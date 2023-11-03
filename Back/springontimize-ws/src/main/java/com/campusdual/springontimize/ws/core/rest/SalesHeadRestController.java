package com.campusdual.springontimize.ws.core.rest;

import com.campusdual.springontimize.api.core.service.ISaleService;
import com.campusdual.springontimize.api.core.service.ISalesHeadService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/salesHead")
public class SalesHeadRestController extends ORestController<ISalesHeadService> {

    @Autowired
    private ISalesHeadService salesHeadService;

    @Override
    public ISalesHeadService getService() {
        return this.salesHeadService;
    }
}
