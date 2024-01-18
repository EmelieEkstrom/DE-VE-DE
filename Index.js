import { db } from './firebaseConfig.js';
// import { getFirestore , addDoc, collection , getDocs , query , deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
// const db = getFirestore(app);

const addMovieButton = document.querySelector('#addMovie');
const addSearchButton = document.querySelector('#searchMovie');
const addSeenButtons = document.querySelector('#Seen');
const addDeleteButtons = document.querySelectorAll('#Delete');
const addMovieList = document.querySelector('#mylist');


console.log(addMovieButton);
console.log(addSearchButton);
console.log(addSeenButtons);
console.log(addDeleteButtons);
console.log(addMovieList);

const title = ['Terminator: Judgment day', 'Scream 1', 'Star Wars', 'White Chicks' , 'The Maze runner'];
const genre = ['Action', 'Sci-fi', 'Horror', 'Adventure', 'Comedy',];
const releaseDate = ['13 September 1991' , '1 augusti 1997' , '16 december 1977' , '26 Novemeber 2004' , '19 September 2014']; // I Sverige
const watched = ['Yes', 'No'];

addMovieButton.addEventListener('click', () => {
  document.getElementById("addMovie").innerHTML = "movie added";
});

addSearchButton.addEventListener('click', () => {
  document.getElementById("searchMovie").innerHTML = "Searching for movie";
});

addSeenButtons.addEventListener('click', () => {
  document.getElementById("Seen").innerHTML = "Seen this movie";
});

addDeleteButtons.addEventListener('click' , () => {
  document.getElementById("Delete").innerHTML = "Movie deleted";
});  

async function postMovie(title) {
  try {
      // Skapar en ny film i databasen där man skickar med i vilken collection den ska skapas samt vilka fält som ska finnas med
      await addDoc(collection(db, 'movie'), title)

  } catch (error) {
      console.log(`ERROR: ${error}`);
  }
};

async function getMovie(title) {
  try {
    let movies = await getDocs(collection(db, 'movie'), title);
  console.log(movies);
  movies.forEach(addedmovie => {
  let movie = addedmovie.data();
  console.log(movie);
  }) 
  } catch(error) {
      console.log(`ERROR: ${error}`)
  } 
    
};
getMovie(title);


addMovieButton.addEventListener('click', () => {
  const movie = {
      title: document.querySelector('#Titel').value,
      genre: document.querySelector('#genre').value,
      releaseDate: document.querySelector('#releaseDate').value,
      watched: false 
    }

    postMovie(movie);
});

addSearchButton.addEventListener('click' , () => {
    const movie = {
      title: document.querySelector('#titlePost').value,
      genre: document.querySelector('#genre').value,
      releaseDate: document.querySelector('#releaseDate').value,
      watched: true / false 
    }

    searchMovie(title);
});

addSeenButtons.addEventListener('click' , () => {
  const movie = {
    title: document.querySelector('#titlePost').value,
    genre: document.querySelector('#genre').value,
    releaseDate: document.querySelector('#releaseDate').value,
    watched: false 
  }

  seenMovie(title);
});

addDeleteButtons.addEventListener('click' , () => {
  const movie = {
    title: document.querySelector('#titlePost').value,
    genre: document.querySelector('#genre').value,
    releaseDate: document.querySelector('#releaseDate').value,
    watched: true / false 
  }
  
    deleteMovie(title);
});

async function addMovie(movieArray) {
  let title = document.getElementById('titleInput').value;
  let genre = document.getElementById('genreInput').value;
  let releaseDate = document.getElementById('releaseDateInput').value;

  for (let i = 0; i < movieArray.lenght; i++) {
    let newMovie= movieArray[i];
    if (newMovie.title === title) {
      console.log('Movie already exist!');
      return; //if a duplicate is found
    } 
} 
console.log('Movie added into collection');
await addDoc(collection(db, 'movie'),
{ 
  title: title, 
  genre: genre,
  releaseDate: releaseDate,
  watched: false
});
  location.reload();
}

document.getElementById('addMovie').addEventListener('click' , () => {
  addMovie(movieArray);
});

let movieArray = []; 

let movieContainer = document.querySelector('.mylist');

async function displayMovies() {
  const movieList = await getDocs(collection(db, 'Movies'));

  movieList.forEach(addedMovie => {
    const movie = addedMovie.data();
    console.log(movie);
    //console.log(myList);
    let movieElem = document.createElement('ul id'); ///? 
    movieElem.innerHTML = `<h1>${movie.title}<h1> <h2>${movie.genre}</h2> <h3>${movie.releaseDate}</h3>`
    movieContainer.appendChild(movieElem);
    movieArray.push(movie); //movie

    let deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete";
    movieElem.appendChild('deleteButton');
    deleteButton.addEventListener("click") , () => deleteMovie(addedMovie).id});

    let seenbutton = document.createElement('button');
    seenbutton.innerText = "Seen"; 
    movieElem.appendChild(seenbutton);
    let currentWatchedValue = false;
    seenbutton.addEventListener("click" , async () => {
      currentWatchedValue = await updateSeen(addedMovie.id, currentWatchedValue, seenbutton);
    });
  }

await displayMovies();
//console.log(movieArray);

async function deleteMovie(movieId) {
  await deleteDoc(doc(db, 'Movies', movieId));
  location.reload(); //Funktion som uppdaterar sidan efter 
}

async function updateSeen(movieid , currentWatchedValue, seenButton) {
  const selectedMovie = doc(db, 'Movie', movieid);
  console.log(selectedMovie);
  if (currentWatchedValue ==  true) {
    currentWatchedValue = false;
    watchedButton.innerText = "seen";
  } else if (currentWatchedValue == false) {
    currentWatchedValue = true;
    watchedButton.innerText = "Seen";
  } 

  const updateWatchedValue = !currentWatchedValue; 
  await updateDoc(selectedMovie,
    {  
      Seen: currentWatchedValue
  });
  return currentWatchedValue;
}

async function searchMovie() {
  let title = document.getElementById('searchInput').value;

  const foundMovies = await getDocs(query(collection(db, 'Movie'). where('title', '==', title))
  );
  
  let results = [];

  foundMovies.forEach((movie) => {
    const foundMovie = movie.data();
    results.push(foundMovie);
  });

  results.forEach((foundMovie) => {
    movieContainer.innerHTML = `<h1>${foundMovie.title}</h1> <h3>${foundMovie.genre}</h3> <h3>${foundMovie.year}</h3>`;
  });
}