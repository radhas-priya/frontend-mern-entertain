import React from 'react';
import styled from "styled-components";
// import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import "../../src/index.css";
export default function Header(props) {
    const navigate =useNavigate();
  return (
    <Container className =" container-header j-between a-center flex">
        <div className = "logo">
            {/* <img src={logo} alt="logo"/> */}
        </div>

        <button onClick ={()=>navigate(props.login ? "/login" : "/signup")}>
            {props.login ? "Login" : "Signin please"}
        </button>
    </Container>
  )
}
const Container = styled.div`
  padding: 0.4rem;
  // .logo {
  //   img {
  //     height: 5rem;
  //   }
  // }
  button {
    padding: 0.5rem 1rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 1.05rem; 
  }
`
