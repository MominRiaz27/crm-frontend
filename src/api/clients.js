// src/api/clients.js

const BASE_URL = import.meta.env.VITE_BASE_URL ;

// Fetch all clients
export async function fetchClients() {
  const res = await fetch(`${BASE_URL}/reminders`);
  if (!res.ok) throw new Error("Failed to fetch clients");
  return res.json();
}

// Fetch client by ID
export async function fetchClientById(id) {
  const res = await fetch(`${BASE_URL}/reminders`);
  if (!res.ok) throw new Error("Failed to fetch clients");
  const all = await res.json();
  return all.find(c => String(c.id) === String(id));
}

// Save a new client
export async function saveClient(client) {
  const res = await fetch(`${BASE_URL}/reminders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: client.name,
      phone: client.phone,
      email: client.email,
      company: client.company,
      followUpDate: client.interactions?.[0]?.followUpDate || null,
      remarks: client.interactions?.[0]?.remarks || null,
      attachments: client.interactions?.[0]?.attachments || [], // ✅ FIXED LINE
      status: client.status || "open"
    }),
  });

  if (!res.ok) throw new Error("Failed to save client");
  return res.json();
}

// Update existing client
export async function updateClient(id, client) {
  const res = await fetch(`${BASE_URL}/reminders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(client),
  });

  if (!res.ok) throw new Error("Failed to update client");
  return res.json();
}

// Mark client as done
export async function markClientDone(id) {
  const res = await fetch(`${BASE_URL}/reminders/${id}/done`, {
    method: "PATCH"
  });
  if (!res.ok) throw new Error("Failed to mark client as done");
  return res.json();
}

// Fetch reminders due today
export async function fetchRemindersForToday() {
  const res = await fetch(`${BASE_URL}/reminders/today`);
  if (!res.ok) throw new Error("Failed to fetch reminders");
  return res.json();
}

// Search clients
export async function searchClients(query) {
  // Remove empty keys
  const filtered = Object.fromEntries(
    Object.entries(query).filter(([_, v]) => v && v.trim() !== "")
  );

  const params = new URLSearchParams(filtered);
  console.log("Query params:", params.toString());

  const res = await fetch(`${BASE_URL}/reminders/search?${params}`);
  if (!res.ok) throw new Error("Failed to search clients");
  return res.json();
}

