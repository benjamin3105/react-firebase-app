import React, { useRef } from 'react'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
    const emailRef = useRef() 
    const passwordRef = useRef() 

    function signIn() {
        const email = emailRef.current?.value
        const password = passwordRef.current?.value

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // const user = userCredential.user
            window.location.reload()
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode + errorMessage)
        })
    }
    
    return (
        <div className="min-h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                        <input 
                            ref={emailRef}
                            type="email" 
                            placeholder="E-mailaddress"
                            required
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            />
                        </div>
                        <div>
                        <input 
                            ref={passwordRef}
                            type="password" 
                            placeholder="Password"
                            required
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            />
                        </div>
                    </div>
                    <button 
                    onClick={signIn} 
                    className="inline-block px-7 py-3 bg-indigo-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light">Sign In</button>
                </div>
            </div>
      </div>
    )
}
