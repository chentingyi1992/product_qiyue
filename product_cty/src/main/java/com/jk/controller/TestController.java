package com.jk.controller;

import com.jk.service.TestService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;


@RestController

public class TestController implements TestService {

    @Override
    public String test() {
        return "haha";
    }
}
