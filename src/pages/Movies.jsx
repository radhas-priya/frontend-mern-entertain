import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { fetchDataByGenre,getGenres } from '../store';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import styled from "styled-components";
import NotAvailable from '../components/NotAvailable';
import Slider from '../components/Slider';
import Navbar from '../components/Navbar';
import SelectGenres from '../components/SelectGenres';

export default function Movies() {
  const genresLoaded = useSelector((state) => state.entertain.genresLoaded);
  const movies = useSelector((state) => state.entertain.movies);
  const genres = useSelector((state) => state.entertain.genres);
  const dispatch = useDispatch(); 
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY === 0 ? false : true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    // if (currentUser) navigate("/")
  })

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchDataByGenre({ type:"movie" }));
    }
  },[genresLoaded,dispatch]);

  return (
    <Container>
      <div className='navbar'>
        <Navbar isScrolled={isScrolled} />
      </div>
     
      <div className="data">
      <SelectGenres genres={genres} type="movie"/>
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
