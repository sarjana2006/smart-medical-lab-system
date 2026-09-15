package com.smart.repository;

import com.smart.entity.Test;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestRepository extends JpaRepository<Test, Integer> {

    List<Test> findByAvailableTrue();
}