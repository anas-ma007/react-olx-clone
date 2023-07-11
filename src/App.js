import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";

/**
 * ?  =====Import Components=====
 */

import Home from "./Pages/Home";
import SignupPage from "./Pages/Signup";
import LoginPage from "./Pages/Login";
import ViewPost from "./Pages/ViewPost";
import CreatePage from "./Pages/Create";
import { AuthContext } from "./store/FirebaseContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Posts from "./Components/Posts/Posts";




function App() {
  const {user, setUser} = useContext(AuthContext)
  // const { firebase } = useContext(FirebaseContext)

  useEffect(()=>{
    console.log(user);
    const auth = getAuth();
    onAuthStateChanged(auth, (userDetails) => {

      if (userDetails) {
        console.log(userDetails, "user details for set user")
        console.log(userDetails.displayName, "user details for set user displayname")
        setUser(userDetails)
      } else {
        console.log(" No User ...")
      }
    });

  })
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/view" element={<ViewPost />} />
          <Route path="/create" element={<CreatePage />} />
          {/* <Route path="/post" element={<Posts />} /> */}
        </Routes>
      </Router>
    </div>
  );
}
// function App() {
//   return (
//     <div>
//       <Router>
//         <Route exact path="/">
//           <Home />
//         </Route>

//         <Route path="/signup">
//           <SignupPage />
//         </Route>

//         <Route path="/login">
//           <LoginPage />
//         </Route>

//         <Route path="/viewpost">
//           <ViewPost />
//         </Route>

//         <Route path="/create">
//           <CreatePage />
//         </Route>
//       </Router>
//     </div>
//   );
// }

export default App;
