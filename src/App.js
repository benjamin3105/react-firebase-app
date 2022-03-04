import './App.css'
import { addDoc } from "firebase/firestore"
import * as firestore from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { useState, useEffect, useRef } from 'react'

import firebase, {db, auth} from './firebase'

//import { collection, addDoc, getDocs } from "firebase/firestore" 

function App() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const emailRef = useRef() 
  const passwordRef = useRef() 

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
  },[title])

  const addTodo = (e) => {
    e.preventDefault()
    addDoc(firestore.collection(db, 'todo'), {
      title: title,
      timestamp: dateTime,
      description: description,
      progress: "Feedback",
      department: "Administration",
    })
    setTodos([...todos, title])
    setTitle('')
    setDescription('')
  }

    // Create a password-based account
    function createUser() {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user
        console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        // ..
      })
    }

    function handleChange() {
      setEmail(emailRef.current?.value)
    }

    function signIn() {
      alert('You have been logged in')

      const email = emailRef.current?.value
      const password = passwordRef.current?.value
      
      // Sign in a user with an email address and password
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user
        console.log(user)
        setTodos(todos)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
      })
    }
  

  return (
    <div className="App">
      <h1>FireBase App</h1>

      {todos.map((todo, i) => (
        <div key={i}>
          <p><strong>{todo.title}</strong><br/>
          {todo.description}</p>
        </div>
      ))}
   
      <form>
        <input 
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        type="text"/>
        <input 
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        type="text"/>
        <button onClick={addTodo}>Add Todo</button>
      </form>

      {/* <button onClick={addEntry}>add</button> */}

      <input 
      ref={emailRef}
      onChange={handleChange}
      type="email" 
      placeholder="E-mailaddress" />
      <input 
      ref={passwordRef}
      type="password" 
      placeholder="Password" />
      <button onClick={signIn} >Sign In</button>
    </div>
  );
}

export default App
