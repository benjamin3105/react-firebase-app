import React, { useState, useRef } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth"
import firebase, {auth} from '../firebase'


export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const emailRef = useRef() 
    const passwordRef = useRef() 

    function signIn() {
        console.log('signIn')
        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            console.log('signInWithEmailAndPassword')
            window.location.reload()
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
        })
    }
    
    function handleChange() {
        setEmail(emailRef.current?.value)
    }

    return (
        <div>
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
    )
}
