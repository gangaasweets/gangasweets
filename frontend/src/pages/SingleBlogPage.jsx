import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogBySlug, clearSingleBlog } from "../redux/slices/blogSlice";
import { motion } from "framer-motion";
import MetaHTML from "../components/Common/MetaHTML";
import SchemaMarkup from "../components/Common/SchemaMarkup";
import { FiArrowLeft } from "react-icons/fi";
import { SingleBlogSkeleton } from "../components/Common/Skeleton";
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
        name: singleBlog.author?.name || "Ganga Sweets Team",
    }],
    description: singleBlog.excerpt,
  } : null;

  if (loading) {
    return (
      <div className="bg-white text-gray-900 min-h-screen py-10 lg:py-16">
        <SingleBlogSkeleton />
      </div>
    );
  }

  if (error || !singleBlog) {
    return (
      <div className="text-center py-20 min-h-[60vh] flex flex-col justify-center items-center">
        <h2 className="text-2xl mb-4 font-['Cinzel'] tracking-widest">Blog Post Not Found</h2>
        <Link to="/blog" className="text-[#D4AF37] hover:underline font-bold uppercase tracking-widest text-xs">
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

        <header className="mb-10 text-center border-b border-gray-100 pb-10">
          <span className="text-sm text-[#D4AF37] font-bold tracking-[0.3em] uppercase mb-4 block">
            {new Date(singleBlog.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-['Cinzel'] font-bold tracking-tighter mb-6 leading-tight text-gray-900">
            {singleBlog.title}
          </h1>
          <p className="text-gray-400 text-xs uppercase tracking-widest font-bold">
            By {singleBlog.author?.name || "Ganga Sweets Team"}
          </p>
        </header>

        <div className="mb-16 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 relative h-[400px] md:h-[600px] w-full">
          <img
            src={optimizeCloudinaryUrl(singleBlog.image?.url)}
            alt={singleBlog.image?.altText || singleBlog.title}
            loading="eager"
            className="w-full h-full object-cover"
          />
        </div>

        <div 
            className="prose prose-lg max-w-none prose-img:rounded-2xl prose-img:shadow-xl prose-a:text-[#D4AF37] prose-p:text-gray-600 prose-headings:font-['Cinzel'] prose-headings:font-bold prose-headings:tracking-widest text-[16px] leading-relaxed ql-editor"
            dangerouslySetInnerHTML={{ __html: singleBlog.content }} 
        />
        
      </article>
    </motion.div>
  );
};

export default SingleBlogPage;
