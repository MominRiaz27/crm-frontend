import React from 'react'

export default function ClientList({items=[], onItemClick}){
  if (!items.length) return <div className='card'>No clients found</div>
  return (
    <div className='card list'>
      {items.map(it => (
        <div key={it.id} className='list-item' onClick={()=> onItemClick(it)}>
          <div style={{fontWeight:600}}>{it.name} {it.status==='closed' && '(Done)'}</div>
          <div className='small'>{it.email || it.phone}</div>
          {it.interaction && <div className='small'>Follow-up: {new Date(it.interaction.follow_up_at).toLocaleString()}</div>}
        </div>
      ))}
    </div>
  )
}
