package com.jk.service.impl;

import com.jk.Bean.HousBean;
import com.jk.dao.YzhHouseDao;
import com.jk.service.YzhHouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;


import java.util.HashMap;
import java.util.List;

/**
 * @program: product_qiyue
 * @description:
 * @author: yzh
 * @create: 2019-11-15 19:07
 */

@Service
public class YzhHouseServiceImpl implements YzhHouseService {
    @Autowired
    private YzhHouseDao yzhHouseDao;
    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<HousBean> findHousePageData( HousBean housBean) {


        Query query=new Query();


        List<HousBean> list=mongoTemplate.find(query,HousBean.class);

        return list;
    }
}
