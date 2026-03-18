import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const [login, setLogin] = useState(localStorage.getItem('login'))
  const navigatE = useNavigate()
  
  // ✅ get name from localStorage (we will save it on login/signup)
  const [userName, setUserName] = useState(localStorage.getItem('userName'))

  const logout = () => {
    localStorage.removeItem('login')
    localStorage.removeItem('userName')  // ✅ clear name on logout
    setLogin(null)
    setUserName(null)
    setTimeout(() => {
      navigatE('/login')
    }, 0);
  }

  useEffect(() => {
    const handleStorage = () => {
      setLogin(localStorage.getItem('login'))
      setUserName(localStorage.getItem('userName'))  // ✅ update name
    }
    window.addEventListener("localStorage-change", handleStorage)
    return () => {
      window.removeEventListener("localStorage-change", handleStorage)
    }
  }, [])

  return (
    <section className="bg-zinc-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        <h1 className="text-xl font-semibold tracking-wide">
          ToDo App
        </h1>

        <ul className="flex gap-6 text-sm font-medium items-center">
          {
            login ?
              <>
                {/* ✅ show user name here */}
                <li className="text-gray-300">
                  Hi, {userName || login}
                </li>

                <li>
                  <Link to="/" className="hover:text-blue-400 transition duration-200">
                    List
                  </Link>
                </li>

                <li>
                  <Link to="/add" className="hover:text-blue-400 rounded-md transition duration-200">
                    Add Task
                  </Link>
                </li>

                <li>
                  <Link onClick={logout} className="bg-blue-500 hover:bg-blue-600 px-4 py-1.5 rounded-md transition duration-200">
                    Log out
                  </Link>
                </li>

              </> : null
          }
        </ul>

      </div>
    </section>
  )
}

export default Navbar