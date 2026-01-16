package com.poperp.backend.test;

import io.swagger.v3.oas.annotations.Operation;
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

    @Operation(summary = "Test 엔티티의 id 검색해서 name 값을 반환", description = "하나의 name 스트링 반환")
    @GetMapping
    public TestEntity getTest(@RequestParam Long id) {
        return testService.get(id);
    }
}