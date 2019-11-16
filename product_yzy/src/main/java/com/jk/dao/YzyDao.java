package com.jk.dao;

import com.jk.model.UserBean;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface YzyDao {

    @Select("select * from tt_user where userName=#{value}")
    UserBean findUserByName(String username);
}
