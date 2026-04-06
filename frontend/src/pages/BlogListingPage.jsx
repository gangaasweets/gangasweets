import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBlogs } from "../redux/slices/blogSlice";
import { motion } from "framer-motion";
import MetaHTML from "../components/Common/MetaHTML";
import { BlogGridSkeleton } from "../components/Common/Skeleton";

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
        title="Blog - Indian Mithai Traditions & Gifting Tips | Ganga Sweets"
        description="Read the latest articles on Indian sweets, traditional recipes, and gifting tips from the Ganga Sweets team."
      />
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="premium-separator mb-4">The Sweet Stories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the heritage of Indian sweets, traditional festive recipes, and the art of premium gifting.
          </p>
        </header>

        {loading ? (
          <BlogGridSkeleton count={6} />
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
                  <h2 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#D4AF37] transition-colors line-clamp-2 font-['Cinzel'] tracking-wide">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 text-[14px] mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {blog.excerpt}
                  </p>
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="text-[13px] font-bold text-black border-b border-black pb-1 w-max hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors uppercase tracking-[0.2em]"
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
