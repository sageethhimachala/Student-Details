import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Create() {

    const navigate = useNavigate()
    
    const location = useLocation();

    const user = location.state || {};

    console.log(user)

    const [form, setForm] = useState({
      id: "",
      name: "",
      email: ""
    })

    useEffect(() => {
      setForm(user)
    }, [])


    const handleChange = e => {
        const { name, value } = e.target;
        setForm({...form, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();

        (form.name && form.email) && axios.post('http://localhost:8081/create', form)
        .then(() => {
            setForm({
                name: "",
                email: ""
            })
            navigate('/')
        })
        .catch((err) => console.log(err));
    }

  return (
    <>
  <h1 className='text-center font-bold text-4xl py-6 bg-blue-900 text-white shadow-md'>{user.id ? 'Update Student Details' : 'Create New Student'}</h1>
  <div className="flex justify-center py-10 bg-gray-100">
        <div className="w-11/12 max-w-4xl bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit} className="p-6 rounded-lg">
            <div className="grid grid-cols-1 gap-6">
              <div className="col-span-1">
                <label
                  htmlFor="name"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Student Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Name"
                />
              </div>

              <div className="col-span-1">
                <label
                  htmlFor="email"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Email"
                />
              </div>
            </div>

            <div className="mt-6 text-right">
                
              <button
                type="submit"
                className="bg-green-600 text-white rounded-md py-3 px-6 mr-5 font-bold hover:bg-green-700 transition-all"
              >
                {user.id ? 'Update' : 'Add Student'} 
              </button>
              <button
                onClick={() => {navigate('/')}}
                className="bg-blue-600 text-white rounded-md py-3 px-6 font-bold hover:bg-blue-700 transition-all"
              >
                Student List
              </button>
            
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Create