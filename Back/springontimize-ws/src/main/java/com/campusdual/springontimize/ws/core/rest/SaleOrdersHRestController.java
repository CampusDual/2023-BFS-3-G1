package com.campusdual.springontimize.ws.core.rest;

import com.campusdual.springontimize.api.core.service.ISaleOrdersHService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/saleordersh")
public class SaleOrdersHRestController extends ORestController<ISaleOrdersHService> {

    @Autowired
    private ISaleOrdersHService SaleOrdersHService;

    @Override
    public ISaleOrdersHService getService() {
        return this.SaleOrdersHService;
    }
}
