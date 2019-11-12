package com.jk.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(value = "provider-cty")
public interface TestService {
    @GetMapping("user/test")
    String test();
}
