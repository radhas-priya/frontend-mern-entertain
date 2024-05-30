import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Entertain from './pages/Entertain';
import React from 'react'
import "../src/index.css";
import Player from './pages/Player';
import Movies from './pages/Movies';
import TVShows from './pages/TVShows';
import UserLiked from './pages/UserLiked';
export default function App() {
  return (
    <BrowserRouter>
    <Routes>
     <Route exact path="/login" element={<Login></Login>}></Route>
     <Route exact path="/signup" element={<Signup></Signup>}></Route>
     <Route exact path="/player" element={<Player></Player>}></Route>
     <Route exact path="/movies" element={<Movies></Movies>}></Route>
     <Route exact path="/tv" element={<TVShows></TVShows>}></Route>
     <Route exact path="/mylist" element={<UserLiked></UserLiked>}></Route>


     <Route exact path="/" element={<Entertain></Entertain>}></Route>
    
    </Routes>
    </BrowserRouter>
  )
}
