package com.jk.service.impl;

import com.jk.dao.YzyDao;
import com.jk.model.UserBean;
import com.jk.service.YzysService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class YzysServiceImpl implements YzysService {

    @Autowired
    private YzyDao yzyDao;


    @Override
    public UserBean findUserByName(String username) {
        System.out.println(1);
        return yzyDao.findUserByName(username);
    }
}
