import React, { Fragment, useContext , useEffect} from "react";
import "./Create.css";
import Header from "../Header/Header";
import { useState } from "react";
import { firebase } from "../../Firebase/config";
import { AuthContext, FirebaseContext } from "../../store/FirebaseContext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const date = new Date();

  const db = getFirestore(firebase);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (userDetails) => {
      if (userDetails) {
        setUser(userDetails)
      } else {
        console.log(" No User ...")
      }
    });
  }, [])

  const handleSubmit = () => {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${image.name}`);
    // Product creating
    console.log("loggggg before add produvts");
    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(storageRef).then((url) => {
        addDoc(collection(db, "products"), {
          name,
          category,
          price,
          imageUrl: url,
          userId: user?.uid,
          createdOn: date.toDateString(),
        });
        navigate("/");
      });
    });
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="fname"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name="Price"
          />
          <br />
          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : ""}
          ></img>
          <br />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
