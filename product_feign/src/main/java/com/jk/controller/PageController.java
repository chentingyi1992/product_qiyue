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


    @RequestMapping("toIndex")
    private String toIndex(){
        return "index";
    }
    @RequestMapping("bj")
    private String bj(){
        return "bj";
    }

    @RequestMapping("bjjointrent")
    private String bjjointrent(){
        return "bj-joint_rent";
    }

    @RequestMapping("bjentirerent")
    private String bjentirerent(){
        return "bj-entire_rent";
    }

    @RequestMapping("bj1")
    private String bj1(){
        return "bj-1";
    }

    @RequestMapping("yezhu")
    private String yezhu(){
        return "yezhu";
    }

    @RequestMapping("aboutus")
    private String aboutus(){
        return "aboutus";
    }

    @RequestMapping("contact")
    private String contact(){
        return "contact";
    }

    @RequestMapping("join")
    private String join(){
        return "join";
    }

    @RequestMapping("school")
    private String school(){
        return "school";
    }

    @RequestMapping("login")
    private String login(){
        return "login";
    }
}
