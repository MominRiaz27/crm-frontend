import React from 'react'
import AddClientForm from '../components/AddClientForm'
import { useNavigate } from 'react-router-dom'
import { saveClient } from '../api/clients'

export default function AddClient(){
  const nav = useNavigate()

  async function onSave(client){
    try {
      await saveClient(client);
      alert('Client saved successfully!');
      nav('/clients');
    } catch (err) {
      console.error(err);
      alert('Error saving client');
    }
  }

  async function onDone(client){
    try {
      // You can also call saveClient here with status:'closed'
      await saveClient(client);
      alert('Client marked as done!');
      nav('/clients');
    } catch (err) {
      console.error(err);
      alert('Error marking client as done');
    }
  }

  return (
    <div>
      <h2>Add client</h2>
      <AddClientForm onSave={onSave} onDone={onDone} />
    </div>
  )
}
