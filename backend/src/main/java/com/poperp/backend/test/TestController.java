package com.poperp.backend.test;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestController {

    private final TestService testService;

    @PostMapping
    public TestEntity createTest(@RequestParam String name) {
        return testService.create(name);
    }
}