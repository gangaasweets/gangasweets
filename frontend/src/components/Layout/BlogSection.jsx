import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../../redux/slices/blogSlice';
import { motion } from 'framer-motion';
import { BlogGridSkeleton } from '../Common/Skeleton';

const BlogSection = () => {
    const dispatch = useDispatch();
    const { blogs, loading } = useSelector((state) => state.blogs);

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    const Separator = () => (
        <div className="flex items-center justify-center gap-4 my-6">
            <div className="h-[1px] w-24 bg-gradient-to-l from-[#b08d57] to-transparent"></div>
            <div className="text-[#b08d57] text-xs">
                <span className="rotate-45 block">◆</span>
            </div>
            <div className="h-[1px] w-24 bg-gradient-to-r from-[#b08d57] to-transparent"></div>
        </div>
    );

    // Get the latest 3 blogs, sorted by date
    const latestBlogs = [...blogs]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

    return (
        <section className="py-20 md:py-24 bg-white">
            <div className="main-container text-center">
                <div className="mb-14">
                    <h2 className="text-3xl md:text-4xl font-['Cinzel'] tracking-[0.2em] text-[#b08d57] mb-2 uppercase">
                        OUR BLOGS
                    </h2>
                    <Separator />
                </div>

                {loading ? (
                    <BlogGridSkeleton count={3} />
                ) : latestBlogs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {latestBlogs.map((blog, index) => (
                            <motion.div 
                                key={blog._id}
                                className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col text-left hover:shadow-xl transition-all duration-300"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img 
                                        src={blog.image?.url || "https://picsum.photos/800/600?random=1"} 
                                        alt={blog.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/10 transition-opacity opacity-0 group-hover:opacity-100"></div>
                                </div>
                                <div className="p-6 md:p-8 flex flex-col flex-grow">
                                    <span className="text-[10px] font-bold text-[#b08d57] uppercase tracking-widest mb-2.5">
                                        {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 line-clamp-2 leading-tight group-hover:text-[#b08d57] transition-colors">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-500 mb-6 line-clamp-3 leading-relaxed text-sm md:text-[15px] flex-grow">
                                        {blog.excerpt}
                                    </p>
                                    <Link 
                                        to={`/blog/${blog.slug}`} 
                                        className="text-xs font-bold text-[#b08d57] uppercase tracking-widest border-b border-[#b08d57]/20 pb-0.5 hover:border-[#b08d57] transition-all w-fit"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-gray-400 italic font-light tracking-wide">
                        No blogs available at the moment.
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogSection;
