import { useState } from 'react'
import './App.css'
import Navbar from './componants/Navbar'
import { Route, Routes } from 'react-router-dom'
import AddTask from './componants/AddTask'
import List from './componants/List'
import UpdateTask from './componants/UpdateTask'
import SignUp from './componants/SignUp'
import Login from './componants/Login'

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<List/>} />
      <Route path='/add' element={<AddTask/>} />
      <Route path='/update/:id' element={<UpdateTask/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
    </>
  )
}

export default App
