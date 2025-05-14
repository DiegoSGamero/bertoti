package com.crud.bertoti.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "movies")
public class Movie {

    @Id
    @Column(name = "cod_movie")
    private Integer codMovie;

    @Column(name = "movie_name", length = 355)
    private String movieName;

    @Column(name = "movie_director", length = 255)
    private String movieDirector;

    @Column(name = "movie_duration") // Mantido conforme você escreveu na tabela
    private Integer movieDuration;

    @Column(name = "movie_category", length = 255)
    private String movieCategory;

    // Getters e Setters

    public Integer getCodMovie() {
        return codMovie;
    }

    public void setCodMovie(Integer codMovie) {
        this.codMovie = codMovie;
    }

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public String getMovieDirector() {
        return movieDirector;
    }

    public void setMovieDirector(String movieDirector) {
        this.movieDirector = movieDirector;
    }

    public Integer getMovieDuration() {
        return movieDuration;
    }

    public void setMovieDuration(Integer movieDuration) {
        this.movieDuration = movieDuration;
    }

    public String getMovieCategory() {
        return movieCategory;
    }

    public void setMovieCategory(String movieCategory) {
        this.movieCategory = movieCategory;
    }
}
