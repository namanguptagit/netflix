import React, { useState ,useEffect } from 'react'
import './Home.scss'
import axios from 'axios'
import { Link } from 'react-router-dom';
import {BiPlay} from "react-icons/bi"
import {AiOutlinePlus } from "react-icons/ai"


const apikey = "acea2a72e281663b48fe2c9e8324418e";
const url = "https://api.themoviedb.org/3" ;
const imgUrl = "https://image.tmdb.org/t/p/original"
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({img}) => (
  <img className='card' src={img} alt="cover" />
)
const Row = ({ title , arr = [] }) => 
(
<div className='row'>
  <h2>{title}</h2>
  <div>
  {
    arr.map((item,index)=>(
      <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
    ))}
  </div>
</div>
)

const Home = () => {
const [upcomingMovies,setUpcomingMovies]=useState([]);
const [nowPlayingMovies,setNowPlayingMovies]=useState([]);
const [popularMovies,setPopularMovies]=useState([]);
const [topRatedMovies,setTopRatedMovies]=useState([]);
const [genre,setGenre]=useState([]);

useEffect(() => {
  
    const fetchUpcoming = async () => {
  const {data : {results},} = await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}`)

  setUpcomingMovies(results);
   }
   const fetchNowPlaying = async () => {
    const {data : {results}} = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apikey}`)
  setNowPlayingMovies(results);
     }
     const fetchPopular = async () => {
      const {data : {results}} = await axios.get(`${url}/movie/${popular}?api_key=${apikey}&page=3`)
    setPopularMovies(results);
       }
       const fetchTopRated = async () => {
        const {data : {results}} = await axios.get(`${url}/movie/${topRated}?api_key=${apikey}`)
      setTopRatedMovies(results);
         }
         const getAllGenre = async () => {
          const {data : {genres}} = await axios.get(`${url}/genre/movie/list?api_key=${apikey}`)
        setGenre(genres);
           }

   getAllGenre();        
   fetchUpcoming();
   fetchNowPlaying();
   fetchPopular();
   fetchTopRated();
  }, [])
  
  return (
   <section className='home'>

    <div className="banner" style={{backgroundImage :upcomingMovies[0]?`url(${`${imgUrl}/${upcomingMovies[0].poster_path}`})`:"black"}}>
      {upcomingMovies[0]&&(<h1>{upcomingMovies[0].original_title}</h1>)}
      {upcomingMovies[0]&&(<p>{upcomingMovies[0].overview}</p>)}
      <div>
      <button> <BiPlay/>Play</button>
      <button>My List <AiOutlinePlus /> </button>
      </div>
    </div>
    
    <Row title={"Upcoming "} arr={upcomingMovies} />
    <Row title={"Now Playing "} arr={nowPlayingMovies} />
    <Row title={"Popular "} arr={popularMovies} />
    <Row title={"Top Rated "} arr={topRatedMovies} />

    <div className="genreBox">
      {genre.map((item)=>(
      <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
      ))}
    </div>

   </section>
  )
}

export default Home