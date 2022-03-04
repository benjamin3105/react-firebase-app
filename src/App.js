import './App.css'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
//import { collection, addDoc, getDocs } from "firebase/firestore"; 
import * as firestore from "firebase/firestore";
import { useEffect } from 'react';

function App() {

  const firebaseConfig = {
    
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const analytics = getAnalytics(app)
  const db = getFirestore();

  const addEntry = () => {
    try {
        const docRef = firestore.addDoc(firestore.collection(db, "todo"), {
            title: "Quotation Firebase Application",
            description: "Our new Firebase application for The Goodplace",
            progress: "Feedback",
            departmennt: "Administration",
        })
        console.log("Document written with ID: ", docRef.id)
    } catch (e) {
        console.error("Error adding document: ", e)
    }
  }

  useEffect(() => {
    firestore.getDocs(firestore.collection(db, "users")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc)
          // console.log(`${doc.id} => ${doc.data()}`);
      })
    })
  },[])

  useEffect(() => {
    firestore.getDocs(firestore.collection(db, "todo")).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc)
          // console.log(`${doc.id} => ${doc.data()}`);
      })
    })
  },[])
  

  return (
    <div className="App">
      <h1>FireBase App</h1>
      <button onClick={addEntry}>add</button>
    </div>
  );
}

export default App
