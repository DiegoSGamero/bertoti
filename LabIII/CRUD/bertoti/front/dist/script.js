"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = 'http://localhost:8080/movies';
const movieForm = document.getElementById('movie-form');
const movieIdInput = document.getElementById('movie-id');
const movieNameInput = document.getElementById('movieName');
const movieDirectorInput = document.getElementById('movieDirector');
const movieDurationInput = document.getElementById('movieDuration');
const movieCategoryInput = document.getElementById('movieCategory');
const moviesList = document.getElementById('movies-list');
const cancelEditBtn = document.getElementById('cancel-edit');
function getAllMovies() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(API_URL);
        return res.json();
    });
}
function createMovie(movie) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(movie),
        });
        return res.json();
    });
}
function updateMovie(id, movie) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(movie),
        });
        return res.json();
    });
}
function deleteMovie(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    });
}
function clearForm() {
    movieIdInput.value = '';
    movieNameInput.value = '';
    movieDirectorInput.value = '';
    movieDurationInput.value = '';
    movieCategoryInput.value = '';
    cancelEditBtn.style.display = 'none';
}
function fillForm(movie) {
    var _a, _b;
    movieIdInput.value = (_b = (_a = movie.codMovie) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : '';
    movieNameInput.value = movie.movieName;
    movieDirectorInput.value = movie.movieDirector;
    movieDurationInput.value = movie.movieDuration.toString();
    movieCategoryInput.value = movie.movieCategory;
    cancelEditBtn.style.display = 'inline-block';
}
function renderMovies(movies) {
    moviesList.innerHTML = '';
    movies.forEach(movie => {
        const li = document.createElement('li');
        const infoDiv = document.createElement('div');
        infoDiv.className = 'movie-info';
        infoDiv.textContent = `${movie.movieName} | Diretor: ${movie.movieDirector} | Duração: ${movie.movieDuration} min | Categoria: ${movie.movieCategory}`;
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'movie-actions';
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.onclick = () => fillForm(movie);
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.onclick = () => __awaiter(this, void 0, void 0, function* () {
            if (confirm(`Deseja excluir o filme "${movie.movieName}"?`)) {
                yield deleteMovie(movie.codMovie);
                loadMovies();
            }
        });
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);
        li.appendChild(infoDiv);
        li.appendChild(actionsDiv);
        moviesList.appendChild(li);
    });
}
function loadMovies() {
    return __awaiter(this, void 0, void 0, function* () {
        const movies = yield getAllMovies();
        renderMovies(movies);
    });
}
movieForm.onsubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const movie = {
        movieName: movieNameInput.value,
        movieDirector: movieDirectorInput.value,
        movieDuration: Number(movieDurationInput.value),
        movieCategory: movieCategoryInput.value,
    };
    if (movieIdInput.value) {
        // update
        const id = Number(movieIdInput.value);
        yield updateMovie(id, movie);
    }
    else {
        // create
        yield createMovie(movie);
    }
    clearForm();
    loadMovies();
});
cancelEditBtn.onclick = () => {
    clearForm();
};
loadMovies();
