import React from 'react'
import { useNavigate } from 'react-router-dom'
import './design.css';


export default function ClientList({ items = [], onItemClick }) {
  const nav = useNavigate()

  return (
    <div className='card list'>
      {/* ✅ Back Button (always visible) */}
      <button className='back-btn' onClick={() => nav(-1)}>
        ← Back
      </button>

      {/* ✅ Client List or Empty Message */}
      {items.length === 0 ? (
        <div>No clients found</div>
      ) : (
        items.map(it => (
          <div
            key={it.id}
            className='list-item'
            onClick={() => onItemClick(it)}
          >
            <div style={{ fontWeight: 600 }}>
              {it.name} {it.status === 'closed' && '(Done)'}
            </div>
            <div className='small'>{it.email || it.phone}</div>
            {it.interaction && (
              <div className='small'>
                Follow-up: {new Date(it.interaction.follow_up_at).toLocaleString()}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}
