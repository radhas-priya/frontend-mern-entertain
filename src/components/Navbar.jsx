import React, { useState } from 'react';
import styled from "styled-components";
// import logo from "../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { FaPowerOff, FaSearch } from "react-icons/fa";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';

export default function Navbar({ isScrolled }) {

    const navigate=useNavigate();
    const [showSearch, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);

    const links = [
        { name: "Home", link: "/" },
        { name: "TV Shows", link: "/tv" },
        { name: "Movies", link: "/movies" },
        { name: "My List", link: "/mylist" },
    ];

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) navigate("/login");
    });


    return (
        <Container>
            <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
                <div className="left flex a-center">
                    <div className="brand flex a-center j-center">
                        {/* <img src={logo} alt="logo" /> */}
                    </div>
                    <ul className="links flex">
                        {links.map(({ name, link }) => (
                            <li key={name}><Link to={link}>{name}</Link></li>
                        ))}
                    </ul>
                </div>
                <div className="right flex a-center">
                    <div className={`search ${showSearch ? "show-search" : ""}`}>
                        <button onFocus={() => setShowSearch(true)} onBlur={() => {
                            if (!inputHover) setShowSearch(false);
                        }}>
                            <FaSearch />
                        </button>
                        <input type="text" placeholder="Search"
                            onMouseEnter={() => setInputHover(true)}
                            onMouseLeave={() => setInputHover(false)} />
                    </div>
                    <button onClick={() => signOut(firebaseAuth)}><FaPowerOff /></button>
                </div>
            </nav>
        </Container>
    );
}

const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    z-index: 1000;
    transition: background-color 0.3s ease-in-out;
    
    .left {
      display: flex;
      align-items: center;
      gap: 2rem;
      
      .brand {
        display: flex;
        align-items: center;
        justify-content: center;
        
        img {
          height: 4rem;
        }
      }
      
      .links {
        list-style-type: none;
        display: flex;
        gap: 2rem;
        
        li {
          a {
            color: white;
            text-decoration: none;
            &:hover {
              text-decoration: underline;
            }
          }
        }
      }
    }
    
    .right {
      display: flex;
      align-items: center;
      gap: 1rem;
      
      .search {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.2rem;
        padding-left: 0.5rem;
        border: 1px solid white;
        border-radius: 2px;
        transition: all 0.3s ease-in-out;

        button {
          background-color: transparent;
          border: none;
          cursor: pointer;

          &:focus {
            outline: none;
          }

          svg {
            color: white;
            font-size: 1.2rem;
          }
        }

        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          padding: 0;
          
          &:focus {
            outline: none;
          }
        }
      }

      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        
        input {
          width: 100px;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }

      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
    }
  }
`;
