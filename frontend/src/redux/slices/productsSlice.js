import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to fetch products by Collection and optional filters
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async ({
    isSugarFree,
    category,
    collection,
    subCategory,
    productType,
    minPrice,
    maxPrice,
    sortBy,
    search,
    limit,
  }) => {
    const query = new URLSearchParams();
    if (category && category !== "all") query.append("category", category);
    if (collection && collection !== "all") query.append("collection", collection);
    if (subCategory) query.append("subCategory", subCategory);
    if (productType) query.append("productType", productType);
    if (isSugarFree !== undefined && isSugarFree !== "") query.append("isSugarFree", isSugarFree);
    
    if (minPrice !== undefined && minPrice !== "") query.append("minPrice", minPrice);
    if (maxPrice !== undefined && maxPrice !== "") query.append("maxPrice", maxPrice);
    
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (limit) query.append("limit", limit);

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`,
    );
    return response.data;
  },
);

//Async thunk to fetch a single product by ID
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
    );
    return response.data;
  },
);

// Async Thunk to fetch similar products
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
    return response.data;
  },
);

//Async thunk to fetch unique categories
export const fetchCategories = createAsyncThunk(
  "products/fetchCategories",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/categories`,
    );
    return response.data;
  },
);

// Async thunk to create a category
export const createCategory = createAsyncThunk(
  "products/createCategory",
  async (categoryData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/categories`,
      categoryData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
    return response.data;
  },
);

// Async thunk to delete a category
export const deleteCategory = createAsyncThunk(
  "products/deleteCategory",
  async (id) => {
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/categories/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
    return id;
  },
);

// Async Thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`,
    );
    return response.data;
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    categories: [],
    selectedProduct: null, //Store the details of the single project
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      category: "",
      subCategory: "",
      productType: "",
      isSugarFree: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      search: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        subCategory: "",
        productType: "",
        isSugarFree: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      //hanlde fetching products with filter
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle fetching single product details
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //Handle Updating Product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product._id === updatedProduct._id,
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((cat) => cat._id !== action.payload);
      });
  },
});

export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
// fetch similarproducts
