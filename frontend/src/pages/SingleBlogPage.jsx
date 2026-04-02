import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogBySlug, clearSingleBlog } from "../redux/slices/blogSlice";
import { motion } from "framer-motion";
import MetaHTML from "../components/Common/MetaHTML";
import SchemaMarkup from "../components/Common/SchemaMarkup";
import { FiArrowLeft } from "react-icons/fi";
// Ensure quill styles are imported for proper rendering of the HTML content
import "react-quill/dist/quill.snow.css";

const SingleBlogPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { singleBlog, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogBySlug(slug));
    
    return () => {
      dispatch(clearSingleBlog());
    };
  }, [dispatch, slug]);

  const optimizeCloudinaryUrl = (url) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    if (url.includes("/upload/")) {
      return url.replace("/upload/", "/upload/f_auto,q_auto/");
    }
    return url;
  };

  const articleSchema = singleBlog ? {
    headline: singleBlog.title,
    image: [singleBlog.image?.url],
    datePublished: new Date(singleBlog.createdAt).toISOString(),
    dateModified: new Date(singleBlog.updatedAt).toISOString(),
    author: [{
        "@type": "Person",
        name: singleBlog.author?.name || "Rabbit Team",
    }],
    description: singleBlog.excerpt,
  } : null;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#ea2e0e]"></div>
      </div>
    );
  }

  if (error || !singleBlog) {
    return (
      <div className="text-center py-20 min-h-[60vh] flex flex-col justify-center items-center">
        <h2 className="text-2xl mb-4">Blog Post Not Found</h2>
        <Link to="/blog" className="text-[#ea2e0e] hover:underline">
          Return to All Blogs
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      className="bg-white text-gray-900 min-h-screen py-10 lg:py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MetaHTML
        title={singleBlog.metaTitle || singleBlog.title}
        description={singleBlog.metaDescription || singleBlog.excerpt}
        ogImage={singleBlog.image?.url}
        ogType="article"
      />
      <SchemaMarkup type="Article" data={articleSchema} />

      <article className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="mb-6">
          <Link
            to="/blog"
            className="inline-flex items-center text-[13px] text-gray-500 hover:text-black transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Back to Blogs
          </Link>
        </div>

        <header className="mb-10 text-center">
          <span className="text-sm text-[#ea2e0e] font-medium tracking-widest uppercase mb-4 block">
            {new Date(singleBlog.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-6 leading-tight">
            {singleBlog.title}
          </h1>
          <p className="text-gray-500 text-sm italic">
            By {singleBlog.author?.name || "Rabbit Team"}
          </p>
        </header>

        <div className="mb-12 rounded-xl overflow-hidden shadow-lg border border-gray-100 relative h-[300px] md:h-[500px] w-full">
          <img
            src={optimizeCloudinaryUrl(singleBlog.image?.url)}
            alt={singleBlog.image?.altText || singleBlog.title}
            loading="eager"
            className="w-full h-full object-cover"
          />
        </div>

        <div 
            className="prose prose-lg max-w-none prose-img:rounded-xl prose-img:shadow-md prose-a:text-[#ea2e0e] prose-p:text-gray-600 prose-headings:font-medium text-[15px] leading-loose ql-editor"
            dangerouslySetInnerHTML={{ __html: singleBlog.content }} 
        />
        
      </article>
    </motion.div>
  );
};

export default SingleBlogPage;
