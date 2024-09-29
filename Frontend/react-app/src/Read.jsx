import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

function Read() {

  const {id} = useParams();
  const [student, setStudent] = useState({
    id: "",
    name: "",
    email: ""
  });

  useEffect(() => {
    axios.get('http://localhost:8081/read/' + id)
    .then(res => { 
      console.log(res);
      setStudent(res.data[0]);
  })
    .catch(err => console.log(err))
  }, [])

  return (
    <>
    <h1 className='text-center font-bold text-4xl py-6 bg-blue-900 text-white shadow-md'>Student Details</h1>
    <div className="flex justify-center py-10 bg-gray-100">
        <div className="w-11/12 max-w-4xl bg-white shadow-lg rounded-lg p-8 border border-gray-200">
          <div className="space-y-4">
            {/* Student ID */}
            <div className="grid items-center p-4 bg-gray-50 rounded-lg shadow-sm">
              <p className='text-lg font-semibold text-gray-500'>
                Student ID :
              </p>
              <p className='text-lg font-bold text-gray-800'>
                {student.id}
              </p>
            </div>
            {/* Name */}
            <div className="grid items-center p-4 bg-gray-50 rounded-lg shadow-sm">
              <p className='text-lg font-semibold text-gray-500'>
                Name :
              </p>
              <p className='text-lg font-bold text-gray-800'>
                {student.name}
              </p>
            </div>
            {/* Email */}
            <div className="grid items-center p-4 bg-gray-50 rounded-lg shadow-sm">
              <p className='text-lg font-semibold text-gray-500'>
                Email :
              </p>
              <p className='text-lg font-bold text-gray-800'>
                {student.email}
              </p>
            </div>
          </div>

          <div className="mt-6 text-right">
            <Link to="/">
              <button
                className="bg-green-600 text-white rounded-md py-3 px-6 font-bold hover:bg-green-700 transition-all shadow-md"
              >
                Student List
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Read