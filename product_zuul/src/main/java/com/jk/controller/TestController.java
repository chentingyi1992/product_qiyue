package com.jk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RequestMapping("page")
public class TestController {
    @RequestMapping("test")
    public String test(){
        return "login";
    }
}
