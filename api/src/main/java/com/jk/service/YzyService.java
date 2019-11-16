package com.jk.service;

import com.jk.model.UserBean;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(value="provider-yzy")
public interface YzyService {

    @GetMapping()
    UserBean findUserByName(@RequestParam("username") String username);
}
