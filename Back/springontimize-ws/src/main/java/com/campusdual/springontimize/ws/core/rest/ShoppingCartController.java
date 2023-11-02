package com.campusdual.springontimize.ws.core.rest;

import com.campusdual.springontimize.api.core.service.IShoppingCartService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/shoppingcart")
public class ShoppingCartController extends ORestController<IShoppingCartService> {
    @Autowired
    private IShoppingCartService shoppingCartService;

    @Override
    public IShoppingCartService getService() {
        return this.shoppingCartService;
    }
}
