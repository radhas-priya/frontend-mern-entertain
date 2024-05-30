import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getGenres } from '../store';
import Navbar from '../components/Navbar';
import BackgroundImage from '../assets/mudesktop.jpg';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Slider from '../components/Slider';

export default function Entertain() {


  const navigate = useNavigate();


 const genresLoaded =useSelector((state)=>state.entertain.genresLoaded);
 const movies = useSelector((state)=>state.entertain.movies);

 const dispatch = useDispatch(); 

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY === 0 ? false : true);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);



  useEffect(() => {
    dispatch(getGenres());
  },[dispatch]);



  useEffect(()=>{
    if(genresLoaded) dispatch(fetchMovies(
      {type:"all"}
    ),[genresLoaded])
      
  });

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className='hero'>
        <img src={BackgroundImage} alt="background" className="background-image" />
        <div className="container">
          <div className="buttons flex">
            <button className='flex j-center a-center' onClick={() => navigate('/player')}>
              <FaPlay />Play
            </button>
            <button className='flex j-center a-center'>
              <AiOutlineInfoCircle />More Info
            </button>
          </div>
        </div>
      </div>
       <Slider movies={movies} />
    </Container>
  );
}

const Container = styled.div`
  .hero {
    position: relative;
    .background-image {
      width: 100%;
      height: 100vh;
      object-fit: cover;
    }
    .container {
      position: absolute;
      top: 20%;
      left: 5%;
      .buttons {
        margin-top: 20px;
        display: flex;
        gap: 1rem;
        button {
          font-size: 1.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
          &:first-of-type {
            background-color: #e50914;
            color: white;
          }
          &:last-of-type {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
          }
        }
      }
    }
  }
`;
