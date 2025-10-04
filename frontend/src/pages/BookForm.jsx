import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import api from '../api/client.js';

function BookFormInner() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [form, setForm] = useState({ title: '', author: '', description: '', genre: '', year: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit) {
      api.get(`/books/${id}`).then(({ data }) => {
        const { book } = data;
        setForm({
          title: book.title,
          author: book.author,
          description: book.description || '',
          genre: book.genre,
          year: String(book.year),
        });
      });
    }
  }, [isEdit, id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      const payload = { ...form, year: Number(form.year) };
      if (isEdit) await api.put(`/books/${id}`, payload);
      else await api.post('/books', payload);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Save failed');
    }
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className=" hover:text-red-600 mb-4 text-3xl font-semibold tracking-tight">{isEdit ? 'Edit' : 'Add'} Book</h1>
      {error && <p className="mb-2 text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 card p-6">
        <div>
          <label className="label">Title</label>
          <input className="input mt-1" placeholder="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} required />
        </div>
        <div>
          <label className="label">Author</label>
          <input className="input mt-1" placeholder="Author" value={form.author} onChange={(e)=>setForm({...form,author:e.target.value})} required />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Genre</label>
            <input className="input mt-1" placeholder="Genre" value={form.genre} onChange={(e)=>setForm({...form,genre:e.target.value})} required />
          </div>
          <div>
            <label className="label">Published Year</label>
            <input className="input mt-1" placeholder="Year" type="number" value={form.year} onChange={(e)=>setForm({...form,year:e.target.value})} required />
          </div>
        </div>
        <div>
          <label className="label">Description</label>
          <textarea className="input mt-1 h-32" placeholder="Description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />
        </div>
        <button className="btn-primary w-full bg-blue-600 rounded-2xl py-2 text-white hover:bg-blue-500 font-bold">Save</button>
      </form>
    </div>
  );
}

export default function BookForm() {
  return (
    <ProtectedRoute>
      <BookFormInner />
    </ProtectedRoute>
  );
}


