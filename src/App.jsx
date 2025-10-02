import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddClient from './pages/AddClient'
import Search from './pages/Search'
import Clients from './pages/Clients'
import Reminders from './pages/Reminders'
import ClientProfilePage from './pages/ClientProfilePage'
import Navbar from './components/Navbar'

export default function App(){
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/add' element={<AddClient/>} />
          <Route path='/search' element={<Search/>} />
          <Route path='/clients' element={<Clients/>} />
          <Route path='/clients/:id' element={<ClientProfilePage/>} />
          <Route path='/reminders' element={<Reminders/>} />
        </Routes>
      </main>
    </div>
  )
}
