import React, { useState, useEffect } from 'react'

export default function ClientProfile({ initialClient, onBack, onSave, onMarkDone }){
  const [client, setClient] = useState(initialClient)
  const [editMode, setEditMode] = useState(false)
  // keep a snapshot for cancel
  const [snapshot, setSnapshot] = useState(initialClient)

  // Update local state when prop changes (e.g. after parent refetch)
  useEffect(() => {
    setClient(initialClient)
    setSnapshot(initialClient)
  }, [initialClient])

  function enterEdit(){
    setSnapshot(client)         // save current values for cancel
    setEditMode(true)
  }

  function cancelEdit(){
    setClient(snapshot)         // revert to snapshot
    setEditMode(false)
  }

  async function handleSave(){
    // If client was previously closed/done, editing + saving re-opens it
    const normalizedStatus = (client.status === 'done' || client.status === 'closed') ? 'open' : client.status || 'open'
    const toSave = { ...client, status: normalizedStatus }

    // call parent handler which should call the PUT API (update)
    await onSave(toSave)

    // update local UI
    setClient(toSave)
    setEditMode(false)
  }

  // Mark as done callback (just forward the client)
  async function handleMarkDone(){
    await onMarkDone(client)  // parent expected to call PATCH /reminders/:id/done
  }

  // helper render of date
  function renderDate(d){
    if (!d) return '—'
    try {
      // d is expected 'YYYY-MM-DD' — display nicely
      const dt = new Date(d)
      if (isNaN(dt)) return d
      return dt.toLocaleDateString()
    } catch (e) {
      return d
    }
  }

  return (
    <div>
      <button className='back-btn' onClick={onBack}>Back</button>

      <div style={{marginTop:12}} className='card'>
        <h2 style={{marginTop:0}}>{client?.name || 'No name'}</h2>

        {editMode ? (
          <div>
            <div className='form-row'>
              <label>Name</label>
              <input className='input' value={client.name||''} onChange={e=>setClient({...client,name:e.target.value})} />
            </div>

            <div className='form-row'>
              <label>Email</label>
              <input className='input' type='email' value={client.email||''} onChange={e=>setClient({...client,email:e.target.value})} />
            </div>

            <div className='form-row'>
              <label>Phone</label>
              <input className='input' value={client.phone||''} onChange={e=>setClient({...client,phone:e.target.value})} />
            </div>

            <div className='form-row'>
              <label>Company</label>
              <input className='input' value={client.company||''} onChange={e=>setClient({...client,company:e.target.value})} />
            </div>

            <div className='form-row'>
              <label>Follow-up Date</label>
              <input className='input' type='date' value={client.followUpDate || ''} onChange={e=>setClient({...client,followUpDate: e.target.value})} />
            </div>

            <div className='form-row'>
              <label>Remarks</label>
              <textarea className='input' rows={4} value={client.remarks||''} onChange={e=>setClient({...client,remarks:e.target.value})} />
            </div>

            <div style={{marginTop:8}}>
              <button className='btn' onClick={handleSave}>Save</button>
              <button style={{marginLeft:8}} className='back-btn' onClick={cancelEdit}>Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <div><strong>Email:</strong> {client.email || '—'}</div>
            <div><strong>Phone:</strong> {client.phone || '—'}</div>
            <div><strong>Company:</strong> {client.company || '—'}</div>
            <div><strong>Follow-up:</strong> {renderDate(client.followUpDate)}</div>
            <div style={{marginTop:8}}><strong>Status:</strong> {client.status || 'open'}</div>

            {client.remarks ? (
              <div style={{marginTop:12}} className='card'>
                <h4 style={{marginTop:0}}>Remarks</h4>
                <div style={{whiteSpace:'pre-wrap'}}>{client.remarks}</div>
              </div>
            ) : null}

            <div style={{marginTop:12}}>
              <button className='btn' onClick={enterEdit}>Edit</button>

              {/* Only show "Mark as Done" if not already done/closed */}
              {!(client.status === 'done' || client.status === 'closed') && (
                <button style={{marginLeft:8}} className='btn' onClick={handleMarkDone}>Mark as Done</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
