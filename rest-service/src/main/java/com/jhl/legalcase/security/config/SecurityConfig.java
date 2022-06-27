package com.jhl.legalcase.security.config;

import com.jhl.legalcase.security.entryPoint.LegalCaseAuthenticationEntryPoint;
import com.jhl.legalcase.security.filter.LegalCaseAuthenticationFilter;
import com.jhl.legalcase.security.handler.LegalCaseAccessDeniedHandler;
import com.jhl.legalcase.security.handler.LegalCaseLogoutSuccessHandler;
import com.jhl.legalcase.security.manager.LegalCaseAuthenticationManager;
import com.jhl.legalcase.security.provider.LegalCaseAuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import javax.servlet.http.HttpServletResponse;

/**
 * @author
 */
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    LegalCaseAuthenticationProvider authenticationProvider;

    @Autowired
    LegalCaseAuthenticationManager authenticationManager;

    @Autowired
    LegalCaseAuthenticationFilter authenticationFilter;

    @Autowired
    LegalCaseLogoutSuccessHandler logoutSuccessHandler;

    @Autowired
    LegalCaseAuthenticationEntryPoint authenticationEntryPoint;

    @Autowired
    LegalCaseAccessDeniedHandler accessDeniedHandler;

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable();

        /**
         * 未授权请求处理
         */
        http.exceptionHandling().authenticationEntryPoint((request, response, authException) -> {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, authException.getMessage());
        }).and();

        /**
         * 指定登录处理路径
         */
        http.formLogin().loginPage("/login").and();

        http.logout().logoutSuccessHandler(logoutSuccessHandler);

        http.authorizeRequests()
                .antMatchers("/login").permitAll()
                .antMatchers("/verify_code/**").permitAll()
                .antMatchers("/user/register").permitAll()
                .anyRequest().authenticated();

        http.authenticationManager(authenticationManager).authenticationProvider(authenticationProvider);
        http.exceptionHandling().accessDeniedHandler(accessDeniedHandler).authenticationEntryPoint(authenticationEntryPoint);
        http.addFilterAt(authenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
