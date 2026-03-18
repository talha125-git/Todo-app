import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {

    const [userData, setUserData] = useState();

    const Navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('login')) navigate('/')
    }, [])  // ✅ add empty array

    const handleSignUp = async () => {
        console.log("Trying to connect to:", import.meta.env.VITE_API_URL + '/signup',);
        try {
            let result = await fetch(import.meta.env.VITE_API_URL + '/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
                credentials: 'include'
            })
            result = await result.json()
            console.log("Signup response:", result);
            if (result.success) {
                localStorage.setItem('authToken', result.token)  // ✅ add this
                localStorage.setItem('login', userData.email)
                localStorage.setItem('userName', userData.name)
                window.dispatchEvent(new Event('localStorage-change'))
                Navigate('/')
            } else {
                alert('Signup failed: ' + result.msg)
            }
        } catch (error) {
            console.error("Signup error:", error.message); // ✅ shows exact error
            alert('Error: ' + error.message)              // ✅ shows in browser too
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Create Account
                </h1>

                <div className="flex flex-col gap-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            onChange={(event) => setUserData({ ...userData, name: event.target.value })}
                            type="text"
                            name="name"
                            placeholder="Enter username"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            onChange={(event) => setUserData({ ...userData, email: event.target.value })}
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
                            onChange={(event) => setUserData({ ...userData, password: event.target.value })}
                            type="text"
                            name="password"
                            placeholder="Enter password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <button
                        onClick={() => handleSignUp()}
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg font-medium transition duration-200 cursor-pointer"
                    >
                        Sign Up
                    </button>
                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to='/login'
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Log in
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    )
}

export default SignUp