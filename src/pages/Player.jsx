import React from 'react';
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import video from "../assets/animevideo.mp4";
import styled from "styled-components";

export default function Player() {
    const navigate = useNavigate();
    return (
        <Container>
            <div className="player">
                <div className="back">
                    <BsArrowLeft onClick={() => navigate(-1)} />
                </div>
                <video src={video} autoPlay loop controls muted />
            </div>
        </Container>
    );
}

const Container = styled.div`
  .player {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    
    .back {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 1;
      cursor: pointer;
      svg {
        font-size: 2rem;
        color: white;
      }
    }

    video {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: translate(-50%, -50%);
    }
  }
`;
