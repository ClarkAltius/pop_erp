package com.poperp.backend.test;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class TestService {

    private final TestRepository testRepository;

    @Transactional
    public TestEntity create(String name) {
        TestEntity entity = new TestEntity(name);
        return testRepository.save(entity);
    }
}
