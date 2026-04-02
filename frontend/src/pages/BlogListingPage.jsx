import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../redux/slices/blogSlice";
import { motion } from "framer-motion";
import MetaHTML from "../components/Common/MetaHTML";

const BlogListingPage = () => {
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
  };

  const optimizeCloudinaryUrl = (url) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    if (url.includes("/upload/")) {
      return url.replace("/upload/", "/upload/f_auto,q_auto/");
    }
    return url;
  };

  return (
    <motion.div
      className="bg-white text-gray-900 min-h-screen py-16"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <MetaHTML
        title="Blog - Latest Fashion Trends & Styling Tips | Rabbit E-commerce"
        description="Read the latest articles on fashion, styling, and new arrivals on the Rabbit E-commerce blog."
      />
      
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-[28px] font-medium mb-3 text-[#ea2e0e]">
            Our Blog
          </h1>
          <p className="text-[14px] text-gray-600 max-w-xl mx-auto leading-relaxed">
            Discover the latest trends, styling tips, and news from Rabbit E-commerce.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#ea2e0e]"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">Error: {error}</div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No blogs available yet. Please check back later!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden group hover:shadow-xl transition-shadow duration-300 flex flex-col"
                whileHover={{ y: -5 }}
              >
                <div className="relative w-full h-56 overflow-hidden">
                  <img
                    src={optimizeCloudinaryUrl(blog.image?.url)}
                    alt={blog.image?.altText || blog.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-gray-400 text-xs tracking-wider mb-2 block uppercase">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <h2 className="text-xl font-medium mb-3 text-gray-900 group-hover:text-[#ea2e0e] transition-colors line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 text-[14px] mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {blog.excerpt}
                  </p>
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="text-[13px] font-medium text-black border-b border-black pb-1 w-max hover:text-[#ea2e0e] hover:border-[#ea2e0e] transition-colors uppercase tracking-wide"
                  >
                    Read More
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BlogListingPage;
