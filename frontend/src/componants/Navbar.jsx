import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <section className="bg-zinc-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        
        <h1 className="text-xl font-semibold tracking-wide">
          ToDo App
        </h1>

        <ul className="flex gap-6 text-sm font-medium">
          <li>
            <Link 
              to="/" 
              className="hover:text-blue-400 transition duration-200"
            >
              List
            </Link>
          </li>

          <li>
            <Link 
              to="/add" 
              className="bg-blue-500 hover:bg-blue-600 px-4 py-1.5 rounded-md transition duration-200"
            >
              Add Task
            </Link>
          </li>
        </ul>

      </div>
    </section>
  )
}

export default Navbar