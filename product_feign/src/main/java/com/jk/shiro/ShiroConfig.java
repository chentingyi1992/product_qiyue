package com.jk.shiro;


import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.LinkedHashMap;


@Configuration
public class ShiroConfig {

    @Bean
    public ShiroFilterFactoryBean getShiroFilterFactoryBean(@Qualifier("sercurityManager") DefaultWebSecurityManager securityManager) {
        ShiroFilterFactoryBean shiroFilterFactoryBean = new ShiroFilterFactoryBean();
        shiroFilterFactoryBean.setSecurityManager(securityManager);
        LinkedHashMap<String, String> filtermap = new LinkedHashMap<>();
        filtermap.put("/logout", "logout");
        filtermap.put("/page/toIndex", "anon");
        filtermap.put("/page/login", "anon");
        filtermap.put("/page/toMain", "anon");
        filtermap.put("/page/bj", "anon");
        filtermap.put("/page/bjjointrent", "anon");
        filtermap.put("/page/bjentirerent", "anon");
        filtermap.put("/page/bj1", "anon");
        filtermap.put("/page/yezhu", "anon");
        filtermap.put("/page/aboutus", "anon");
        filtermap.put("/page/contact", "anon");
        filtermap.put("/page/join", "anon");
        filtermap.put("/page/school", "anon");

        filtermap.put("/yzy/login", "anon");
        //放开静态资源
        filtermap.put("/js/**", "anon");
       // filtermap.put("/icons-reference/**", "anon");
        filtermap.put("/font/**", "anon");
        filtermap.put("/picture/**", "anon");
        filtermap.put("/css/**", "anon");
        filtermap.put("/image/**", "anon");
        filtermap.put("/**", "authc");
        shiroFilterFactoryBean.setLoginUrl("/page/tologin");

        shiroFilterFactoryBean.setFilterChainDefinitionMap(filtermap);
        return shiroFilterFactoryBean;
    }

    @Bean(name = "sercurityManager")
    public DefaultWebSecurityManager getDefaultWebSecurityManager(@Qualifier("myRealm") MyRealm myRealm) {
        DefaultWebSecurityManager defaultWebSecurityManager = new DefaultWebSecurityManager();
        defaultWebSecurityManager.setRealm(myRealm);
        return defaultWebSecurityManager;
    }

    @Bean(name = "myRealm")
    public MyRealm getRealm() {
        return new MyRealm();
    }

    /** * 凭证匹配器 *
     * （由于我们的密码校验交给Shiro的SimpleAuthenticationInfo进行处理了 * ）
     * * @return
     * */
    /*@Bean
    public HashedCredentialsMatcher hashedCredentialsMatcher(){
        HashedCredentialsMatcher hashedCredentialsMatcher = new HashedCredentialsMatcher();
        //散列算法:这里使用MD5算法;
        hashedCredentialsMatcher.setHashAlgorithmName("md5");
        //散列的次数，比如散列两次，相当于 md5(md5(""));
        hashedCredentialsMatcher.setHashIterations(1);
        return hashedCredentialsMatcher;
    }*/

}
