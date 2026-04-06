import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bg from "../../assets/pinkTexture2.webp";

const TestimonialsSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const testimonials = [
        {
            text: "The pure ghee sweets from Ganga Sweets are unmatched in taste. Their Besan Laddoo reminded me of my childhood visits to Agra. Truly authentic and royal!",
            name: "Anjali Sharma",
            rating: 5,
        },
        {
            text: "I ordered their festive gift boxes for my corporate team, and the response was overwhelming. The packaging is absolutely premium and the mithais were fresh.",
            name: "Rahul Verma",
            rating: 5,
        },
        {
            text: "Ganga Sweets has the best Bengali sweets in town. The soft, spongy Rasgulla and the perfectly balanced Sandesh are my absolute favorites.",
            name: "Srijita Ghosh",
            rating: 5,
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    const Separator = () => (
        <div className="flex items-center justify-center gap-4 my-4">
            <div className="h-[1px] w-20 bg-gradient-to-l from-[#b08d57] to-transparent"></div>
            <div className="text-[#b08d57] text-[10px]">
                <span className="rotate-45 block">◆</span>
            </div>
            <div className="h-[1px] w-20 bg-gradient-to-r from-[#b08d57] to-transparent"></div>
        </div>
    );

    return (
        <section 
            className="py-16 md:py-24 relative overflow-hidden"
            style={{ 
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="container mx-auto px-6 max-w-4xl text-center">
                <div className="mb-12">
                    <h2 className="text-2xl md:text-3xl font-['Cinzel'] tracking-[0.25em] text-[#b08d57] mb-1 uppercase">
                        TESTIMONIALS
                    </h2>
                    <Separator />
                </div>

                <div className="relative h-[250px] md:h-[200px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={activeIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.6 }}
                            className="absolute inset-0 flex flex-col items-center justify-center"
                        >
                            <p className="text-lg md:text-xl italic text-gray-700 leading-relaxed mb-8 font-medium px-4">
                                "{testimonials[activeIndex].text}"
                            </p>
                            
                            <div className="flex space-x-1.5 text-[#D4AF37] mb-4 text-sm">
                                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                                    <span key={i}>★</span>
                                ))}
                            </div>
                            
                            <h4 className="text-[11px] md:text-xs font-['Cinzel'] font-bold tracking-[0.3em] text-[#b08d57] uppercase">
                                – {testimonials[activeIndex].name}
                            </h4>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center space-x-3 mt-12 pb-2">
                    {testimonials.map((_, index) => (
                        <button 
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                activeIndex === index ? "w-8 bg-[#b08d57]" : "w-1.5 bg-gray-300"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
