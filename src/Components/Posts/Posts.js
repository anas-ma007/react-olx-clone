import React, { useEffect, useContext, useState } from "react";

import Heart from "../../assets/Heart";
import "./Post.css";
import { FirebaseContext } from "../../store/FirebaseContext";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import {useNavigate} from 'react-router-dom'
import{ PostContext } from "../../store/postContext";

function Posts() {
  const navigate = useNavigate()
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const {setPostDetails} = useContext(PostContext)
  
  useEffect(() => {
    const db = getFirestore(firebase);
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const Products = querySnapshot.docs.map((doc) => doc.data());
        console.log("Products in consoleee:", Products);
        setProducts(Products);
        setFilteredData(Products);
        
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards" >


          {filteredData.map(item=> {
            return (

            <div className="card" onClick={()=>{
              setPostDetails(item)
              localStorage.setItem('productDetails', JSON.stringify(item))
                console.log("This is local storage .....", JSON.parse(localStorage.getItem('productDetails')));
                navigate('/view');
    
    
            }}>
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={item?.imageUrl} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {item?.price}</p>
                <span className="kilometer"> {item.category} </span>
                <p className="name"> {item?.name} </p>
              </div>
              <div className="date">
                <span>{item?.createdOn}</span>
              </div>
            </div>
            )
            
          })}


        </div>
      </div>
      {/* <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Posts;
