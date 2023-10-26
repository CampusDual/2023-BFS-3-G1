package com.campusdual.springontimize.ws.core.rest;

import com.campusdual.springontimize.api.core.service.IWholesalerService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/wholesalers")
public class WholesalerRestController extends ORestController<IWholesalerService> {

    @Autowired
    private IWholesalerService wholesalerService;

    @Override
    public IWholesalerService getService() {
        return this.wholesalerService;
    }
}
