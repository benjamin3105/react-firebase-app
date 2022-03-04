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
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Title
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Role
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                      
                        {todos.map((todo, i) => (
                          <tr key={i}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  {/* <img className="h-10 w-10 rounded-full" src={person.image} alt="" /> */}
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{todo.title}</div>
                                  <div className="text-sm text-gray-500">{todo.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{todo.progress}</div>
                              <div className="text-sm text-gray-500">{todo.department}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">role</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                Edit
                              </a>
                            </td>
                          </tr>        
                        ))}

                      </table>
                    </div>
                  </div>
                </div>
              </div>
              

              {/* {clients.map((client, i) => (
                <div key={i}>
                  <p>{client.title}</p>
                </div>
              ))} */}

                  <Formik
                    initialValues={{
                      title: '',
                      description: '',
                      client: '',
                      progress: '',
                      department: [],
                    }}
                    onSubmit={values => addTodo(values)}
                    // onSubmit={async (values) => {
                    //   await new Promise((r) => setTimeout(r, 500));
                    //   alert(JSON.stringify(values, null, 2));
                    // }}
                  >
                    <Form>
                      <label htmlFor="title">Title</label>
                      <Field id="title" name="title" placeholder="title" type="text"                        
                      className="p-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />

                      <label htmlFor="description">Description</label>
                      <Field id="description" name="description" placeholder="description" />

                      <Field as="select" name="client">
                        <option value selected disabled hidden>Choose client</option>
                        {clients.map((client, i) => (
                          <option key={i} value={client.title}>{client.title}</option>
                        ))}
                      </Field>

                      <div role="group" aria-labelledby="my-radio-group">
                        <label>
                          <Field type="radio" name="progress" value="Todo" />
                          Todo
                        </label>
                        <label>
                          <Field type="radio" name="progress" value="In progress" />
                          In progress
                        </label>
                        <label>
                          <Field type="radio" name="progress" value="Feedback" />
                          Feedback
                        </label>
                        <label>
                          <Field type="radio" name="progress" value="Done" />
                          Done
                        </label>
                      </div>
                      
                      <div role="group" aria-labelledby="my-checkbox-group">
                        <label>
                          <Field type="checkbox" name="department" value="Design" />
                          Design
                        </label>
                        <label>
                          <Field type="checkbox" name="department" value="Front-end development" />
                          Front-end development
                        </label>
                        <label>
                          <Field type="checkbox" name="department" value="Back-end development" />
                          Back-end development
                        </label>
                        <label>
                          <Field type="checkbox" name="department" value="Administration" />
                          Administration
                        </label>
                      </div>

                      <button type="submit">Submit</button>
                    </Form>
                  </Formik>


      

      <Login />



            </div>
            {/* /End replace */}
          </div>
        </main> 


      


    
    </div>
  );
}

export default App
