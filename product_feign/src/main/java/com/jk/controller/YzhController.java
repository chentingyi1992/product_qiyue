package com.jk.controller;

import com.jk.Bean.HousBean;
import com.jk.service.YzhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

/**
 * @program: product_qiyue
 * @description:
 * @author: yzh
 * @create: 2019-11-15 18:41
 */
@Controller
@RequestMapping("yzh")
public class YzhController {
    @Autowired
    private YzhService yzhService;

    @RequestMapping("findHousePageData")
    @ResponseBody
    public List<HousBean> findHousePageData( HousBean housBean){
        return yzhService.findHousePageData(housBean);
    }

}
