import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to get config with token
const getAuthConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  };
};

// Fetch all blogs (admin)
export const fetchAdminBlogs = createAsyncThunk(
  "adminBlogs/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/blogs`,
        getAuthConfig()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Create blog
export const createBlog = createAsyncThunk(
  "adminBlogs/create",
  async (blogData, { getState, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/blogs`,
        blogData,
        getAuthConfig()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update blog
export const updateBlog = createAsyncThunk(
  "adminBlogs/update",
  async ({ id, blogData }, { getState, rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/blogs/${id}`,
        blogData,
        getAuthConfig()
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete blog
export const deleteBlog = createAsyncThunk(
  "adminBlogs/delete",
  async (id, { getState, rejectWithValue }) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/blogs/${id}`,
        getAuthConfig()
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const adminBlogSlice = createSlice({
  name: "adminBlogs",
  initialState: {
    blogs: [],
    loading: false,
    error: null,
    successAction: false,
  },
  reducers: {
    clearAdminBlogError: (state) => {
      state.error = null;
    },
    resetAdminBlogSuccess: (state) => {
      state.successAction = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchAdminBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchAdminBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.unshift(action.payload);
        state.successAction = true;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.blogs.findIndex(
          (b) => b._id === action.payload._id
        );
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
        state.successAction = true;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter((b) => b._id !== action.payload);
        state.successAction = true;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAdminBlogError, resetAdminBlogSuccess } = adminBlogSlice.actions;

export default adminBlogSlice.reducer;
