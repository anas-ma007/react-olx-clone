import React, {useEffect, useState, useContext} from 'react';

import './View.css';
// import { PostContext } from '../../store/postContext';
import { FirebaseContext } from '../../store/FirebaseContext';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';





function View() {
  const [userDetails, setUserDetails] = useState()
  // const {postDetails}= useContext(PostContext)
  const { firebase } = useContext(FirebaseContext);
  const postDetails = JSON.parse(localStorage.getItem('productDetails'))
  useEffect(()=>{
    const { userId } = postDetails;
    const db = getFirestore(firebase)
    console.log(postDetails, "post details post details post details ") 

    getDocs(query(collection(db, "users"), where("id", "==", userId)))
    .then((querySnapshot) => {
      const details = querySnapshot.docs.map((doc) => doc.data());
      console.log(details, " User detailssssssss ")
      setUserDetails(details[0])
    })
    .catch((error) => {
      console.log("Error fetching documents:", error);
    });
}, [])

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails?.imageUrl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price}</p>
          <span>{postDetails?.name}</span>
          <p>{postDetails?.category}</p>
          <span>{postDetails?.createdOn}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.name}</p>
          <p>{userDetails?.mobile}7</p>
        </div>
      </div>
    </div>
  );
}
export default View;
