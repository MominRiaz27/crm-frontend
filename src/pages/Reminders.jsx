import React, { useEffect, useState } from 'react'
import { fetchRemindersForToday } from '../api/clients'
import ClientList from '../components/ClientList'
import { useNavigate } from 'react-router-dom'

export default function Reminders(){
  const [items, setItems] = useState([])
  const nav = useNavigate()
  useEffect(()=> {
    fetchRemindersForToday().then(setItems)
  },[])
  return (
    <div>
      <h2>Reminder clients (Today)</h2>
      <ClientList items={items} onItemClick={(it)=> nav('/clients/'+it.id)} />
    </div>
  )
}
