import './Signup.css';
import React from 'react';
import {useState, useContext} from "react";
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/FirebaseContext';
import {useNavigate, Link} from 'react-router-dom'
// import { useHistory} from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';






export default function  Signup() {
  const navigate = useNavigate()
 const [username, setUsername] = useState('')
 const [email, setEmail] = useState('')
 const [phone, setPhone] = useState('')
 const [password, setPassword] = useState('')
 const {firebase}= useContext(FirebaseContext)
 const db = getFirestore(firebase)



 const handleSubmit=(e)=>{
  e.preventDefault()  

  const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    updateProfile(auth.currentUser, {
      
      displayName: username 
    })
    addDoc(collection(db, "users"), {
      id: user?.uid,
      name: username,
      email: email,
      phone: phone
    });
    navigate('/login');
  }).catch((error) => {
    console.log(error, "catch error");
  });

 }
  return (
    <div>
      <div className="signupParentDiv">
        <Link to={'/'}>  <img width="200 px" height="200px" src={Logo}></img> </Link>
       
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
         <Link to={'/login'}> Login </Link> 
      </div>
    </div>
  );
}
