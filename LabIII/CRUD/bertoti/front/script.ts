const API_URL = 'http://localhost:8080/movies';

interface Movie {
  codMovie?: number; 
  movieName: string;
  movieDirector: string;
  movieDuration: number;
  movieCategory: string;
}

const movieForm = document.getElementById('movie-form') as HTMLFormElement;
const movieIdInput = document.getElementById('movie-id') as HTMLInputElement;
const movieNameInput = document.getElementById('movieName') as HTMLInputElement;
const movieDirectorInput = document.getElementById('movieDirector') as HTMLInputElement;
const movieDurationInput = document.getElementById('movieDuration') as HTMLInputElement;
const movieCategoryInput = document.getElementById('movieCategory') as HTMLInputElement;
const moviesList = document.getElementById('movies-list') as HTMLUListElement;
const cancelEditBtn = document.getElementById('cancel-edit') as HTMLButtonElement;

async function getAllMovies() {
  const res = await fetch(API_URL);
  return res.json() as Promise<Movie[]>;
}

async function createMovie(movie: Movie) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(movie),
  });
  return res.json() as Promise<Movie>;
}

async function updateMovie(id: number, movie: Movie) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(movie),
  });
  return res.json() as Promise<Movie>;
}

async function deleteMovie(id: number) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}

function clearForm() {
  movieIdInput.value = '';
  movieNameInput.value = '';
  movieDirectorInput.value = '';
  movieDurationInput.value = '';
  movieCategoryInput.value = '';
  cancelEditBtn.style.display = 'none';
}

function fillForm(movie: Movie) {
  movieIdInput.value = movie.codMovie?.toString() ?? '';
  movieNameInput.value = movie.movieName;
  movieDirectorInput.value = movie.movieDirector;
  movieDurationInput.value = movie.movieDuration.toString();
  movieCategoryInput.value = movie.movieCategory;
  cancelEditBtn.style.display = 'inline-block';
}

function renderMovies(movies: Movie[]) {
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
    deleteBtn.onclick = async () => {
      if (confirm(`Deseja excluir o filme "${movie.movieName}"?`)) {
        await deleteMovie(movie.codMovie!);
        loadMovies();
      }
    };

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(infoDiv);
    li.appendChild(actionsDiv);

    moviesList.appendChild(li);
  });
}

async function loadMovies() {
  const movies = await getAllMovies();
  renderMovies(movies);
}

movieForm.onsubmit = async (e) => {
  e.preventDefault();

  const movie: Movie = {
    movieName: movieNameInput.value,
    movieDirector: movieDirectorInput.value,
    movieDuration: Number(movieDurationInput.value),
    movieCategory: movieCategoryInput.value,
  };

  if (movieIdInput.value) {
    // update
    const id = Number(movieIdInput.value);
    await updateMovie(id, movie);
  } else {
    // create
    await createMovie(movie);
  }

  clearForm();
  loadMovies();
};

cancelEditBtn.onclick = () => {
  clearForm();
};

loadMovies();
