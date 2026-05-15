import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const [login, setLogin] = useState(localStorage.getItem('login'))
  const [userName, setUserName] = useState(localStorage.getItem('userName'))
  const [menuOpen, setMenuOpen] = useState(false)
  const navigatE = useNavigate()

  const logout = () => {
    localStorage.removeItem('login')
    localStorage.removeItem('userName')
    localStorage.removeItem('authToken')
    setLogin(null)
    setUserName(null)
    setMenuOpen(false)
    setTimeout(() => {
      navigatE('/login')
    }, 0);
  }

  useEffect(() => {
    const handleStorage = () => {
      setLogin(localStorage.getItem('login'))
      setUserName(localStorage.getItem('userName'))
    }
    window.addEventListener("localStorage-change", handleStorage)
    return () => {
      window.removeEventListener("localStorage-change", handleStorage)
    }
  }, [])

  return (
    <section className="bg-zinc-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Left Side */}
        <div className="flex flex-col leading-tight">

          {/* Large screen: ToDo App only */}
          <h1 className="hidden md:block text-xl font-semibold tracking-wide">
            ToDo App
          </h1>

          {/* Small screen: username only */}
          {login ? (
            <span className="md:hidden text-base font-semibold">
              Hi, {userName || login}
            </span>
          ) : (
            <h1 className="md:hidden text-xl font-semibold tracking-wide">
              ToDo App
            </h1>
          )}

        </div>

        {/* Right Side */}
        {login && (
          <div className="flex items-center gap-3">

            {/* Username — large screen only */}
            <span className="hidden md:block text-gray-300 text-sm">
              Hi, {userName || login}
            </span>

            {/* List — large screen only */}
            <Link
              to="/"
              className="hidden md:block hover:text-blue-400 text-sm font-medium transition duration-200"
            >
              List
            </Link>

            {/* Add Task — visible on all screens */}
            <Link
              to="/add"
              className=" hover:text-blue-400 text-sm font-medium transition duration-200"
            >
             Add Task
            </Link>

            {/* Logout — large screen only */}
            <button
              onClick={logout}
              className="hidden md:block bg-zinc-500 hover:bg-zinc-400 px-3 py-1.5 rounded-md text-sm font-medium transition duration-200"
            >
              Log out
            </button>

            {/* Hamburger — small screen only */}
            <button
              className="md:hidden flex flex-col gap-1.5 focus:outline-none ml-1"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>

          </div>
        )}

      </div>

      {/* Dropdown Menu */}
      {login && menuOpen && (
        <div className="bg-zinc-700 px-6 py-3 flex flex-col gap-3 text-sm font-medium">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-400 transition duration-200"
          >
           List
          </Link>

          {/* Logout inside hamburger — small screen only */}
          <button
            onClick={logout}
            className="md:hidden text-left text-red-400 hover:text-red-300 transition duration-200"
          >
           Log out
          </button>
        </div>
      )}

    </section>
  )
}

export default Navbar