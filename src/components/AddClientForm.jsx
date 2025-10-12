import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'; // ✅ import navigation hook
import './design.css';


const BASE_URL = import.meta.env.VITE_BASE_URL ;


export default function AddClientForm({ onSave, onDone }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [company, setCompany] = useState('')
  const [followUpDate, setFollowUpDate] = useState('')
  const [remarks, setRemarks] = useState('')
  const [attachments, setAttachments] = useState([])

  const nav = useNavigate(); // ✅ create navigation instance


  // handle file selection
  const handleFileChange = (e) => {
    setAttachments([...e.target.files])
  }

  // upload files to backend first
  async function uploadFiles() {
    if (attachments.length === 0) return []
    const formData = new FormData()
    attachments.forEach(file => formData.append('attachments', file))
    
    const res = await fetch(`${BASE_URL}/upload`, {  // adjust backend URL if needed
      method: 'POST',
      body: formData
    })
    console.log("res ", res)
    
    const data = await res.json()
    console.log("data ", data)
    console.log("data.paths ", data.paths)
    return data.paths || []
  }

  async function handleSave() {
    const uploadedFiles = await uploadFiles()

    const client = {
      name,
      phone,
      email,
      address,
      company,
      status: 'open',
      interactions: [{
        remarks: remarks,
        followUpDate: followUpDate,
        attachments: uploadedFiles
      }]
    }

    onSave(client)
  }

  async function handleDone() {
    const uploadedFiles = await uploadFiles()

    const client = {
      name,
      phone,
      email,
      address,
      company,
      status: 'closed',
      interactions: [{
        remarks: remarks || 'Closed',
        followUpDate: null,
        attachments: uploadedFiles
      }]
    }

    onDone(client)
  }

  return (
    <div className='card'>
      <button className='back-btn' onClick={() => nav(-1)}>← Back</button>

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
          pattern='[0-9]{7,15}'
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
        <label>Address</label>
        <input
          type='address'
          className='input'
          value={address}
          onChange={e => setAddress(e.target.value)}
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
          placeholder="Enter detailed remarks"
        />
      </div>

      <div className='form-row'>
        <label>Attachments</label>
        <input
          type='file'
          multiple
          className='input'
          onChange={handleFileChange}
        />
        {attachments.length > 0 && (
          <ul style={{ fontSize: '0.9em', color: '#555' }}>
            {attachments.map((file, i) => <li key={i}>{file.name}</li>)}
          </ul>
        )}
      </div>

      <div style={{ marginTop: 8 }}>
        <button className='btn' onClick={handleSave}>Save</button>
        <button style={{ marginLeft: 8 }} className='back-btn' onClick={handleDone}>Mark as Done</button>
      </div>
    </div>
  )
}
