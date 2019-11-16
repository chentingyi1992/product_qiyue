package com.jk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("page")
public class PageController {

    @RequestMapping("toMain")
    public String toMain(){
        return "main";
    }

    @RequestMapping("toZhao")
    public String toZhao(){
        return "zhaoF";
    }


}
