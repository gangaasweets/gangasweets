import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all published blogs
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch single blog by slug
export const fetchBlogBySlug = createAsyncThunk(
  "blogs/fetchBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/blogs/${slug}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    singleBlog: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearBlogError: (state) => {
      state.error = null;
    },
    clearSingleBlog: (state) => {
      state.singleBlog = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single blog
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBlog = action.payload;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBlogError, clearSingleBlog } = blogSlice.actions;

export default blogSlice.reducer;
