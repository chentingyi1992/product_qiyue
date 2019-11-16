package com.jk.service;

import com.jk.Bean.HousBean;

import java.util.HashMap;
import java.util.List;

/**
 * @program: product_qiyue
 * @description:
 * @author: yzh
 * @create: 2019-11-15 19:01
 */
public interface YzhHouseService {
    List<HousBean> findHousePageData( HousBean housBean);
}
