package com.crud.bertoti.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crud.bertoti.model.Movie;

public interface MovieRepository extends JpaRepository<Movie, Integer> {
}

