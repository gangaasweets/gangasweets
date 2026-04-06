import React from 'react';
import { motion } from 'framer-motion';
import MetaHTML from '../components/Common/MetaHTML';
import greenBg from "../assets/greenTexture.webp";
import pinkBg from "../assets/pinkTexture.webp";
import { FiTrendingUp, FiShield, FiHeart, FiMail } from 'react-icons/fi';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const Separator = () => (
    <div className="flex items-center justify-center lg:justify-start gap-4 my-6">
        <div className="h-[1px] w-16 bg-gradient-to-l from-[#D4AF37] to-transparent"></div>
        <div className="text-[#D4AF37] text-[10px]">
            <span className="rotate-45 block">◆</span>
        </div>
        <div className="h-[1px] w-16 bg-gradient-to-r from-[#D4AF37] to-transparent"></div>
    </div>
);

const SectionHeading = ({ children, align = "left", showSeparator = true }) => (
    <div className={`mb-6 ${align === "center" ? "text-center" : "text-left"}`}>
        <h2 className="text-3xl md:text-4xl font-['Cinzel'] tracking-wider text-gray-900 uppercase">
            {children}
        </h2>
        {showSeparator && (
            <div className={`flex items-center gap-4 mt-4 ${align === "center" ? "justify-center" : "justify-start"}`}>
                <div className="h-[1px] w-16 bg-[#D4AF37]"></div>
                <div className="text-[#D4AF37] text-[10px]">◆</div>
                <div className="h-[1px] w-16 bg-[#D4AF37]"></div>
            </div>
        )}
    </div>
);

