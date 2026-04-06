import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAdminBlogs, createBlog, updateBlog } from "../../redux/slices/adminBlogSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";

const EditBlogPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, loading } = useSelector((state) => state.adminBlogs);

  const [blogData, setBlogData] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: null, // we'll store the object {url, altText} here
    isPublished: true,
    metaTitle: "",
    metaDescription: "",
  });

  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(fetchAdminBlogs());
    }
  }, [dispatch, blogs.length]);

  useEffect(() => {
    if (id && blogs.length > 0) {
      const existingBlog = blogs.find((b) => b._id === id);
      if (existingBlog) {
        setBlogData({
          title: existingBlog.title || "",
          excerpt: existingBlog.excerpt || "",
          content: existingBlog.content || "",
          image: existingBlog.image || null,
          isPublished: existingBlog.isPublished !== undefined ? existingBlog.isPublished : true,
          metaTitle: existingBlog.metaTitle || "",
          metaDescription: existingBlog.metaDescription || "",
        });
      }
    }
  }, [id, blogs]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBlogData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleContentChange = (value) => {
    setBlogData((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploadingImage(true);
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setBlogData((prev) => ({
        ...prev,
        image: { url: data.imageUrl, altText: "" },
      }));
      setUploadingImage(false);
      toast.success("Image uploaded successfully");
    } catch (error) {
      setUploadingImage(false);
      toast.error("Image upload failed");
    }
  };

  const removeImage = () => {
    setBlogData((prev) => ({ ...prev, image: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!blogData.title || !blogData.content || !blogData.excerpt || !blogData.image) {
      toast.error("Title, excerpt, content, and image are required");
      return;
    }

    if (id) {
      dispatch(updateBlog({ id, blogData }))
        .unwrap()
        .then(() => navigate("/admin/blogs"))
        .catch((err) => toast.error(err));
    } else {
      dispatch(createBlog(blogData))
        .unwrap()
        .then(() => navigate("/admin/blogs"))
        .catch((err) => toast.error(err));
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  if (id && loading) return <div className="p-6">Loading blog details...</div>;

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 bg-white shadow-sm border border-gray-100 rounded-md"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <h2 className="text-2xl font-medium mb-6 uppercase tracking-tight">
        {id ? "Edit Blog Post" : "Add New Blog Post"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className="block text-[13px] font-medium text-gray-900 mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={blogData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 text-[14px] focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-all"
                placeholder="Enter blog title"
                required
              />
            </div>

            <div>
              <label className="block text-[13px] font-medium text-gray-900 mb-2">Short Excerpt *</label>
              <textarea
                name="excerpt"
                value={blogData.excerpt}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-3 text-[14px] focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-all h-24 resize-none"
                placeholder="Brief summary for blog listing"
                required
                maxLength={300}
              />
              <p className="text-xs text-gray-500 mt-1">{blogData.excerpt.length}/300 characters</p>
            </div>

            <div>
              <label className="block text-[13px] font-medium text-gray-900 mb-2">Content *</label>
              <div className="bg-white">
                <ReactQuill
                  theme="snow"
                  value={blogData.content}
                  onChange={handleContentChange}
                  modules={modules}
                  className="h-[400px] mb-12"
                />
              </div>
            </div>
          </div>

          {/* Sidebar (Right) */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-[14px] font-medium text-gray-900 mb-4 uppercase tracking-wider">Publish Options</h3>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-[14px] text-gray-700">Status</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={blogData.isPublished}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading || uploadingImage}
                className="w-full bg-[#D4AF37] text-white py-3 rounded-full hover:bg-[#B8962E] transition font-bold text-xs uppercase tracking-widest disabled:bg-gray-400 shadow-lg shadow-[#D4AF37]/20"
              >
                {loading ? "Saving..." : id ? "Update Blog" : "Publish Blog"}
              </button>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-[14px] font-medium text-gray-900 mb-4 uppercase tracking-wider">Featured Image *</h3>
              
              {!blogData.image ? (
                <>
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50 transition-colors">
                    <FiUploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-[13px] text-gray-600">
                      <span className="font-semibold text-blue-600">Click to upload</span>
                    </p>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  {uploadingImage && <p className="text-xs text-blue-600 mt-2 text-center">Uploading image...</p>}
                </>
              ) : (
                <div className="relative rounded-lg overflow-hidden border border-gray-200 group">
                  <img src={blogData.image.url} alt="Blog Featured" className="w-full h-40 object-cover" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-md text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              )}
              
              {blogData.image && (
                <div className="mt-4">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Image Alt Text (SEO)</label>
                  <input
                    type="text"
                    value={blogData.image.altText || ""}
                    onChange={(e) => setBlogData(prev => ({ ...prev, image: { ...prev.image, altText: e.target.value } }))}
                    className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-[#ea2e0e] outline-none"
                    placeholder="Describe image..."
                  />
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-[14px] font-medium text-gray-900 mb-4 uppercase tracking-wider">SEO Metadata</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Meta Title</label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={blogData.metaTitle}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-[#ea2e0e] outline-none"
                    placeholder="Leave blank to use blog title"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Meta Description</label>
                  <textarea
                    name="metaDescription"
                    value={blogData.metaDescription}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded p-2 text-xs focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-all h-20 resize-none"
                    placeholder="Leave blank to use excerpt"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default EditBlogPage;
