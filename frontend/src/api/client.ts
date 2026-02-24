import { SaturationResponse, Work } from './types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export async function getWorks(): Promise<Work[]> {
  const res = await fetch(`${API_URL}/works`);
  return res.json();
}

export async function updateWork(id: string, payload: Partial<Work> & { version: number }) {
  const res = await fetch(`${API_URL}/works/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    throw new Error(`Update failed: ${res.status}`);
  }

  return res.json();
}

export async function getSaturation(date: string): Promise<SaturationResponse[]> {
  const res = await fetch(`${API_URL}/saturation?date=${date}`);
  return res.json();
}
