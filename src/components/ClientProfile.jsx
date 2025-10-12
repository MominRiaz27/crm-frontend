import React, { useState, useEffect } from 'react'
import './design.css'

export default function ClientProfile({ initialClient, onBack, onSave, onMarkDone }) {
  const BASE_URL = import.meta.env.VITE_BASE_URL
  const [client, setClient] = useState(initialClient)
  const [editMode, setEditMode] = useState(false)
  const [snapshot, setSnapshot] = useState(initialClient)
  const [newFiles, setNewFiles] = useState([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    setClient(initialClient)
    setSnapshot(initialClient)
  }, [initialClient])

  function enterEdit() {
    setSnapshot(client)
    setEditMode(true)
  }

  function cancelEdit() {
    setClient(snapshot)
    setEditMode(false)
    setNewFiles([])
  }

  async function handleSave() {
    const normalizedStatus =
      client.status === 'done' || client.status === 'closed'
        ? 'open'
        : client.status || 'open'

    let updatedAttachments = client.attachments || []

    if (newFiles.length > 0) {
      setUploading(true)
      const formData = new FormData()
      newFiles.forEach(f => formData.append('attachments', f))

      const res = await fetch(`${BASE_URL}/upload`, {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      setUploading(false)

      if (data.success && data.paths) {
        updatedAttachments = [...updatedAttachments, ...data.paths]
      }
    }

    const toSave = { ...client, status: normalizedStatus, attachments: updatedAttachments }

    await onSave(toSave)
    setClient(toSave)
    setEditMode(false)
    setNewFiles([])
  }

  async function handleMarkDone() {
    await onMarkDone(client)
  }

  function renderDate(d) {
    if (!d) return '—'
    try {
      const dt = new Date(d)
      if (isNaN(dt)) return d
      return dt.toLocaleDateString()
    } catch {
      return d
    }
  }

  function handleRemoveAttachment(index) {
    let attachments = []
    try {
      attachments = typeof client.attachments === 'string'
        ? JSON.parse(client.attachments)
        : client.attachments
    } catch {
      attachments = []
    }
    const updated = attachments.filter((_, i) => i !== index)
    setClient({ ...client, attachments: updated })
  }

  function renderAttachmentsEditable() {
    if (!client.attachments) return null

    let attachments = []
    try {
      attachments = typeof client.attachments === 'string'
        ? JSON.parse(client.attachments)
        : client.attachments
    } catch {
      attachments = []
    }

    if (!attachments.length) return null

    return (
      <div className="card">
        <h4>Existing Attachments</h4>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {attachments.map((url, idx) => (
            <li key={idx} style={{ marginBottom: 6 }}>
              <a
                href={`${BASE_URL}${url}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#007bff', textDecoration: 'underline', marginRight: 8 }}
              >
                {url.split('/').pop()}
              </a>
              <button
                className="back-btn"
                onClick={() => handleRemoveAttachment(idx)}
                style={{ padding: '2px 6px', fontSize: 12 }}
              >
                ❌ Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  function renderNewFileUpload() {
    return (
      <div className="form-row">
        <label>Add New Attachments</label>
        <input
          type="file"
          multiple
          onChange={e => setNewFiles(Array.from(e.target.files))}
        />
        {newFiles.length > 0 && (
          <div style={{ marginTop: 4, fontSize: 13, color: '#666' }}>
            {newFiles.length} file(s) selected
          </div>
        )}
      </div>
    )
  }

  function renderAttachments() {
    if (!client.attachments) return null

    let attachments = []
    try {
      attachments = typeof client.attachments === 'string'
        ? JSON.parse(client.attachments)
        : client.attachments
    } catch {
      attachments = []
    }

    if (!attachments.length) return null

    return (
      <div className="card">
        <h4>Attachments</h4>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          {attachments.map((url, idx) => (
            <li key={idx} style={{ marginBottom: 6 }}>
              <a
                href={`${BASE_URL}${url}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#007bff', textDecoration: 'underline' }}
              >
                {url.split('/').pop()}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="client-profile">
      <button className="back-btn" onClick={onBack}>← Back</button>
      <h2>{client?.name || 'No name'}</h2>

      {editMode ? (
        <div>
          {/* Editable fields */}
          <div className="form-row">
            <label>Name</label>
            <input className="input" value={client.name || ''} onChange={e => setClient({ ...client, name: e.target.value })} />
          </div>

          <div className="form-row">
            <label>Email</label>
            <input className="input" type="email" value={client.email || ''} onChange={e => setClient({ ...client, email: e.target.value })} />
          </div>

          <div className="form-row">
            <label>Phone</label>
            <input className="input" value={client.phone || ''} onChange={e => setClient({ ...client, phone: e.target.value })} />
          </div>

          <div className="form-row">
            <label>Address</label>
            <input className="input" value={client.address || ''} onChange={e => setClient({ ...client, address: e.target.value })} />
          </div>

          <div className="form-row">
            <label>Company</label>
            <input className="input" value={client.company || ''} onChange={e => setClient({ ...client, company: e.target.value })} />
          </div>

          <div className="form-row">
            <label>Follow-up Date</label>
            <input className="input" type="date" value={client.followUpDate || ''} onChange={e => setClient({ ...client, followUpDate: e.target.value })} />
          </div>

          <div className="form-row">
            <label>Remarks</label>
            <textarea className="input" rows={4} value={client.remarks || ''} onChange={e => setClient({ ...client, remarks: e.target.value })} />
          </div>

          {renderAttachmentsEditable()}
          {renderNewFileUpload()}

          <div>
            <button className="btn" onClick={handleSave} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Save'}
            </button>
            <button className="back-btn" onClick={cancelEdit}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <div className="detail-row"><strong>Email:</strong> {client.email || '—'}</div>
          <div className="detail-row"><strong>Phone:</strong> {client.phone || '—'}</div>
          <div className="detail-row"><strong>Address:</strong> {client.address || '—'}</div>
          <div className="detail-row"><strong>Company:</strong> {client.company || '—'}</div>
          <div className="detail-row"><strong>Follow-up:</strong> {renderDate(client.followUpDate)}</div>
          <div className="detail-row"><strong>Status:</strong> {client.status || 'open'}</div>

          {client.remarks && (
            <div className="card">
              <h4>Remarks</h4>
              <div style={{ whiteSpace: 'pre-wrap' }}>{client.remarks}</div>
            </div>
          )}

          {renderAttachments()}

          <div>
            <button className="btn" onClick={enterEdit}>Edit</button>
            {!(client.status === 'done' || client.status === 'closed') && (
              <button className="btn" onClick={handleMarkDone}>Mark as Done</button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
