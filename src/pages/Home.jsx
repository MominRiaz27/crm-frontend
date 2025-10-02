import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import DashboardBlocks from '../components/DashboardBlocks'
import { fetchClients, fetchRemindersForToday } from '../api/clients'

export default function Home(){
  const [clients, setClients] = useState([])
  const [reminders, setReminders] = useState([])

  useEffect(()=> {
    let mounted = true
    fetchClients().then(c=> { if (mounted) setClients(c) })
    fetchRemindersForToday().then(r=> { if (mounted) setReminders(r) })
    return ()=> mounted = false
  }, [])

  return (
    <Hero>
      <DashboardBlocks remindersCount={reminders.length} total={clients.length} />
    </Hero>
  )
}
