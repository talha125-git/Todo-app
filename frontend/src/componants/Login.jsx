import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

    const [userData,setUserData]=useState()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-6 text-sm">
          Login to continue your tasks
        </p>

        <div className="flex flex-col gap-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              onChange={(event)=>setUserData({...userData,email:event.target.value})}
              type="text"
              name="email"
              placeholder="Enter email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              onChange={(event)=>setUserData({...userData,password:event.target.value})}
              type="text"
              name="password"
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            onClick={()=>console.log(userData)}
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg font-medium transition duration-200 cursor-pointer"
          >
            Log in
          </button>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link 
              to='/signup' 
              className="text-blue-600 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>

        </div>

      </div>

    </div>
  )
}

export default Login