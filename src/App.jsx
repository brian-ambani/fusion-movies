import { useEffect, useState } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';


const API_URL = 'https://www.omdbapi.com?apikey=8f212b34';

const movie1 = {
  "Title": "Superman & Lois",
  "Year": "2021–",
  "imdbID": "tt11192306",
  "Type": "series",
  "Poster": "https://m.media-amazon.com/images/M/MV5BOTA2MDVhMWItNTYwYi00OTcyLWJjZmEtNTQ2NTAxMDQyYTQwXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_SX300.jpg"
}

function App() {
  const [movies, setMovies] = useState([]);
  const [searchITerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const completeURL = API_URL + "&s=" + title;
    const response = await fetch(completeURL);
    const data = await response.json();
    
    setMovies(data.Search);
  }
  useEffect(() => {
    searchMovies('title');
  }, []);
  return (
    <div className="app">
     <h1>Brain Movies</h1>
     <div className="search">
      <input placeholder='Search for Movies'
      value={searchITerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      />
      <img src={SearchIcon}
      alt="search"
      onClick={() => searchMovies(searchITerm)}
      />
     </div>

     {
       movies?.length > 0
       ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie ={movie}/>
          ) )}
        </div>
       ): (
        <div className="empty">
          <h2>No Movies found</h2>
        </div>
       )
     }
     
    </div>
  );
}

export default App;
