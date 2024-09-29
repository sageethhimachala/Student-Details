import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Home() {

  const [data, setData] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:8081/')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])

  return (
  <>
  <h1 className='text-center font-bold text-4xl py-6 bg-blue-900 text-white shadow-md'>Student Details</h1>
    <div className='flex justify-center py-10 bg-gray-100'>
      <div className='flex w-11/12 max-w-5xl bg-white shadow-lg rounded-lg p-6'>
        <table className='w-full table-auto border-collapse'>
          <thead>
            <tr className='bg-blue-800 text-white text-left'>
              <th className='py-4 px-6 text-lg'>ID</th>
              <th className='py-4 px-6 text-lg'>Name</th>
              <th className='py-4 px-6 text-lg'>Email</th>
              <th className='py-4 px-6 text-lg text-center'>Action</th>
            </tr>
            </thead>
            <tbody className='w-full'>
              {data.map((student, index) => {
                return <tr key={index} className={`text-center font-semibold ${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'
                } hover:bg-gray-200 transition-colors`}>
                  <td className="py-4 px-6">{student.id}</td>
                  <td className="py-4 px-6">{student.name}</td>
                  <td className="py-4 px-6">{student.email}</td>
                  <td className="py-4 px-6">
                  <button className='bg-blue-500 text-white rounded-md py-2 px-4 mr-3 hover:bg-blue-600 transition-all'>Show</button>
                    <button className='bg-yellow-500 text-white rounded-md py-2 px-4 mr-3 hover:bg-yellow-600 transition-all'>Edit</button>
                    <button className="bg-red-500 text-white rounded-md py-2 px-4 hover:bg-red-600 transition-all">Delete</button>
                  </td>
                </tr>
              })}
              <tr>
                <td colSpan="4" className="text-right py-6">
                  <Link to="/create">
                  <button className="bg-green-600 text-white rounded-md py-3 px-6 font-bold hover:bg-green-700 transition-all">
                    Create New Student
                  </button>
                  </Link>
                </td>
              </tr>
            </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default Home