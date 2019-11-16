package com.jk.controller;

import com.jk.Bean.HousBean;
import com.jk.service.YzhHouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;

/**
 * @program: product_qiyue
 * @description:
 * @author: yzh
 * @create: 2019-11-15 19:03
 */
@Controller
@RequestMapping("house")
public class YzhHouseController {

    @Autowired
    private YzhHouseService houseService;

    @GetMapping("findHousePageData")
    @ResponseBody
    public List<HousBean> findHousePageData( HousBean housBean){
        return houseService.findHousePageData(housBean);
    }
}
