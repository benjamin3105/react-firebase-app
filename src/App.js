import './App.css'
import * as firestore from "firebase/firestore"
import { useState, useEffect } from 'react'
import { db } from './firebase'
import { doc, deleteDoc, setDoc, collection, addDoc } from "firebase/firestore";
import Login from './components/Login'
import AddTodo from './components/AddTodo'

import { auth } from './firebase'
import { onAuthStateChanged } from "firebase/auth";

function App() {
    const [todos, setTodos] = useState([])
    const [progress, setProgress] = useState('Todo')

    useEffect(() => {
      firestore.getDocs(firestore.collection(db, "todos")).then((querySnapshot) => {

        // querySnapshot.docs.map((ids) => {
        
        //   console.log(ids.id)
        // })

        // const dataid = querySnapshot.docs.map((doc) =>  ([ {id: doc.id, data: doc.data()}])   )

        const data = querySnapshot.docs.map((doc) => doc.data()  )

        setTodos(data)

      })   
    },[])

    useEffect(() => {
      setProgress('Todo')
    }, [])

    function handleTodo(value) {
      setProgress(value)
    }

    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log('User is signed in')
        } else {
          // User is signed out
          console.log('No user is signed in')
        }
      })
    },[])



    function deleteTodo(e) {
      alert(e)
      firestore.deleteDoc(doc(db, "todos", "DOC_ID"))
    }


    return (
    <div className="App">

    <nav className="w-100 px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div className="flex items-center justify-between h-16">
        <div className='flex items-center'>
        
        <h3 className="text-1xl font-bold text-white">Firebase App</h3>
        <a href="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Team</a>
        </div>

        

        <div className='hidden md:block'>
        <div className='ml-4 flex items-center md:ml-6'>
        
        <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium mr-3" 
        type="button" 
        data-bs-toggle="offcanvas" 
        data-bs-target="#offcanvasTop" 
        aria-controls="offcanvasTop"
        data-mdb-ripple="true"
        data-mdb-ripple-color="light">Login</button>

        <div className="dropdown relative">
          <a className="dropdown-toggle flex items-center hidden-arrow"
            href="/" id="dropdownMenuButton2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                href="/">Action</a>
            </li>
            <li>
              <a className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                href="/">Another action</a>
            </li>
            <li>
              <a className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                href="/">Something else here</a>
            </li>
          </ul>
        </div>

      </div>
        </div>
      </div>
    </nav>
  
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6">
            <h1 className="text-3xl font-bold text-gray-900">Firebase App</h1>
            
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6">

            <button 
            onClick={() => handleTodo('Todo')}
            value="Todo"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg  focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out mr-1.5">
            Todo
            </button>

            <button 
            onClick={() => handleTodo('In progress')}
            value="In progress"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg  focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out mr-1.5">
            In Progress
            </button>

            <button 
            onClick={() => handleTodo('Feedback')}
            value="Feedback"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg  focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out mr-1.5">
            Feedback
            </button>

            <button 
            onClick={() => handleTodo('Done')}
            value="Done"
            data-mdb-ripple="true"
            data-mdb-ripple-color="light"
            className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg  focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out mr-1.5">
            Done
            </button>            

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

                          (todo.progress === progress) ? 

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
                              <div className="text-sm text-gray-500">{todo.id}</div>
                              
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-800 text-white rounded">
                            {todo.progress}
                            </span>

                              
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {todo.department.map((d, i) => ( <div className="mr-2 text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-indigo-600 text-white rounded" key={i}>{d}</div> ))}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="/" className="text-indigo-600 hover:text-indigo-900">
                                <div onClick={(e) => deleteTodo(todo.id)}>Delete</div>
                              </a>
                            </td>
                          </tr>        
                        
                          : null
                        
                        
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              

              {/* <div className="max-w-7xl fixed bottom-4 left-1/2 transform -translate-x-1/2 inline-flex left-0 mx-auto justify-between w-11/12"> */}
              
              <button 
              className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg  focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out mr-1.5" 
              type="button" 
              data-bs-toggle="offcanvas" 
              data-bs-target="#offcanvasRight" 
              aria-controls="offcanvasRight"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light">Add Todo</button>

              {/* </div> */}
              

              

              <div className="offcanvas offcanvas-end fixed bottom-0 flex flex-col max-w-full bg-white invisible bg-clip-padding shadow-sm outline-none transition duration-300 ease-in-out text-gray-700 top-0 right-0 border-none w-96" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header flex items-center justify-between p-4">
                  <h5 className="offcanvas-title mb-0 leading-normal font-semibold" id="offcanvasRightLabel">Work it baby!</h5>
                  <button type="button" className="btn-close box-content w-4 h-4 p-2 -my-5 -mr-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body flex-grow p-4 overflow-y-auto">
                  <AddTodo stateChanger={setTodos} todos={todos} />
                </div>
              </div>
              

              

              <div className="offcanvas offcanvas-top fixed bottom-0 flex flex-col max-w-full bg-white invisible bg-clip-padding shadow-sm outline-none transition duration-300 ease-in-out text-gray-700 top-0 left-0 right-0 border-none h-1/3 max-h-full" tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                <div className="offcanvas-header flex items-center justify-between p-4">
                <h5 className="offcanvas-title mb-0 leading-normal font-semibold" id="offcanvasRightLabel">Login</h5>
                  <button type="button" className="btn-close box-content w-4 h-4 p-2 -my-5 -mr-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body flex-grow p-4 overflow-y-auto">
                  <Login />
                </div>
              </div>
              

            </div>
          </div>
        </main> 

    </div>
  )
}

export default App
