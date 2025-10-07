import React, { useState, useEffect } from 'react'

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

    // ✅ Upload new files if any
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

  // ✅ Remove existing attachment
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

  // ✅ Editable attachments list
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
      <div style={{ marginTop: 12 }} className="card">
        <h4 style={{ marginTop: 0 }}>Existing Attachments</h4>
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

  // ✅ File input for new uploads
  function renderNewFileUpload() {
    return (
      <div className="form-row" style={{ marginTop: 12 }}>
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

  // ✅ View-only attachments
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
      <div style={{ marginTop: 12 }} className="card">
        <h4 style={{ marginTop: 0 }}>Attachments</h4>
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
    <div>
      <button className="back-btn" onClick={onBack}>Back</button>

      <div style={{ marginTop: 12 }} className="card">
        <h2 style={{ marginTop: 0 }}>{client?.name || 'No name'}</h2>

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

            <div style={{ marginTop: 8 }}>
              <button className="btn" onClick={handleSave} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Save'}
              </button>
              <button style={{ marginLeft: 8 }} className="back-btn" onClick={cancelEdit}>Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <div><strong>Email:</strong> {client.email || '—'}</div>
            <div><strong>Phone:</strong> {client.phone || '—'}</div>
            <div><strong>Company:</strong> {client.company || '—'}</div>
            <div><strong>Follow-up:</strong> {renderDate(client.followUpDate)}</div>
            <div style={{ marginTop: 8 }}><strong>Status:</strong> {client.status || 'open'}</div>

            {client.remarks && (
              <div style={{ marginTop: 12 }} className="card">
                <h4 style={{ marginTop: 0 }}>Remarks</h4>
                <div style={{ whiteSpace: 'pre-wrap' }}>{client.remarks}</div>
              </div>
            )}

            {renderAttachments()}

            <div style={{ marginTop: 12 }}>
              <button className="btn" onClick={enterEdit}>Edit</button>
              {!(client.status === 'done' || client.status === 'closed') && (
                <button style={{ marginLeft: 8 }} className="btn" onClick={handleMarkDone}>Mark as Done</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
