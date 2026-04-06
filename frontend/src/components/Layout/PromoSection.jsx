import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import hamImg from "../../assets/hamper.webp";
import bg from "../../assets/greenTexture.webp";

const PromoSection = () => {
    return (
        <section 
            className="py-16 md:py-24 relative text-white overflow-hidden"
            style={{ 
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="container mx-auto px-4 md:px-8 lg:px-16 max-w-7xl">
                <div className="flex flex-col md:flex-row items-center gap-10 lg:gap-16">
                    {/* Left Column - Text Content */}
                    <motion.div 
                        className="w-full md:w-1/2 text-center md:text-left"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-['Cinzel'] tracking-wider leading-tight mb-6 uppercase drop-shadow-md">
                            Let Authentic Indian Mithai <br />
                            <span className="text-[#D4AF37]">Melt into Your Moments</span>
                        </h2>
                        
                        <p className="text-base md:text-lg font-light text-gray-100 max-w-xl mb-8 leading-relaxed">
                            Discover the taste of perfection at Ganga Sweets, a luxurious mithai gift boutique 
                            where each sweet is handcrafted to deliver an unforgettable experience.
                        </p>

                        <Link 
                            to="/collections/all" 
                            className="inline-block bg-[#D4AF37] text-white px-10 py-3.5 rounded-full font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#b08d57] hover:scale-105 shadow-xl text-sm"
                        >
                            SHOP NOW
                        </Link>
                    </motion.div>

                    {/* Right Column - Image with Golden Border */}
                    <motion.div 
                        className="w-full md:w-1/2 flex justify-center md:justify-end"
                        initial={{ opacity: 0, scale: 0.9, x: 50 }}
                        whileInView={{ opacity: 1, scale: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative group">
                            {/* The Golden Rectangle Border */}
                            <div className="absolute -inset-4 border-[5px] border-[#D4AF37] opacity-80 rounded-sm translate-x-3 translate-y-3 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-500"></div>
                            
                            <div className="relative overflow-hidden z-10 rounded-sm shadow-2xl">
                                <img 
                                    src={hamImg} 
                                    alt="Luxury Gift Hamper" 
                                    className="w-full max-w-sm lg:max-w-md object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-green-950/25 pointer-events-none"></div>
        </section>
    );
};

export default PromoSection;
