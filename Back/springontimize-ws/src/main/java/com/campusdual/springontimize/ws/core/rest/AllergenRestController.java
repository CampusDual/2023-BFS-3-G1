package com.campusdual.springontimize.ws.core.rest;

import com.campusdual.springontimize.api.core.service.IAllergenService;
import com.ontimize.jee.server.rest.ORestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/allergens")
public class AllergenRestController extends ORestController<IAllergenService> {

    @Autowired
    private IAllergenService allergenService;

    @Override
    public IAllergenService getService() {
        return this.allergenService;
    }
}
