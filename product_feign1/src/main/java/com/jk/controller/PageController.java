package com.jk.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

<<<<<<< HEAD
/**
 * @program: product_qiyue
 * @description:
 * @author: yzh
 * @create: 2019-11-14 16:24
 */

@Controller
@RequestMapping("searchpage")
public class PageController {

    @RequestMapping("toZhao")
    public String toZhao(){
        return "zhaoF";
    }

    @RequestMapping("toaa")
    public String toaa(){
        return "aa";
=======
@Controller
@RequestMapping("page")
public class PageController {
    @RequestMapping("toindex")
    private String toindex(){
        return "index";
>>>>>>> origin/master
    }
}
