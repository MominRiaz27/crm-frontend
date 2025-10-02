import React, { useEffect, useState } from 'react'
import { fetchClientById, updateClient, markClientDone } from '../api/clients'
import ClientProfile from '../components/ClientProfile'
import { useNavigate, useParams } from 'react-router-dom'

export default function ClientProfilePage(){
  const { id } = useParams()
  const nav = useNavigate()
  const [client, setClient] = useState(null)

  useEffect(()=> {
    fetchClientById(id).then(setClient)
  },[id])

  async function onSave(updated){
    try {
      await updateClient(id, updated);
      alert("Client updated!");
      nav(-1);
    } catch (err) {
      console.error(err);
      alert("Error updating client");
    }
  }

  function onMarkDone(c){
    markClientDone(c.id).then(()=>{
      alert("Client marked as done!");
      nav('/clients');
    }).catch(err=>{
      console.error(err);
      alert("Error marking client as done");
    });
  }

  if (!client) return <div className='card'>Loading...</div>

  return <ClientProfile initialClient={client} onBack={()=> nav(-1)} onSave={onSave} onMarkDone={onMarkDone} />
}
