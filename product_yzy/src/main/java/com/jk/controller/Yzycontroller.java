package com.jk.controller;

import com.jk.model.UserBean;
import com.jk.service.YzyService;
import com.jk.service.YzysService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Yzycontroller implements YzyService {

    @Autowired
    private YzysService yzysService;

    @Override
    public UserBean findUserByName(String username) {
        return yzysService.findUserByName(username);
    }
}
