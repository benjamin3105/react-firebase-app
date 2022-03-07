import './App.css'
import { addDoc } from "firebase/firestore"
import * as firestore from "firebase/firestore"
import { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik';
import { db } from './firebase'
import Login from './components/Login'
import AddTodo from './components/AddTodo';



//import { collection, addDoc, getDocs } from "firebase/firestore" 

function App() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
      firestore.getDocs(firestore.collection(db, "todos")).then((querySnapshot) => {
        setTodos(querySnapshot.docs.map(doc => doc.data()))
      })   
    },[])
    

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

    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div className="flex items-center justify-between h-16">
        <div className='flex items-center'>
        
        <h3 className="text-1xl font-bold text-white">Firebase App</h3>
        <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Team</a>
        </div>

        <div className='hidden md:block'>
        <div className='ml-4 flex items-center md:ml-6'>
        <div className="dropdown relative">
          <a className="dropdown-toggle flex items-center hidden-arrow"
            href="#" id="dropdownMenuButton2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <div>
              <div className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span className="sr-only">Open user menu</span>
                <img className="h-8 w-8 rounded-full" src="https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png" alt="" />
              </div>
            </div>
          </a>
          <ul
            className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 hidden m-0 bg-clip-padding border-none left-auto right-0"
            aria-labelledby="dropdownMenuButton2">
            <li>
              <a className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                href="#">Action</a>
            </li>
            <li>
              <a className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                href="#">Another action</a>
            </li>
            <li>
              <a className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                href="#">Something else here</a>
            </li>
          </ul>
        </div>

      </div>
        </div>
      </div>
    </nav>
  
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Firebase App</h1>
          </div>

        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="px-4 py-6 sm:px-0">
      
              <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Team
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Job
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Department
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                        {todos.map((todo, i) => (
                          <tr key={i}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="whitespace-nowrap">
                                  {/* {(todo.users === null) ? todo.users.map((u, i) => ( <span key={i}>{u}</span> )) : null} */}
                                  {todo.users.map((u, i) => ( <div className="text-sm font-medium text-gray-900" key={i}>{u}</div> ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{todo.title}</div>
                              <div className="text-sm text-gray-500">{todo.description}</div>
                              
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {todo.progress}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {todo.department.map((d, i) => ( <div className="text-sm font-medium text-gray-900" key={i}>{d}</div> ))}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                Edit
                              </a>
                            </td>
                          </tr>        
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              
              <AddTodo stateChanger={setTodos} todos={todos} />
              
              <Login />

            </div>
            {/* /End replace */}
          </div>
        </main> 


      


    
    </div>
  );
}

export default App
