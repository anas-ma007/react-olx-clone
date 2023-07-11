import React from 'react';
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {Link, useNavigate} from "react-router-dom"

import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {
  const navigate=useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e)=>{
    e.preventDefault()
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      console.log('userCredential :', userCredential);
      console.log('userCredential display name :', userCredential.displayName);
        // Signed in 
        navigate('/')
      }).catch((err)=>{
        console.log(err);
        window.alert(err.message)
      })
  }

  return (
    <div>
      <div className="loginParentDiv">
        {/* <img width="200px" height="200px" src={Logo}></img> */}
        <Link to={'/'}>  <img width="200 px" height="200px" src={Logo}></img> </Link>

        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to={'/signup'}>Signup </Link> 
      </div>
    </div>
  );
}

export default Login;
