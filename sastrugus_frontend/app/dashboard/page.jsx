'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import PageHeader from '@/app/_components/PageHeader';
import SectionHeader from '@/app/_components/SectionHeader';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth();
  const [workshops, setWorkshops] = useState([]);
  const [purchased, setPurchased] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPurchased, setLoadingPurchased] = useState(true);

  const userFullName = user ? `${user.FirstName || ''} ${user.LastName || ''}`.trim() || user.username : '';

  useEffect(() => {
    async function fetchMyWorkshops() {
      if (!user?.id) return;

      try {
        const res = await fetch('/api/proxy/workshops/me');
        if (res.ok) {
          const data = await res.json();
          setWorkshops(data.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch workshops:', err);
      } finally {
        setLoading(false);
      }
    }

    async function fetchPurchased() {
      if (!user?.id) return;

      try {
        const res = await fetch('/api/proxy/workshops/me/purchased');
        if (res.ok) {
          const data = await res.json();
          setPurchased(data.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch purchased:', err);
      } finally {
        setLoadingPurchased(false);
      }
    }

    fetchMyWorkshops();
    fetchPurchased();
  }, [user]);

  const getStatusBadge = (workshop) => {
    if (workshop.publishedAt) {
      return <span className="px-3 py-1 text-xs font-medium rounded-full bg-pastel-mint text-pastel-mintText">Publikált</span>;
    }
    return <span className="px-3 py-1 text-xs font-medium rounded-full bg-pastel-orange text-pastel-orangeText">Piszkozat</span>;
  };

  return (
    <div className="min-h-screen bg-canvas-50">
      <PageHeader
        title={`Hello, ${userFullName}!`}
        subtitle="Üdvözlünk a Sastrugus közösségben."
      />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <SectionHeader title="Blueprintjeim">
          <Link
            href="/workshop/new"
            className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Új blueprint beküldése
          </Link>
        </SectionHeader>
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : workshops.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-soft">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-xl font-semibold text-canvas-900 mb-2">Még nincs blueprinted</h2>
            <p className="text-canvas-900/60 mb-6">Készítsd el az első blueprintedet és oszd meg másokkal!</p>
            <Link
              href="/workshop/new"
              className="inline-flex items-center gap-2 bg-brand-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-700 transition-colors"
            >
              Új blueprint létrehozása
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
  
            <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-canvas-100 border-b border-canvas-200 text-sm font-semibold text-canvas-900/70">
              <div className="col-span-5">Cím</div>
              <div className="col-span-3">Kategória</div>
              <div className="col-span-2">Státusz</div>
              <div className="col-span-2 text-right">Műveletek</div>
            </div>

            <div className="divide-y divide-canvas-200">
              {workshops.map((workshop) => (
                <div
                  key={workshop.documentId}
                  className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 hover:bg-canvas-50 transition-colors"
                >
                  <div className="md:col-span-5">
                    <span className="font-semibold text-canvas-900 truncate block">{workshop.title}</span>
                    <p className="text-sm text-canvas-900/50 md:hidden mt-1">
                      {workshop.workshop_category?.categoryName || 'Nincs kategória'}
                    </p>
                  </div>

                  <div className="hidden md:flex md:col-span-3 items-center text-canvas-900/70">
                    {workshop.workshop_category?.categoryName || 'Nincs kategória'}
                  </div>

                  <div className="md:col-span-2 flex items-center">
                    {getStatusBadge(workshop)}
                  </div>

                  <div className="md:col-span-2 flex items-center justify-end gap-2">
                    <Link
                      href={`/workshop/blueprint/${workshop.slug ? `${workshop.slug}---${workshop.documentId}` : workshop.documentId}`}
                      className="p-2 text-canvas-900/50 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                      title="Megtekintés"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </Link>
                    <Link
                      href={`/workshop/edit/${workshop.documentId}${workshop.publishedAt ? '' : '?draft=true'}`}
                      className="p-2 text-canvas-900/50 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                      title="Szerkesztés"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <SectionHeader title="Megvásárolt prémium blueprintek" />
          {loadingPurchased ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : purchased.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-soft">
              <div className="text-5xl mb-4">🛒</div>
              <p className="text-canvas-900/60">Még nem vásároltál prémium blueprintet.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
              <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-canvas-100 border-b border-canvas-200 text-sm font-semibold text-canvas-900/70">
                <div className="col-span-8">Cím</div>
                <div className="col-span-4 text-right">Műveletek</div>
              </div>

              <div className="divide-y divide-canvas-200">
                {purchased.map((workshop) => (
                  <div
                    key={workshop.documentId}
                    className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 hover:bg-canvas-50 transition-colors"
                  >
                    <div className="md:col-span-8">
                      <span className="font-semibold text-canvas-900 truncate block">{workshop.title}</span>
                    </div>

                    <div className="md:col-span-4 flex items-center justify-end">
                      <Link
                        href={`/workshop/blueprint/${workshop.slug}`}
                        className="p-2 text-canvas-900/50 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                        title="Megtekintés"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
