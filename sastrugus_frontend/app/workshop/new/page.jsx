'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PageHeader from '@/app/_components/PageHeader';

export default function WorkshopFormPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const documentId = params?.documentId;
  const isEdit = !!documentId;
  const loadDraft = searchParams?.get('draft') === 'true';

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    materialRequirement: '',
    steps: '',
    Decimal: '',
    isPremium: false,
    workshop_category: '',
    video: '',
    publishNow: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/proxy/workshop-categories');
        if (res.ok) {
          const data = await res.json();
          setCategories(data.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    async function fetchWorkshop() {
      try {
        const qs = loadDraft ? '?populate=workshop_category&status=draft' : '?populate=workshop_category';
        const res = await fetch(`/api/proxy/workshops/${documentId}${qs}`);
        if (res.ok) {
          const data = await res.json();
          const w = data.data;
          setFormData({
            title: w.title || '',
            description: w.description || '',
            materialRequirement: w.materialRequirement || '',
            steps: w.steps || '',
            Decimal: w.Decimal || '',
            isPremium: w.isPremium || false,
            workshop_category: w.workshop_category?.id || '',
            video: w.video || '',
            publishNow: !!w.publishedAt,
          });
        }
      } catch (err) {
        setError('Nem sikerült betölteni a blueprintet');
      } finally {
        setInitialLoading(false);
      }
    }
    fetchWorkshop();
  }, [isEdit, documentId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'isPremium') {
      setFormData({
        ...formData,
        isPremium: checked,
        Decimal: checked ? formData.Decimal : '',
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.title.length < 20 || formData.title.length > 200) {
      setError('A cím 20-200 karakter között legyen!');
      return;
    }
    if (!formData.description.trim()) {
      setError('A leírás megadása kötelező!');
      return;
    }
    if (!formData.steps.trim()) {
      setError('A lépések megadása kötelező!');
      return;
    }
    if (!formData.workshop_category) {
      setError('A kategória megadása kötelező!');
      return;
    }
    if (formData.video) {
      const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})$/;
      if (!youtubeRegex.test(formData.video)) {
        setError('Érvénytelen YouTube URL!');
        return;
      }
    }

    setLoading(true);

    try {
      const payload = {
        data: {
          title: formData.title,
          description: formData.description,
          materialRequirement: formData.materialRequirement || null,
          steps: formData.steps,
          Decimal: formData.Decimal ? parseInt(formData.Decimal, 10) : 0,
          isPremium: formData.isPremium,
          workshop_category: formData.workshop_category ? parseInt(formData.workshop_category, 10) : null,
          video: formData.video || null,
        },
      };

      let url = isEdit ? `/api/proxy/workshops/${documentId}` : '/api/proxy/workshops';
      if(!formData.publishNow) {
        url += '?status=draft';
      }
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || 'Hiba történt a mentés során');
      }

      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas-50">
      <PageHeader
        title={isEdit ? 'Blueprint szerkesztése' : 'Új blueprint beküldése'}
      />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {initialLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="bg-white p-8 rounded-2xl shadow-soft flex flex-col gap-4">
            {error && <div className="bg-red-100 text-red-700 p-2 rounded">{error}</div>}

        <div>
          <input
            type="text"
            name="title"
            placeholder="Cím (20-200 karakter) *"
            className="border p-2 rounded text-black w-full"
            value={formData.title}
            onChange={handleChange}
            minLength={20}
            maxLength={200}
            required
          />
        </div>

        <div>
          <textarea
            name="description"
            placeholder="Leírás *"
            className="border p-2 rounded text-black min-h-[100px] w-full"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <textarea
            name="materialRequirement"
            placeholder="Szükséges anyagok"
            className="border p-2 rounded text-black min-h-[80px] w-full"
            value={formData.materialRequirement}
            onChange={handleChange}
          />
        </div>

        <div>
          <textarea
            name="steps"
            placeholder="Lépések *"
            className="border p-2 rounded text-black min-h-[120px] w-full"
            value={formData.steps}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <select
            name="workshop_category"
            className="border p-2 rounded text-black w-full"
            value={formData.workshop_category}
            onChange={handleChange}
            required
          >
            <option value="">Kategória *</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="text"
            name="video"
            placeholder="YouTube videó URL"
            className="border p-2 rounded text-black w-full"
            value={formData.video}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-black">
            <input
              type="checkbox"
              name="isPremium"
              checked={formData.isPremium}
              onChange={handleChange}
              className="w-4 h-4"
            />
            Prémium tartalom
          </label>

          <input
            type="number"
            name="Decimal"
            placeholder="Ár (Ft)"
            className="border p-2 rounded text-black w-32 disabled:bg-gray-100 disabled:text-gray-400"
            value={formData.Decimal}
            onChange={handleChange}
            min={0}
            disabled={!formData.isPremium}
          />
        </div>

        <label className="flex items-center gap-2 text-black">
          <input
            type="checkbox"
            name="publishNow"
            checked={formData.publishNow}
            onChange={handleChange}
            className="w-4 h-4"
          />
          Publikálás (ha nincs bejelölve, piszkozatként mentjük)
        </label>

        <p className="text-sm text-gray-500">* Kötelező mezők</p>

        <button
          type="submit"
          disabled={loading || initialLoading}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading ? 'Mentés...' : isEdit ? 'Mentés' : 'Blueprint beküldése'}
        </button>

            <div className="text-center text-sm text-gray-600">
              <Link href="/dashboard" className="text-blue-600 hover:underline">
                Vissza a dashboardra
              </Link>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
