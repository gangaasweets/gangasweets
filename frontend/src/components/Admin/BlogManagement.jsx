import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAdminBlogs, deleteBlog, resetAdminBlogSuccess } from "../../redux/slices/adminBlogSlice";
import { toast } from "sonner";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";

const BlogManagement = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error, successAction } = useSelector((state) => state.adminBlogs);

  useEffect(() => {
    dispatch(fetchAdminBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (successAction) {
      toast.success("Blog action successful");
      dispatch(resetAdminBlogSuccess());
    }
    if (error) {
      toast.error(error);
    }
  }, [successAction, error, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      dispatch(deleteBlog(id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-xl sm:text-2xl font-medium text-gray-900 uppercase tracking-tight mb-4 sm:mb-0">
          Blog Management
        </h2>
        <Link
          to="/admin/blogs/new"
          className="bg-[#D4AF37] text-white px-6 py-2.5 rounded-full flex items-center hover:bg-[#B8962E] transition shadow-lg shadow-[#D4AF37]/20 font-bold text-xs uppercase tracking-widest"
        >
          <FiPlus className="mr-2" />
          Create Blog
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-[#E5E5E5]">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title & Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded object-cover"
                          src={blog.image?.url || "https://via.placeholder.com/40"}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 line-clamp-1 max-w-[200px] sm:max-w-xs block">
                          {blog.title}
                        </div>
                        <div className="text-sm text-gray-500 block">
                          By {blog.author?.name || "Admin"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        blog.isPublished
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {blog.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <Link
                        to={`/admin/blogs/${blog._id}/edit`}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FiEdit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                  {loading ? "Loading blogs..." : "No blogs found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogManagement;
