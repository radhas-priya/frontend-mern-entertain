import React from 'react'
import Background from "../assets/login.jpg";
import styled from 'styled-components';
export default function BackgroundImage() {
  return (
    <Container>
   <img src={Background} alt="background"></img>
   </Container>

  )
}
const Container =styled.div`
    height:100vh;
    width:100vw;
    img{
        height:100vw;
        width:100vw;
    }`
