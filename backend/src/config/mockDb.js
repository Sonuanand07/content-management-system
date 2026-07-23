// Mock in-memory database for testing without MongoDB
const mockDb = {
  users: [],
  pages: [],
};

// User operations
export const mockUserOps = {
  create: (userData) => {
    const user = {
      _id: Math.random().toString(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockDb.users.push(user);
    return user;
  },

  findOne: (query) => {
    return mockDb.users.find((u) => {
      if (query.email) return u.email === query.email;
      return false;
    });
  },

  findById: (id) => {
    return mockDb.users.find((u) => u._id === id);
  },

  deleteMany: () => {
    mockDb.users = [];
  },
};

// Page operations
export const mockPageOps = {
  create: (pageData) => {
    const page = {
      _id: Math.random().toString(),
      ...pageData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockDb.pages.push(page);
    return page;
  },

  insertMany: (pagesData) => {
    return pagesData.map((p) => mockPageOps.create(p));
  },

  find: (query = {}) => {
    return mockDb.pages.filter((p) => {
      if (query.published !== undefined && p.published !== query.published) return false;
      return true;
    });
  },

  findOne: (query) => {
    return mockDb.pages.find((p) => {
      if (query.slug) return p.slug === query.slug;
      if (query._id) return p._id === query._id;
      return false;
    });
  },

  findById: (id) => {
    return mockDb.pages.find((p) => p._id === id);
  },

  findByIdAndDelete: (id) => {
    const index = mockDb.pages.findIndex((p) => p._id === id);
    if (index !== -1) {
      const deleted = mockDb.pages[index];
      mockDb.pages.splice(index, 1);
      return deleted;
    }
    return null;
  },

  countDocuments: (query = {}) => {
    return mockPageOps.find(query).length;
  },

  deleteMany: () => {
    mockDb.pages = [];
  },
};

export default mockDb;
