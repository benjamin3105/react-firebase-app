import React from 'react'
import { addDoc } from "firebase/firestore"
import * as firestore from "firebase/firestore"
import { Formik, Field, Form } from 'formik';
import { db } from '../firebase'

export default function AddClient({stateChanger, clients}) {
    const addClient = (values) => {
        console.log(values)
        addDoc(firestore.collection(db, 'clients'), 
        values
    )
    stateChanger([...clients, values])
    }

    return (
        <div className="">
            <Formik
            initialValues={{
            title: '',
            }}
            onSubmit={values => addClient(values)} >
                <Form>
                <label htmlFor="title">Title</label>
                <Field id="title" name="title" placeholder="title" type="text"                        
                className="p-2 mt-1 appearance-none border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />

                <button type="submit"
                className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out">
                    Add client</button>
                </Form>
            </Formik>
        </div>
    )
}
