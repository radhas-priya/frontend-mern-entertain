import React,{useState} from 'react'
import styled from "styled-components";
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import "../index.css";
import {firebaseAuth} from "../utils/firebase-config";
import { createUserWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


export default function Signup() {
    const navigate =useNavigate()
    const [showPassword,setShowPassword]= useState(false);
    const [formValues,setFormValues] = useState({
        email:"",
        password:""
    })
    const handleSignIn= async()=>{
      try{
        const {email,password} =formValues;
        await createUserWithEmailAndPassword(firebaseAuth,email,password)
      }catch(err){
        console.log(err);
      }
    };
    
    onAuthStateChanged(firebaseAuth,(currentUser)=>{
        if(currentUser) navigate("/")
    })

  return (
   <Container showPassword={showPassword}>
    <BackgroundImage/>
    <div className='content'>
        <Header login/>
        <div className ="body flex a-center j-center  column">
           <div  className='flex column text'>
            <h1>Unlimited Tv Shows and movies</h1>
            <h4> Watch anywhere . Cancel anytime</h4>
            <h6>Ready to watch? Lets START.Enter your email to create or restart memebership</h6>
           </div>
           <div className="form">
            <input type ="email" placeholder="email address" name="email" value={formValues.email} onChange={(e)=>
            setFormValues({...formValues,
                [e.target.name]: e.target.value,
            })}
  ></input>
            {
                showPassword && <input type="password" 
                placeholder="password" 
                name="password"  
                value={formValues.password} onChange={(e)=>
                    setFormValues({...formValues,[e.target.name]:e.target.value})}>
                    </input>
            }
            {/* <div class="wrap "> */}
            {!showPassword &&  <button className="button" onClick={
                
                ()=> setShowPassword(true)}>Get started</button>


             }
             
              <button className="button wrapper" onClick={handleSignIn}>Sign up</button>
{/* </div> */}
            </div>
           </div>




        </div>



   
   </Container>
  )
}
const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        h1 {
          padding: 0.25rem;
        }
      }
      .form {
        display: grid;
        grid-template-columns:${({showPassword})=>showPassword ? "1fr 1fr" : "2fr 1fr"}
        width: 60%;
        input {
          color: black;
          border: none;
          padding: 1.5rem;
          font-size: 1.2rem;
          margin-bottom:1px;
          border: 1px solid grey;
          border-radius:17px;
          &:focus {
            outline: none;
          }
        }
        button {
          padding: 0.5rem 1rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          border-radius: 12px;
          font-weight: bolder;
          font-size: 1rem;
        }

        button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            margin-top:2px;
            border-radius: 12px;
            font-weight: bolder;
            font-size: 1rem;
          }
      }
    }
  }
`;
