const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export async function register(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data; // { token, userId }
}

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data; // { token, userId }
}

export function saveToken(token) {
  localStorage.setItem('osc_token', token);
}

export function getToken() {
  return localStorage.getItem('osc_token');
}

export function logout() {
  localStorage.removeItem('osc_token');
}