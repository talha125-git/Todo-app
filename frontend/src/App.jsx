import { useState } from 'react'
import './App.css'
import Navbar from './componants/Navbar'
import { Route, Routes } from 'react-router-dom'
import AddTask from './componants/AddTask'

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<h1>Task List</h1>} />
      <Route path='/add' element={<AddTask/>} />
    </Routes>
    </>
  )
}

export default App
