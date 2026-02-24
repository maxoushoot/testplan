import { SaturationResponse, Work } from './types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

async function parseJsonOrThrow<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function getWorks(): Promise<Work[]> {
  const res = await fetch(`${API_URL}/works`);
  return parseJsonOrThrow<Work[]>(res);
}

export async function updateWork(id: string, payload: Partial<Work> & { version: number }) {
  const res = await fetch(`${API_URL}/works/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  return parseJsonOrThrow<Work>(res);
}

export async function getSaturation(date: string): Promise<SaturationResponse[]> {
  const res = await fetch(`${API_URL}/saturation?date=${encodeURIComponent(date)}`);
  return parseJsonOrThrow<SaturationResponse[]>(res);
}
