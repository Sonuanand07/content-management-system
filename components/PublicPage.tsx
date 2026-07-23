'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function PublicPage({ slug }: { slug: string }) {
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await axios.get(`${API_URL}/pages/slug/${slug}`);
        setPage(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Page not found');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/" className="text-blue-600 hover:underline">
            Home
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
        {page.description && <p className="text-gray-600 text-lg mb-8">{page.description}</p>}

        <div className="prose prose-sm max-w-none space-y-6">
          {page.blocks.map((block: any) => (
            <div key={block.id}>
              {block.type === 'heading' && (
                <h2
                  className={`font-bold mb-4 ${
                    block.level === 1 ? 'text-3xl' : block.level === 2 ? 'text-2xl' : 'text-xl'
                  }`}
                >
                  {block.content.text}
                </h2>
              )}
              {block.type === 'paragraph' && <p className="text-gray-800 leading-relaxed">{block.content.text}</p>}
              {block.type === 'list' && (
                <ul className="list-disc list-inside space-y-2">
                  {(block.content.items || []).map((item: string, i: number) => (
                    <li key={i} className="text-gray-800">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {block.type === 'table' && (
                <div className="overflow-x-auto">
                  <table className="border-collapse border border-gray-300 w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        {(block.content.headers || []).map((header: string, i: number) => (
                          <th key={i} className="border border-gray-300 p-3 text-left">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(block.content.rows || []).map((row: string[], i: number) => (
                        <tr key={i}>
                          {row.map((cell: string, j: number) => (
                            <td key={j} className="border border-gray-300 p-3">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {block.type === 'equation' && (
                <div className="bg-gray-50 p-4 rounded-lg text-center font-mono">
                  {block.content.latex}
                </div>
              )}
            </div>
          ))}
        </div>

        {page.author && (
          <div className="mt-12 pt-6 border-t">
            <p className="text-sm text-gray-600">
              By <strong>{page.author.name}</strong> · Published on{' '}
              {new Date(page.publishedAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
