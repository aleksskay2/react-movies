import {React, useEffect, useState} from 'react';
import Movies from '../components/Movies'
import Preloder from '../components/Preloader';
import Search  from '../components/Search';

const API_KEY = process.env.REACT_APP_API_KEY;

const Main = () => {
    
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState();

    useEffect(() => {
      fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=max`)
      .then((response) => response.json())
      
      .then((data) => setMovies( data.Search),  setLoading(false))
         console.log("movies =" + movies)
        
    }, [])

    const searchMovies = (str, type = 'all') => {
      setLoading(true)
      fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${str}${type !== 'all'? `&type=${type}`: ''}`)
      .then((response) => response.json())
      .then((data) => setMovies( data.Search, setLoading(false) ))
    }

    return <main className="container content">
        <Search searchMovies={ searchMovies}/> 
      {
        
        loading ? (
          <Preloder/> 
        ): <Movies movies = {movies}/>
      }
    </main>
}
export default Main;