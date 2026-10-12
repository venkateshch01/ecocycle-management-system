
package com.ewaste.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/api/hello")
    public String hello() {
        return "E-Waste Collection and Component Recovery Management System Backend is working!";
    }
}
