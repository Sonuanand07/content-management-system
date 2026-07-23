'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function PublicIndex() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublishedPages = async () => {
      try {
        const response = await axios.get(`${API_URL}/pages?published=true`);
        setPages(response.data.pages);
      } catch (error) {
        console.error('Failed to fetch pages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishedPages();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">CMS Public Site</h1>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold mb-8">Published Content</h2>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : pages.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No published pages yet</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pages.map((page) => (
              <Link key={page._id} href={`/page/${page.slug}`}>
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <h3 className="text-xl font-bold mb-2">{page.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{page.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>By {page.author?.name}</span>
                    <span>{page.metadata?.views || 0} views</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
