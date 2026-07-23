import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Demo user data (fallback)
const DEMO_USERS: any = {
  'admin@example.com': { password: 'admin123', role: 'admin', name: 'Admin User' },
  'editor@example.com': { password: 'editor123', role: 'editor', name: 'Editor User' },
  'viewer@example.com': { password: 'viewer123', role: 'viewer', name: 'Viewer User' },
};

// Demo pages data
const DEMO_PAGES = [
  {
    _id: '1',
    title: 'Welcome Page',
    slug: 'welcome',
    blocks: [
      { id: '1', type: 'heading', content: { level: 1, text: 'Welcome to CMS' } },
      { id: '2', type: 'paragraph', content: { text: 'This is a demo page showing the content management system.' } },
    ],
    status: 'published',
    createdAt: new Date().toISOString(),
  },
];

// Auth Slice
export const loginAsync = createAsyncThunk('auth/login', async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password }, {
      timeout: 5000,
    });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('demo_mode', 'false');
    return response.data;
  } catch (error: any) {
    console.log('[v0] API error, checking demo credentials');
    // Fallback to demo mode
    const demoUser = DEMO_USERS[email];
    if (demoUser && demoUser.password === password) {
      const token = 'demo_token_' + Date.now();
      localStorage.setItem('token', token);
      localStorage.setItem('demo_mode', 'true');
      return {
        token,
        user: { id: email, email, name: demoUser.name, role: demoUser.role },
      };
    }
    return rejectWithValue(error.response?.data?.error || 'Invalid credentials. Try admin@example.com / admin123');
  }
});

export const registerAsync = createAsyncThunk(
  'auth/register',
  async ({ email, password, name }: { email: string; password: string; name: string }) => {
    const response = await axios.post(`${API_URL}/auth/register`, { email, password, name });
    localStorage.setItem('token', response.data.token);
    return response.data;
  }
);

export const getMeAsync = createAsyncThunk('auth/getMe', async (_, { getState }: any) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token');
  const response = await axios.get(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
  } as any,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getMeAsync.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

// Pages Slice
export const getPagesAsync = createAsyncThunk('pages/getPages', async (_, { rejectWithValue }: any) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/pages`, {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 5000,
    });
    return response.data;
  } catch (error: any) {
    console.log('[v0] Using demo pages');
    // Fallback to demo data
    if (localStorage.getItem('demo_mode') === 'true') {
      return { pages: DEMO_PAGES, total: DEMO_PAGES.length };
    }
    return rejectWithValue('Failed to load pages');
  }
});

export const getPageByIdAsync = createAsyncThunk('pages/getPageById', async (id: string) => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/pages/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const createPageAsync = createAsyncThunk(
  'pages/createPage',
  async (pageData: any) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/pages`, pageData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const updatePageAsync = createAsyncThunk(
  'pages/updatePage',
  async ({ id, ...data }: any) => {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/pages/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const deletePageAsync = createAsyncThunk('pages/deletePage', async (id: string) => {
  const token = localStorage.getItem('token');
  await axios.delete(`${API_URL}/pages/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return id;
});

const pagesSlice = createSlice({
  name: 'pages',
  initialState: {
    items: [],
    currentPage: null,
    loading: false,
    error: null,
    total: 0,
  } as any,
  reducers: {
    clearCurrentPage: (state) => {
      state.currentPage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPagesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPagesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.pages;
        state.total = action.payload.total;
      })
      .addCase(getPagesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getPageByIdAsync.fulfilled, (state, action) => {
        state.currentPage = action.payload;
      })
      .addCase(createPageAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updatePageAsync.fulfilled, (state, action) => {
        const index = state.items.findIndex((p: any) => p._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.currentPage = action.payload;
      })
      .addCase(deletePageAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((p: any) => p._id !== action.payload);
      });
  },
});

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    pages: pagesSlice.reducer,
  },
});

export const { logout } = authSlice.actions;
export const { clearCurrentPage } = pagesSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
