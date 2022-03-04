import './App.css'
import { addDoc } from "firebase/firestore"
import * as firestore from "firebase/firestore"
import { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik';


import firebase, {db} from './firebase'

import Login from './components/Login'

//import { collection, addDoc, getDocs } from "firebase/firestore" 

function App() {
  const [todos, setTodos] = useState([])
  const [clients, setClients] = useState([])


  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date+' '+time;

  // const addEntry = () => {
  //   try {
  //       const docRef = firestore.addDoc(firestore.collection(db, "todo"), {
  //           time: dateTime,
  //           title: "Quotation Firebase Application",
  //           description: "Our new Firebase application for The Goodplace",
  //           progress: "Feedback",
  //           departmennt: "Administration",
  //       })
  //       console.log(docRef.title)
  //       setTodos(prevTodos => {
  //         return [...todos, {title: docRef.title}]
  //       })
  //       console.log("Document written with ID: ", docRef.id)
  //   } catch (e) {
  //       console.error("Error adding document: ", e)
  //       console.log('ERROR')
  //   }
  // }

  // useEffect(() => {
  //   firestore.getDocs(firestore.collection(db, "users")).then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc)
  //         // console.log(`${doc.id} => ${doc.data()}`);
  //     })
  //   })
  // },[])

  useEffect(() => {
    firestore.getDocs(firestore.collection(db, "todo")).then((querySnapshot) => {
      setTodos(querySnapshot.docs.map(doc => doc.data()))
    })   
  },[])

  useEffect(() => {
    firestore.getDocs(firestore.collection(db, "clients")).then((querySnapshot) => {
      setClients(querySnapshot.docs.map(doc => doc.data()))
    })   
  },[])

  const addTodo = (values) => {
    console.log(values)
    addDoc(firestore.collection(db, 'todo'), 
      values
    )
    setTodos([...todos, values])
  }

    // Create a password-based account
    // function createUser() {
    //   createUserWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user
    //     console.log(user)
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code
    //     const errorMessage = error.message
    //     // ..
    //   })
    // }

  

  return (
    <div className="App">
      <h1>FireBase App</h1>

      {todos.map((todo, i) => (
        <div key={i}>
          <p><strong>{todo.title}</strong><br/>
          {todo.description}</p>
        </div>
      ))}


      {clients.map((client, i) => (
        <div key={i}>
          <p>{client.title}</p>
        </div>
      ))}


    <Formik
      initialValues={{
        title: '',
        description: '',
      }}
      onSubmit={values => addTodo(values)}
      // onSubmit={async (values) => {
      //   await new Promise((r) => setTimeout(r, 500));
      //   alert(JSON.stringify(values, null, 2));
      // }}
    >
      <Form>
        <label htmlFor="title">Title</label>
        <Field id="title" name="title" placeholder="title" />

        <label htmlFor="description">Description</label>
        <Field id="description" name="description" placeholder="description" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>


      {/* <button onClick={addEntry}>add</button> */}

      <Login />
    </div>
  );
}

export default App
