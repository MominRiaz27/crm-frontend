import React, { useState } from 'react'

export default function AddClientForm({onSave, onDone}){
  const [name,setName] = useState('')
  const [phone,setPhone] = useState('')
  const [email,setEmail] = useState('')
  const [company,setCompany] = useState('')
  const [followUpDate,setFollowUpDate] = useState('')
  const [remarks,setRemarks] = useState('')

  // function computeFollowDate(days){
  //   if (!days) return null
  //   const t = new Date()
  //   t.setDate(t.getDate() + Number(days))
  //   return t.toISOString()
  // }

  function handleSave(){
    const client = {
      name, phone, email, company, status:'open',
      interactions: [{
        remarks: remarks,
        followUpDate: followUpDate
      }]
    }
    onSave(client)
  }

  function handleDone(){
    const client = {
      name, phone, email, company, status:'closed',
      interactions: [{
        remarks: remarks || 'Closed ',
        followUpDate: null
        
      }]
    }
    onDone(client)
  }

return (
  <div className='card'>
    <div className='form-row'>
      <label>Name</label>
      <input
        type='text'
        className='input'
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
    </div>

    <div className='form-row'>
      <label>Phone</label>
      <input
        type='tel'
        pattern='[0-9]{7,15}' // allows 7–15 digits
        className='input'
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
      />
    </div>

    <div className='form-row'>
      <label>Email</label>
      <input
        type='email'
        className='input'
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
    </div>

    <div className='form-row'>
      <label>Company (optional)</label>
      <input
        type='text'
        className='input'
        value={company}
        onChange={e => setCompany(e.target.value)}
      />
    </div>

  <div className='form-row'>
  <label>Follow-up Date</label>
  <input
    type='date'
    className='input'
    value={followUpDate}
    onChange={e => setFollowUpDate(e.target.value)}
    required
  />
</div>

    <div className='form-row'>
      <label>Remarks</label>
      <textarea
        className='input'
        rows={3}
        value={remarks}
        onChange={e => setRemarks(e.target.value)}
        placeholder="Enter detailed remarks with text, numbers, commas, or special characters"
      />
    </div>

    <div style={{ marginTop: 8 }}>
      <button className='btn' onClick={handleSave}>Save</button>
      <button style={{ marginLeft: 8 }} className='back-btn' onClick={handleDone}>Mark as Done</button>
    </div>
  </div>
);

}
