'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getPagesAsync, deletePageAsync, logout } from '@/lib/store';
import { RootState, AppDispatch } from '@/lib/store';
import PageEditor from './PageEditor';

export default function AdminDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const { items: pages, loading } = useSelector((state: RootState) => state.pages);
  const [showEditor, setShowEditor] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/');
      return;
    }
    dispatch(getPagesAsync());
  }, [user, dispatch, router]);

  const handleNewPage = () => {
    setSelectedPage(null);
    setShowEditor(true);
  };

  const handleEditPage = (page: any) => {
    setSelectedPage(page);
    setShowEditor(true);
  };

  const handleDeletePage = async (id: string) => {
    if (confirm('Are you sure?')) {
      await dispatch(deletePageAsync(id));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  if (showEditor) {
    return <PageEditor page={selectedPage} onClose={() => setShowEditor(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">CMS Admin</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Pages</h2>
          <button
            onClick={handleNewPage}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            New Page
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Slug</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Published</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Author</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page: any) => (
                  <tr key={page._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{page.title}</td>
                    <td className="px-6 py-4 text-gray-600">{page.slug}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium ${
                          page.published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {page.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{page.author?.name}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => handleEditPage(page)}
                        className="text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePage(page._id)}
                        className="text-red-600 hover:text-red-700 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {pages.length === 0 && (
              <div className="text-center py-8 text-gray-500">No pages found</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
