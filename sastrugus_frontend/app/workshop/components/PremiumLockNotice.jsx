'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PremiumLockNotice({ isAuthenticated, workshopId }) {
  const [error, setError] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!redirectUrl) return;
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown((c) => {
        const next = c - 1;
        if (next <= 0) {
          clearInterval(timer);
          window.location.href = redirectUrl;
          return 0;
        }
        return next;
      });
    }, 800);
    return () => clearInterval(timer);
  }, [redirectUrl]);

  const handlePurchase = async () => {
    setError('');
    if (!workshopId) {
      setError('Hiányzik a workshop azonosító.');
      return;
    }
    try {
      const res = await fetch('/api/proxy/payment/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ workshopId }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error?.message || 'A fizetés indítása nem sikerült.');
      }

      if (data?.paymentUrl) {
        setRedirectUrl(data.paymentUrl);
      } else {
        setError('Nem érkezett fizetési hivatkozás.');
      }
    } catch (err) {
      setError(err.message || 'Hiba történt a fizetés indításakor.');
    }
  };

  return (
    <>
      {redirectUrl && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-soft p-8 max-w-md w-full text-center space-y-4">
            <p className="text-lg font-semibold text-canvas-900">Átirányítás a fizetéshez</p>
            <p className="text-canvas-900/70">Néhány pillanat múlva átirányítunk a fizetési oldalra.</p>
            <div className="text-2xl font-bold text-brand-700"> {countdown > 0 ? countdown : 0} </div>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-canvas-200 bg-white shadow-soft p-6 md:p-7 flex items-start gap-4">
        <div className="h-12 w-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-semibold text-lg">
          🔒
        </div>
        <div className="flex-1 space-y-2">
          <h3 className="text-lg font-semibold text-canvas-900">Prémium tartalom</h3>
          <p className="text-canvas-900/70">
            {isAuthenticated
              ? 'Szerezz hozzáférést a lépésekhez, videóhoz és anyaglistához.'
              : 'Jelentkezz be vagy vásárold meg a hozzáférést a teljes tartalomért.'}
          </p>
          {error && (
            <div className="bg-red-50 text-red-700 border border-red-200 rounded-lg px-3 py-2 text-sm">
              {error}
            </div>
          )}
          {isAuthenticated ? (
            <button
              type="button"
              onClick={handlePurchase}
              className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-4 py-2 rounded-xl hover:bg-brand-700 transition-colors"
            >
              Hozzáférés megvásárlása
            </button>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-4 py-2 rounded-xl hover:bg-brand-700 transition-colors"
            >
              Bejelentkezés
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
