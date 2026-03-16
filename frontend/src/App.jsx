import { useState } from 'react'
import './App.css'
import Navbar from './componants/Navbar'
import { Route, Routes } from 'react-router-dom'
import AddTask from './componants/AddTask'
import List from './componants/List'
import UpdateTask from './componants/UpdateTask'

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<List/>} />
      <Route path='/add' element={<AddTask/>} />
      <Route path='/update/:id' element={<UpdateTask/>} />
    </Routes>
    </>
  )
}

export default App
