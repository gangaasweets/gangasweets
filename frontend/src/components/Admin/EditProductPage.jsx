import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, fetchCategories } from "../../redux/slices/productsSlice";
import { updateProduct, createProduct } from "../../redux/slices/adminProductSlice";
import { FiExternalLink, FiTrash2, FiUploadCloud } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, categories, loading, error } = useSelector((state) => state.products);

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    basePrice: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    subCategory: "",
    productType: "standard",
    isBestSeller: false,
    isPremium: false,
    isSugarFree: false,
    festivalTags: [],
    images: [],
  });

  const [festivalTagsInput, setFestivalTagsInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    if (id) {
      dispatch(fetchProductDetails(id));
    } else {
      resetProductData();
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && selectedProduct) {
      setProductData({
        ...selectedProduct,
        images: selectedProduct.images?.length
          ? selectedProduct.images.map((img) => ({
            url: img.url,
            altText: img.altText || "",
          }))
          : [],
      });
      if (selectedProduct.festivalTags) {
        setFestivalTagsInput(selectedProduct.festivalTags.join(", "));
      }
    }
  }, [id, selectedProduct]);

  const resetProductData = () => {
    setProductData({
      name: "",
      description: "",
      basePrice: 0,
      countInStock: 0,
      sku: "",
      category: "",
      brand: "",
      subCategory: "",
      productType: "standard",
      isBestSeller: false,
      isPremium: false,
      isSugarFree: false,
      festivalTags: [],
      images: [],
    });
    setFestivalTagsInput("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      altText: "",
    }));

    setProductData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tagsArray = festivalTagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.basePrice); // Backend expects "price"
    formData.append("countInStock", productData.countInStock);
    formData.append("sku", productData.sku);
    formData.append("category", productData.category);
    formData.append("subCategory", productData.subCategory);
    formData.append("brand", productData.brand);
    formData.append("productType", productData.productType);
    formData.append("isBestSeller", productData.isBestSeller);
    formData.append("isPremium", productData.isPremium);
    formData.append("isSugarFree", productData.isSugarFree);
    formData.append("festivalTags", tagsArray.join(","));

    // Filter existing images and new files
    const existingImages = productData.images
      .filter(img => !img.file)
      .map(img => ({ url: img.url, altText: img.altText }));

    formData.append("existingImages", JSON.stringify(existingImages));

    productData.images.forEach(img => {
      if (img.file) {
        formData.append("images", img.file);
      }
    });

    setIsUpdating(true);
    if (id) {
      dispatch(updateProduct({ id, productData: formData }))
        .unwrap()
        .then(() => {
          toast.success("Product updated successfully!");
          navigate("/admin/products");
        })
        .catch((err) => {
          toast.error(err?.message || "Failed to update product");
          console.error(err);
        })
        .finally(() => setIsUpdating(false));
    } else {
      dispatch(createProduct(formData))
        .unwrap()
        .then(() => {
          toast.success("Product created successfully!");
          navigate("/admin/products");
        })
        .catch((err) => {
          toast.error(err?.message || "Failed to create product");
          console.error(err);
        })
        .finally(() => setIsUpdating(false));
    }
  };

  if (id && loading) return <p>Loading...</p>;
  if (id && error) return <p className="text-red-500">{error}</p>;

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
  };


  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 shadow-md rounded-md"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <h2 className="text-3xl font-bold mb-6">
        {id ? "Edit Product" : "Add New Product"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-[13px] font-medium text-gray-900 mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 text-[14px] focus:ring-1 focus:ring-gray-900 outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-[13px] font-medium text-gray-900 mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 text-[14px] focus:ring-1 focus:ring-gray-900 outline-none h-32"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-[13px] font-medium text-gray-900 mb-2">Base Price (1kg / full unit) ₹</label>
            <input
              type="number"
              name="basePrice"
              value={productData.basePrice}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 text-[14px] focus:ring-1 focus:ring-gray-900 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium text-gray-900 mb-2">Count in Stock</label>
            <input
              type="number"
              name="countInStock"
              value={productData.countInStock}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 text-[14px] focus:ring-1 focus:ring-gray-900 outline-none"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-[13px] font-medium text-gray-900">Category</label>
            <Link to="/admin/categories" className="text-[12px] text-[#D4AF37] flex items-center gap-1 hover:underline">
              Manage Categories <FiExternalLink size={12} />
            </Link>
          </div>
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 text-[14px] focus:ring-1 focus:ring-gray-900 outline-none bg-white"
            required
          >
            <option value="">Select Category</option>
            {categories && categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat._id} value={cat.name.toLowerCase()}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option disabled>Loading categories...</option>
            )}
          </select>
        </div>

        {/* SUBCATEGORY */}
        <div className="mb-6">
          <label className="block text-[13px] font-medium text-gray-900 mb-2">Sub Category</label>
          <input
            type="text"
            name="subCategory"
            value={productData.subCategory}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-3 text-[14px] focus:ring-1 focus:ring-gray-900 outline-none"
            placeholder="e.g. Kaju, Bengali"
          />
        </div>
        {/* FLAG TOGGLES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isBestSeller"
              checked={productData.isBestSeller}
              onChange={(e) => setProductData({ ...productData, isBestSeller: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-[13px] text-gray-700">Is Best Seller?</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isPremium"
              checked={productData.isPremium}
              onChange={(e) => setProductData({ ...productData, isPremium: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-[13px] text-gray-700">Is Premium?</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isSugarFree"
              checked={productData.isSugarFree}
              onChange={(e) => setProductData({ ...productData, isSugarFree: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-[13px] text-gray-700">Is Sugar Free?</span>
          </label>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PRODUCT TYPE */}
          <div>
            <label className="block text-[13px] font-medium text-gray-900 mb-2">Product Type</label>
            <select
              name="productType"
              value={productData.productType}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 text-[14px] focus:ring-1 focus:ring-gray-900 outline-none bg-white"
            >
              <option value="standard">Standard (Weight based: 250g, 500g, 1kg)</option>
              <option value="simple">Simple (Quantity only)</option>
            </select>
          </div>

          {/* FESTIVAL TAGS */}
          <div>
            <label className="block text-[13px] font-medium text-gray-900 mb-2">Festival Tags (CSV)</label>
            <input
              type="text"
              placeholder="e.g. Diwali, Holi, Rakhi"
              value={festivalTagsInput}
              onChange={(e) => setFestivalTagsInput(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 text-[14px] focus:ring-1 focus:ring-gray-900 outline-none"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {festivalTagsInput.split(",").map((tag, i) => (
                tag.trim() && (
                  <span key={i} className="px-3 py-1 bg-yellow-100 text-[12px] rounded border border-yellow-200 text-yellow-800 font-medium">
                    {tag.trim()}
                  </span>
                )
              ))}
            </div>
          </div>
        </div>



        <div className="mb-6">
          <label className="block font-semibold mb-3">Upload Images</label>

          <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-green-50 hover:border-green-500 transition-all duration-200">
            <FiUploadCloud className="w-12 h-12 text-gray-400 mb-3" />
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-green-600">Click to upload</span>
            </p>
            <input type="file" multiple onChange={handleImageUpload} className="hidden" />
          </label>

          {uploading && <p className="text-sm text-green-600 mt-2">Uploading image...</p>}

          <div className="flex gap-4 mt-4 flex-wrap">
            {productData.images.map((image, index) => (
              <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden shadow-md group">
                <img src={image.url} alt="Product" className="w-full h-full object-cover" />

                <button
                  type="button"
                  onClick={() => {
                    const updatedImages = productData.images.filter((_, i) => i !== index);
                    setProductData({ ...productData, images: updatedImages });
                  }}
                  className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition hover:bg-red-500 hover:text-white"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className={`w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition font-medium text-[14px] ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isUpdating ? "Updating..." : id ? "Update Product" : "Create Product"}
        </button>
      </form>
    </motion.div>
  );
};

export default EditProductPage;