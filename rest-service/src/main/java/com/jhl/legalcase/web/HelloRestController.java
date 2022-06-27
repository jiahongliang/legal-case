package com.jhl.legalcase.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author
 */
@RestController
@RequestMapping("/hello")
public class HelloRestController {

    @GetMapping("/")
    public String world(){
        return "I am the lagal case application rest service.";
    }
}
