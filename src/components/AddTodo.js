import React, { useState, useEffect } from 'react'
import { addDoc } from "firebase/firestore"
import * as firestore from "firebase/firestore"
import { Formik, Field, Form } from 'formik'
import { db } from '../firebase'
import AddClient from './AddClient'
import 'tw-elements'

export default function AddTodo({stateChanger, todos}) {
    // const [todos, setTodos] = useState([])
    const [clients, setClients] = useState([])
    const [users, setUsers] = useState([])
    const [isActive, setActive] = useState(false)

    const today = new Date()
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    const dateTime = date+' '+time

    useEffect(() => {
        firestore.getDocs(firestore.collection(db, "clients")).then((querySnapshot) => {
            setClients(querySnapshot.docs.map(doc => doc.data()))
        })   
    },[])

    useEffect(() => {
        firestore.getDocs(firestore.collection(db, "users")).then((querySnapshot) => {
            setUsers(querySnapshot.docs.map(doc => doc.data()))
        })   
    },[])

    const addTodo = (values) => {
        console.log(values)
        addDoc(firestore.collection(db, 'todos'), 
        values
    )
    stateChanger([...todos, values])
    }

    // const toggleClass = () => {
    //     setActive(!isActive)
    // }

    return (
    <main>
        <Formik
        initialValues={{
            title: '',
            description: '',
            client: '',
            progress: '',
            department: [],
            users: [],
        }}
        onSubmit={values => addTodo(values)} >
            <Form>
            <div className="grid grid-cols-3 gap-6">

                <div className="col-span-3 sm:col-span-2">
                <label htmlFor="title"
                className="block text-sm font-medium text-gray-700">Title</label>
                <Field id="title" name="title" placeholder="title" type="text"                        
                className="p-2 mt-1 appearance-none border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="col-span-3 sm:col-span-2">
                <label htmlFor="description"
                className="block text-sm font-medium text-gray-700">Description</label>
                <Field id="description" name="description" placeholder="description"
                className="p-2 mt-1 appearance-none border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
                <div className="col-span-3 sm:col-span-2">
                <label htmlFor="client"
                className="block text-sm font-medium text-gray-700">Client</label>
                <Field 
                as="select" 
                name="client"
                className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"'>
                <option value selected disabled hidden >Choose client</option>
                {clients.map((client, i) => (
                    <option key={i} value={client.title}>{client.title}</option>
                ))}
                </Field>
                
                <div
                // onClick={toggleClass}
                data-bs-toggle="modal" data-bs-target="#exampleModal"
                className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">
                Add Client</div>
                </div>
                
                <div className="col-span-3 sm:col-span-2">
                <div role="group" aria-labelledby="my-checkbox-group">

                <label htmlFor="users"
                className="block text-sm font-medium text-gray-700">Worker</label>
                
                {users.map((user, i) => (
                    <div className="form-check" key={i}>
                        <label className="form-check-label inline-block text-gray-800">
                            <Field type="checkbox" name="users" value={user.name}
                            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                            {user.name}
                        </label>
                    </div>
                ))}
                
                </div>
                </div>
                
                <div className="col-span-3 sm:col-span-2">
                <div role="group" aria-labelledby="my-radio-group">
                
                <label htmlFor="client"
                className="block text-sm font-medium text-gray-700">Progress</label>

                <div className="form-check">
                <label className="form-check-label inline-block text-gray-800">
                <Field type="radio" name="progress" value="Todo"
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                Todo
                </label>
                </div>
                <div className="form-check">
                <label className="form-check-label inline-block text-gray-800">
                <Field type="radio" name="progress" value="In progress"
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                In progress
                </label>
                </div>
                <div className="form-check">
                <label className="form-check-label inline-block text-gray-800">
                <Field type="radio" name="progress" value="Feedback"
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                Feedback
                </label>
                </div>
                <div className="form-check">
                <label className="form-check-label inline-block text-gray-800">
                <Field type="radio" name="progress" value="Done"
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                Done
                </label>
                </div>
                </div>
                </div>
                
                <div className="col-span-3 sm:col-span-2">
                <div role="group" aria-labelledby="my-checkbox-group">

                <label htmlFor="client"
                className="block text-sm font-medium text-gray-700">Department</label>

                <div className="form-check">
                <label className="form-check-label inline-block text-gray-800">
                    <Field type="checkbox" name="department" value="Design"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                    Design
                </label>
                </div>
                <div className="form-check">
                <label className="form-check-label inline-block text-gray-800">
                    <Field type="checkbox" name="department" value="Front-end development"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                    Front-end development
                </label>
                </div>
                <div className="form-check">
                <label className="form-check-label inline-block text-gray-800">
                    <Field type="checkbox" name="department" value="Back-end development" 
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                    Back-end development
                </label>
                </div>
                <div className="form-check">
                <label className="form-check-label inline-block text-gray-800">
                    <Field type="checkbox" name="department" value="Administration" 
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" />
                    Administration
                </label>
                </div>
                </div>
                </div>

                <div className="col-span-3 sm:col-span-2">
                <button type="submit"
                className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">Submit</button>
                </div>
            </div>
            </Form>
        </Formik>
        
        <div 
        id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true"
        className={`${isActive ? null : "hidden"} modal fade fixed top-0 left-0 w-full hidden h-full outline-none overflow-x-hidden overflow-y-auto `} >
            <div className="modal-dialog relative w-auto pointer-events-none">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
            <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">Add Client</h5>
            <button type="button"
            className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
            data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
                <div className="modal-body relative p-4">
                    <AddClient stateChanger={setClients} clients={clients}/> 
                </div>            
            </div>
            </div>
        </div>
    </main>
    )
}
