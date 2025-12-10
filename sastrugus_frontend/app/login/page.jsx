'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err){
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96 flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-4 text-black">Bejelentkezés</h1>
        
        {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}
        
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Belépés
        </button>

        <div className="text-center text-sm text-gray-600">
          Nincs még fiókod?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Regisztráció
          </Link>
        </div>
      </form>
    </div>
  );
}