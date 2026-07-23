'use client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPageAsync, updatePageAsync } from '@/lib/store';
import { AppDispatch } from '@/lib/store';

export default function PageEditor({ page, onClose }: any) {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [published, setPublished] = useState(false);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (page) {
      setTitle(page.title);
      setSlug(page.slug);
      setDescription(page.description || '');
      setPublished(page.published);
      setBlocks(page.blocks || []);
    }
  }, [page]);

  const addBlock = (type: string) => {
    const newBlock = {
      id: Date.now().toString(),
      type,
      content: { text: '' },
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (id: string, content: any) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, content } : b)));
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter((b) => b.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const pageData = {
        title,
        slug,
        description,
        blocks,
        published,
      };

      if (page) {
        await dispatch(updatePageAsync({ id: page._id, ...pageData })).unwrap();
      } else {
        await dispatch(createPageAsync(pageData)).unwrap();
      }

      onClose();
    } catch (error) {
      console.error('Save failed:', error);
      alert('Failed to save page');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold">{page ? 'Edit Page' : 'New Page'}</h1>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title and Slug */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
              />
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Publish</span>
            </label>
          </div>

          {/* Content Blocks */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-4">Content Blocks</h3>

            {blocks.map((block) => (
              <div key={block.id} className="mb-4 p-4 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm uppercase text-gray-600">{block.type}</span>
                  <button
                    type="button"
                    onClick={() => removeBlock(block.id)}
                    className="text-red-600 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
                {block.type === 'heading' && (
                  <input
                    type="text"
                    value={block.content.text || ''}
                    onChange={(e) => updateBlock(block.id, { ...block.content, text: e.target.value })}
                    placeholder="Heading text"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
                {block.type === 'paragraph' && (
                  <textarea
                    value={block.content.text || ''}
                    onChange={(e) => updateBlock(block.id, { ...block.content, text: e.target.value })}
                    placeholder="Paragraph text"
                    rows={3}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
                {block.type === 'list' && (
                  <textarea
                    value={(block.content.items || []).join('\n')}
                    onChange={(e) => updateBlock(block.id, { ...block.content, items: e.target.value.split('\n') })}
                    placeholder="List items (one per line)"
                    rows={3}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
                {block.type === 'equation' && (
                  <input
                    type="text"
                    value={block.content.latex || ''}
                    onChange={(e) => updateBlock(block.id, { ...block.content, latex: e.target.value })}
                    placeholder="LaTeX equation"
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
                {block.type === 'table' && (
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs font-medium">Headers (comma separated)</label>
                      <input
                        type="text"
                        value={(block.content.headers || []).join(', ')}
                        onChange={(e) => updateBlock(block.id, { ...block.content, headers: e.target.value.split(',').map(h => h.trim()) })}
                        placeholder="Column 1, Column 2, Column 3"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium">Rows (one row per line, columns separated by |)</label>
                      <textarea
                        value={(block.content.rows || []).map(r => r.join(' | ')).join('\n')}
                        onChange={(e) => {
                          const rows = e.target.value.split('\n').map(row => 
                            row.split('|').map(cell => cell.trim())
                          ).filter(r => r.some(c => c));
                          updateBlock(block.id, { ...block.content, rows });
                        }}
                        placeholder="Data 1 | Data 2 | Data 3&#10;Data 4 | Data 5 | Data 6"
                        rows={3}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => addBlock('heading')}
                className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                + Heading
              </button>
              <button
                type="button"
                onClick={() => addBlock('paragraph')}
                className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                + Paragraph
              </button>
              <button
                type="button"
                onClick={() => addBlock('list')}
                className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                + List
              </button>
              <button
                type="button"
                onClick={() => addBlock('equation')}
                className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                + Equation
              </button>
              <button
                type="button"
                onClick={() => addBlock('table')}
                className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                + Table
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Page'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
