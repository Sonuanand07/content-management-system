'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { loginAsync } from '@/lib/store';
import { RootState, AppDispatch } from '@/lib/store';

export default function LoginForm() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [networkError, setNetworkError] = useState('');
  const [apiStatus, setApiStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  // Check API connection on mount
  useEffect(() => {
    const checkAPI = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
        console.log('[v0] Checking API at:', apiUrl);
        const response = await fetch(`${apiUrl.replace('/api', '')}/health`, { 
          method: 'GET',
          mode: 'cors' 
        });
        if (response.ok) {
          setApiStatus('online');
          console.log('[v0] API is online');
        } else {
          setApiStatus('offline');
          setNetworkError('API server is down');
          console.log('[v0] API responded but with error');
        }
      } catch (err) {
        setApiStatus('offline');
        setNetworkError('Cannot connect to server. Using demo mode.');
        console.log('[v0] API connection error:', err);
      }
    };
    checkAPI();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNetworkError('');
    try {
      console.log('[v0] Attempting login with:', email);
      const result = await dispatch(loginAsync({ email, password })).unwrap();
      console.log('[v0] Login successful');
      router.push('/admin/dashboard');
    } catch (err: any) {
      console.error('[v0] Login failed:', err);
      const errorMsg = err?.message || 'Login failed';
      if (errorMsg.includes('Network') || errorMsg.includes('ERR_NETWORK')) {
        setNetworkError('Network error: Cannot reach the server. Try again or use demo mode.');
      } else {
        setNetworkError(errorMsg);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold mb-2 text-center">CMS Admin</h1>
        
        {/* API Status Indicator */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            apiStatus === 'online' ? 'bg-green-500' : 
            apiStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
          }`} />
          <span className="text-xs text-gray-600">
            {apiStatus === 'checking' && 'Checking connection...'}
            {apiStatus === 'online' && 'Connected'}
            {apiStatus === 'offline' && 'Connection failed'}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {(error || networkError) && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-lg">
              {networkError || error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-4 text-center">
          Demo: admin@example.com / admin123
        </p>
      </div>
    </div>
  );
}