const About = () => {
    return (
        <motion.div
            className="bg-white text-gray-900 min-h-screen"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            <MetaHTML 
                title="About Us - Our Story & Values | Ganga Sweets"
                description="Discover the heritage of Ganga Sweets. Learn about our commitment to traditional Indian mithai, craft, and premium gifting."
            />

            {/* PAGE TITLE */}
            <section className="py-20 bg-[#FFF8E7] text-center border-b border-[#D4AF37]/10">
                <div className="main-container">
                    <motion.span variants={fadeUp} className="text-xs font-bold text-[#D4AF37] tracking-[0.4em] uppercase mb-4 block">Our Heritage</motion.span>
                    <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-['Cinzel'] text-gray-900 uppercase tracking-tighter">About Us</motion.h1>
                </div>
            </section>

            {/* SECTION 1: ALTERNATING BLOCKS */}
            <section className="section-padding overflow-hidden">
                <div className="main-container space-y-32">
                    
                    {/* Block 1: Our Story */}
                    <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
                        <motion.div className="w-full md:w-1/2" variants={fadeUp}>
                            <motion.span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em] mb-4 block">The Beginning</motion.span>
                            <SectionHeading>Our Story</SectionHeading>
                            <p className="text-[15px] text-gray-600 leading-relaxed max-w-lg mt-8">
                                Ganga Sweets started as a small family passion for authentic Indian mithai. For years, we searched for the perfect balance of purity and taste, leading us to establish our own boutique where pure ghee and time-honored recipes take center stage.
                                <br /><br />
                                Founded with the mission to bring the royal taste of traditional Indian sweets to modern homes, every piece we create is a tribute to India's culinary heritage.
                            </p>
                        </motion.div>
                        <motion.div className="w-full md:w-1/2 relative group" variants={fadeUp}>
                            <div className="absolute inset-0 border-2 border-[#D4AF37] translate-x-4 translate-y-4 rounded-xl opacity-20 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
                            <img src="https://picsum.photos/800/600?random=11" alt="Our Story" className="relative z-10 w-full h-[450px] object-cover rounded-xl shadow-2xl" />
                        </motion.div>
                    </div>

                    {/* Block 2: Our Achievements */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-16 lg:gap-24">
                        <motion.div className="w-full md:w-1/2" variants={fadeUp}>
                            <motion.span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em] mb-4 block">Milestones</motion.span>
                            <SectionHeading>Our Achievements</SectionHeading>
                            <p className="text-[15px] text-gray-600 leading-relaxed max-w-lg mt-8">
                                From being a local favorite to serving thousands of satisfied customers nationwide, our journey has been marked by a relentless pursuit of excellence. 
                                <br /><br />
                                We have been recognized for our innovative gift packaging and our commitment to preserving the authentic flavors of India, earning us a special place in the hearts of sweet lovers everywhere.
                            </p>
                        </motion.div>
                        <motion.div className="w-full md:w-1/2 relative group" variants={fadeUp}>
                            <div className="absolute inset-0 border-2 border-[#D4AF37] -translate-x-4 translate-y-4 rounded-xl opacity-20 group-hover:-translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
                            <img src="https://picsum.photos/800/600?random=12" alt="Our Achievements" className="relative z-10 w-full h-[450px] object-cover rounded-xl shadow-2xl" />
                        </motion.div>
                    </div>

                    {/* Block 3: Our Promise */}
                    <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
                        <motion.div className="w-full md:w-1/2" variants={fadeUp}>
                            <motion.span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.3em] mb-4 block">Commitment</motion.span>
                            <SectionHeading>Our Promise</SectionHeading>
                            <p className="text-[15px] text-gray-600 leading-relaxed max-w-lg mt-8">
                                To us, sweets are more than food; they are emotions. We promise to never compromise on the quality of our ingredients, ensuring every bite is as pure as our name suggests.
                                <br /><br />
                                Whether it's a small celebration or a grand wedding, we promise to deliver the same royal experience that has become synonymous with Ganga Sweets.
                            </p>
                        </motion.div>
                        <motion.div className="w-full md:w-1/2 relative group" variants={fadeUp}>
                            <div className="absolute inset-0 border-2 border-[#D4AF37] translate-x-4 translate-y-4 rounded-xl opacity-20 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
                            <img src="https://picsum.photos/800/600?random=13" alt="Our Promise" className="relative z-10 w-full h-[450px] object-cover rounded-xl shadow-2xl" />
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* SECTION 2: VALUES GRID */}
            <section 
                className="section-padding text-white overflow-hidden relative"
                style={{ backgroundImage: `url(${greenBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <div className="absolute inset-0 bg-green-950/40 pointer-events-none"></div>
                <div className="main-container relative z-10">
                    <div className="text-center mb-16">
                        <motion.span variants={fadeUp} className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.4em] mb-3 block">What We Stand For</motion.span>
                        <h2 className="text-4xl md:text-5xl font-['Cinzel'] uppercase tracking-widest text-white">Our Values</h2>
                        <div className="flex items-center justify-center gap-4 mt-6">
                            <div className="h-[1px] w-20 bg-[#D4AF37]"></div>
                            <div className="text-[#D4AF37] text-xs pb-1">◆</div>
                            <div className="h-[1px] w-20 bg-[#D4AF37]"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Value 1 */}
                        <motion.div className="flex flex-col items-center text-center group" variants={fadeUp}>
                            <div className="w-16 h-16 rounded-full border border-[#D4AF37]/50 flex items-center justify-center mb-8 bg-white/5 group-hover:bg-[#D4AF37] transition-all duration-500">
                                <FiTrendingUp className="text-2xl text-[#D4AF37] group-hover:text-white transition-colors duration-500" />
                            </div>
                            <h3 className="text-xl font-['Cinzel'] font-bold mb-4 tracking-widest uppercase">Creativity</h3>
                            <div className="w-8 h-[1px] bg-[#D4AF37] mb-4"></div>
                            <p className="text-sm text-gray-200 font-light leading-relaxed max-w-xs">
                                Blending traditional techniques with modern presentation to create unique gifting experiences.
                            </p>
                        </motion.div>

                        {/* Value 2 */}
                        <motion.div className="flex flex-col items-center text-center group" variants={fadeUp}>
                            <div className="w-16 h-16 rounded-full border border-[#D4AF37]/50 flex items-center justify-center mb-8 bg-white/5 group-hover:bg-[#D4AF37] transition-all duration-500">
                                <FiShield className="text-2xl text-[#D4AF37] group-hover:text-white transition-colors duration-500" />
                            </div>
                            <h3 className="text-xl font-['Cinzel'] font-bold mb-4 tracking-widest uppercase">Sustainability</h3>
                            <div className="w-8 h-[1px] bg-[#D4AF37] mb-4"></div>
                            <p className="text-sm text-gray-200 font-light leading-relaxed max-w-xs">
                                Commitment to responsible sourcing and eco-friendly packaging for a better future.
                            </p>
                        </motion.div>

                        {/* Value 3 */}
                        <motion.div className="flex flex-col items-center text-center group" variants={fadeUp}>
                            <div className="w-16 h-16 rounded-full border border-[#D4AF37]/50 flex items-center justify-center mb-8 bg-white/5 group-hover:bg-[#D4AF37] transition-all duration-500">
                                <FiHeart className="text-2xl text-[#D4AF37] group-hover:text-white transition-colors duration-500" />
                            </div>
                            <h3 className="text-xl font-['Cinzel'] font-bold mb-4 tracking-widest uppercase">Authenticity</h3>
                            <div className="w-8 h-[1px] bg-[#D4AF37] mb-4"></div>
                            <p className="text-sm text-gray-200 font-light leading-relaxed max-w-xs">
                                Using only 100% pure ghee and natural ingredients to preserve the real taste of Indian heritage.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: NEWSLETTER */}
            <section 
                className="section-padding relative overflow-hidden" 
                style={{ backgroundImage: `url(${pinkBg})`, backgroundSize: 'cover' }}
            >
                <div className="main-container relative z-10">
                    <div className="bg-white/80 backdrop-blur-md p-10 md:p-16 rounded-2xl shadow-2xl border border-white flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                        <div className="w-full lg:w-1/2 flex items-start gap-8">
                            <div className="w-16 h-16 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                                <FiMail className="text-2xl text-[#D4AF37]" />
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-['Cinzel'] font-bold uppercase tracking-widest text-gray-900 mb-3">Our Newsletter!</h2>
                                <p className="text-gray-600 font-light text-[15px]">Subscribe to receive the latest updates, exclusive offers, and festive sweetness directly in your inbox.</p>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2">
                            <form className="flex flex-col sm:flex-row shadow-lg rounded-full overflow-hidden border border-gray-100">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email address" 
                                    className="flex-grow px-8 py-4 bg-white text-sm focus:outline-none"
                                    required
                                />
                                <button className="bg-[#D4AF37] text-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-[#B8962E]">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </motion.div>
    );
};

export default About;