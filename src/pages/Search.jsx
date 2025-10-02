import React, { useState } from 'react'
import { searchClients } from '../api/clients'
import ClientList from '../components/ClientList'
import { useNavigate } from 'react-router-dom'

export default function Search() {
  const [results, setResults] = useState([])

  // Separate states for 3 fields
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const nav = useNavigate()

  async function handleSearch() {
    // check if all are empty
    if (!name.trim() && !phone.trim() && !email.trim()) {
      alert("Please enter at least one field (name, phone, or email)");
      return;
    }

    try {
      const data = await searchClients({ name, phone, email })
      setResults(data)
    } catch (err) {
      console.error(err)
      alert("Error searching clients")
    }
  }

  return (
    <div>
      <h2>Search Clients</h2>
      <div className='card'>
        <input
          className='input'
          placeholder='Enter name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className='input'
          placeholder='Enter phone'
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        <input
          className='input'
          placeholder='Enter email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button 
          className='btn' 
          onClick={handleSearch} 
          style={{ marginTop: 8 }}
        >
          Search
        </button>
      </div>

      <div style={{ marginTop: 12 }}>
        <ClientList items={results} onItemClick={(it) => nav('/clients/' + it.id)} />
      </div>
    </div>
  )
}
