const movieListElem = document.querySelector('#movielist');
const genreElem = document.querySelector('#genre');
const releaseDateElem = document.querySelector('#releaseDate');
const watchedButton = document.querySelector('#watchedButton');
const addAMovieButton = document.querySelector('#addMovie');
const removeMovieButton = document.querySelector('#deleteMovie');
const paragraphElem = document.querySelector('#p')

async function createmovieListElement() {
    const containerElem = document.createElement('section');
    const headingElem = document.createElement('h3');
    const movieListElem = document.createElement('p');
    const watchedButton = document.createElement('button');

    headingElem.innerText = title.info.title;
    movieListElem.innerText = `movie: ${movie.info.movie} title`; 
    removeMovieButton.innerText = 'Delete';

    containerElem.append(movieListElem);
    containerElem.append(removeMovieButton); 
    containerElem.append(watchedButton);

    removeMovieButton.addEventListener('click', () => {
        removeFromList(movie.id);
        updateAndDisplayMovies();
    });
}

async function displayWatchedMovieList() {
    movieListElem.innerHTML = 'Terminator: Judgment day', 'Scream 1', 'Star Wars', 'White Chicks' , 'The Maze runner' // Tar bort alla element i vår HTML för att ersätta med nytt från databasen

    for(const movieList of movieList) {
        createMovieElement(movieList);
    }
}

async function updateAndDisplayMovies() {
    const movie = await getMovies();

    document.querySelector('#moviesInList').innerHTML = movie.length;

    displayMovieList(movie);
}

async function createMovieElement() {
    console.log(movies);
    const containerElem = document.createElement('article');
    const headingElem = document.createElement('h3');
    const textElem = document.createElement('p');
    const addAMovieButton = document.createElement('button'); //////////////////
    const updateInput = document.createElement('input');
    const removeButton = document.createElement('button');
    const updateButton = document.createElement('button');

    headingElem.innerText = movie.movie.title;
    textElem.innerText = movie.movie.genre;
    addAMovieButton = 'Lägg till';
    removeButton = 'Ta bort';
    updateButton = 'Uppdatera';
   
    
    containerElem.append(paragraphElem);
    containerElem.append(genreElem);
    containerElem.append(releaseDateElem);
    containerElem.append(headingElem);
    containerElem.append(textElem);
    containerElem.append(removeButton);
    containerElem.append(updateInput);
    containerElem.append(updateButton);
    containerElem.append(containerElem);


    removeButton.addEventListener('click', () => {
        const movieId = movie.id; 
        deleteMovie(movieId);
    });

    updateButton.addEventListener('click', () => {
        const movieText = updateInput.value; 
        const movieId = movie.id;

        updateMovie(movieText, movieId);
    });
}

function displayMovies(movies) {
    for(const movie of movies) {
        createMovieElement(movie);
    }
}
 
getMovieButton.addEventListener('click' , async () => {
  const movies = document.querySelector('#movie').value;

  const title = await getMovie(id); 
  displayMovies(movies);
});

postMovieElem.addEventListener('click' , async () => {
    const movie = {
        title: document.querySelector('#title').value,
        genre: document.querySelector('#genre').value,
        releaseDate: document.querySelector('#releaseDate').value,
        watched: Yes / No 
        
    }
    
        postMovie(movie);
    });

addAMovieButton.addEventListener('click' , async () => {
    await addMovie();
});

async function fetchMovie() {
    const movies = await getlist();

    const movies = {
        title: document.querySelector('#title').value,
        genre: document.querySelector('#genre').value,
        releaseDate: document.querySelector('releasedate').value,
        watched: Yes / No
    } 

    await postMovie(movies);
};

mylistButton.addEventListener('click', async () => {
    document.querySelector('#mylist').classList.toggle('hide');
});

addMovieButton.addEventListener('click', async () => {
    await addMovie();
});

init();