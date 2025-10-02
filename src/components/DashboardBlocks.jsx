import React from 'react'
import { Link } from 'react-router-dom'

export default function DashboardBlocks({remindersCount=0, total=0}){
  return (
    <div className='blocks'>
      <Link to='/reminders' className='card'>
        <h3>Reminder clients</h3>
        <div style={{fontSize:24,fontWeight:600}}>{remindersCount}</div>
        <div className='small'>Clients to contact today</div>
      </Link>
      <Link to='/clients' className='card'>
        <h3>Total clients</h3>
        <div style={{fontSize:24,fontWeight:600}}>{total}</div>
        <div className='small'>All saved clients</div>
      </Link>
      <Link to='/add' className='card'>
        <h3>Add client</h3>
        <div style={{fontSize:18}}>Create new client</div>
      </Link>
      <Link to='/search' className='card'>
        <h3>Search client</h3>
        <div style={{fontSize:18}}>Find by name, email, or phone</div>
      </Link>
    </div>
  )
}
