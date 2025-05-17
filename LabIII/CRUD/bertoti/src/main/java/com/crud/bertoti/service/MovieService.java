package com.crud.bertoti.service;

import com.crud.bertoti.model.Movie;
import com.crud.bertoti.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository repository;

    public List<Movie> findAll() {
        return repository.findAll();
    }

    public Optional<Movie> findById(Integer id) {
        return repository.findById(id);
    }

    public Movie save(Movie movie) {
        return repository.save(movie);
    }

    public void deleteById(Integer id) {
        repository.deleteById(id);
    }
}
