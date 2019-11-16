package com.jk.service;

import com.jk.Bean.HousBean;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.List;

/**
 * @program: product_qiyue
 * @description:
 * @author: yzh
 * @create: 2019-11-15 18:34
 */
@FeignClient(value = "provider-yzh")
public interface YzhService {
    @GetMapping("house/findHousePageData")
    List<HousBean> findHousePageData( @SpringQueryMap HousBean housBean);


}
