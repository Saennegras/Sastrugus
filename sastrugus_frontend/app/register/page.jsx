'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    FirstName: '',
    LastName: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation based on schema requirements
    if (formData.username.length < 3) {
      setError('A felhasználónév legalább 3 karakter legyen!');
      return;
    }
    if (formData.email.length < 6) {
      setError('Az email cím túl rövid!');
      return;
    }
    if (formData.password.length < 6) {
      setError('A jelszó legalább 6 karakter legyen!');
      return;
    }
    if (formData.password !== formData.passwordConfirm) {
      setError('A két jelszó nem egyezik!');
      return;
    }
    if (formData.FirstName.length < 5 || formData.FirstName.length > 50) {
      setError('A keresztnév 5-50 karakter között legyen!');
      return;
    }
    if (formData.LastName.length < 5 || formData.LastName.length > 50) {
      setError('A vezetéknév 5-50 karakter között legyen!');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          FirstName: formData.FirstName,
          LastName: formData.LastName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Regisztráció sikertelen');
      }

      // Redirect to dashboard on success
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96 flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-4 text-black">Regisztráció</h1>

        {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}

        <input
          type="text"
          name="LastName"
          placeholder="Vezetéknév"
          className="border p-2 rounded text-black"
          value={formData.LastName}
          onChange={handleChange}
          minLength={5}
          maxLength={50}
          required
        />
        <input
          type="text"
          name="FirstName"
          placeholder="Keresztnév"
          className="border p-2 rounded text-black"
          value={formData.FirstName}
          onChange={handleChange}
          minLength={5}
          maxLength={50}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Felhasználónév"
          className="border p-2 rounded text-black"
          value={formData.username}
          onChange={handleChange}
          minLength={3}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 rounded text-black"
          value={formData.email}
          onChange={handleChange}
          minLength={6}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Jelszó"
          className="border p-2 rounded text-black"
          value={formData.password}
          onChange={handleChange}
          minLength={6}
          required
        />
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Jelszó megerősítése"
          className="border p-2 rounded text-black"
          value={formData.passwordConfirm}
          onChange={handleChange}
          minLength={6}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading ? 'Regisztráció...' : 'Regisztráció'}
        </button>

        <div className="text-center text-sm text-gray-600">
          Már van fiókod?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Bejelentkezés
          </Link>
        </div>
      </form>
    </div>
  );
}
