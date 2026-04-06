import React from 'react';
import { motion } from 'framer-motion';

const HampersSection = () => {
    const hampers = [
        { title: "Biscuits & Namkeen", image: "https://picsum.photos/500/625?random=21", path: "/collections/all?category=Namkeen" },
        { title: "Chips", image: "https://picsum.photos/500/625?random=22", path: "/collections/all?category=Snacks" },
        { title: "Cold Drinks", image: "https://picsum.photos/500/625?random=23", path: "/collections/all?category=Beverages" },
        { title: "Chocolates", image: "https://picsum.photos/500/625?random=24", path: "/collections/all?category=Gifts" },
    ];

    const Separator = () => (
        <div className="flex items-center justify-center gap-4 my-6">
            <div className="h-[1px] w-24 bg-gradient-to-l from-[#b08d57] to-transparent"></div>
            <div className="text-[#b08d57] text-xs">
                <span className="rotate-45 block">◆</span>
            </div>
            <div className="h-[1px] w-24 bg-gradient-to-r from-[#b08d57] to-transparent"></div>
        </div>
    );

    return (
        <section className="py-20 md:py-32 bg-[#FFF8E7]">
            <div className="main-container">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-['Cinzel'] tracking-[0.2em] text-[#b08d57] mb-4 uppercase">
                        CUSTOMISED HAMPERS
                    </h2>
                    <Separator />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {hampers.map((item, index) => (
                        <motion.div 
                            key={index} 
                            className="group relative"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                        >
                            {/* Card Wrapper */}
                            <div className="relative overflow-hidden bg-white shadow-sm border border-gray-100 rounded-xl transition-all duration-300 group-hover:shadow-2xl group-hover:border-[#b08d57]/30">
                                {/* Image */}
                                <div className="aspect-[4/5] overflow-hidden">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                                </div>

                                {/* Content Label Overlay or Below */}
                                <div className="p-6 text-center">
                                    <h3 className="text-lg font-['Cinzel'] font-bold tracking-widest text-gray-800 uppercase">
                                        {item.title}
                                    </h3>
                                    <div className="mt-2 w-12 h-[1px] bg-[#b08d57] mx-auto group-hover:w-20 transition-all duration-300"></div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HampersSection;
