import React, { useEffect, useState } from 'react'
import { fetchClients } from '../api/clients'
import ClientList from '../components/ClientList'
import { useNavigate } from 'react-router-dom'

export default function Clients(){
  const [clients, setClients] = useState([])
  const nav = useNavigate()

  useEffect(()=> {
    fetchClients().then(setClients)
  },[])

  return (
    <div>
      <h2>All clients</h2>
      <ClientList items={clients} onItemClick={(it)=> nav('/clients/'+it.id)} />
    </div>
  )
}
