import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

// Static Assets
import hero1 from "../../assets/1st hero image.webp";
import hero2 from "../../assets/2nd hero image.webp";
import hero3 from "../../assets/3rd hero image.webp";
import hero4 from "../../assets/4th hero image.webp";
import greenTexture from "../../assets/greenTexture.webp";
import pinkTexture from "../../assets/pinkTexture.webp";

const slides = [
  {
    id: 1,
    image: hero1,
    type: "full",
    title: "The Royalty of Traditional Mithai",
    subtitle: "Experience the pure bliss of authentic Indian sweets crafted with love and tradition.",
    textColor: "text-[#D4AF37]",
    btnText: "Explore Collection",
  },
  {
    id: 2,
    image: hero2,
    background: greenTexture,
    type: "split",
    title: "Pure Ghee Delights",
    subtitle: "Savor the rich aroma and taste of our premium ghee-based sweets.",
    textColor: "text-white",
    btnText: "Shop Now",
  },
  {
    id: 3,
    image: hero3,
    background: pinkTexture,
    type: "split",
    title: "Festive Gift Boxes",
    subtitle: "Perfectly curated collections for your loved ones this festive season.",
    textColor: "text-[#D4AF37]",
    btnText: "Shop Now",
  },
  {
    id: 4,
    image: hero4,
    background: pinkTexture,
    type: "split",
    title: "Authentic Bengali Sweets",
    subtitle: "Authentic Chhena based sweets delivered fresh to your doorstep.",
    textColor: "text-[#D4AF37]",
    btnText: "Shop Now",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { settings } = useSelector((state) => state.siteSettings);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <>
      <section className="relative h-[600px] md:h-[600px] lg:h-[750px] overflow-hidden bg-[#FFF8E7]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            {slides[currentSlide].type === "full" ? (
              // Full Image Slide (Slide 1)
              <div className="relative w-full h-full">
                <motion.img
                  src={slides[currentSlide].image}
                  alt="Ganga Sweets Hero"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 6, ease: "linear" }}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-center p-6">
                  <div className="max-w-4xl">
                    <motion.h1
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className={`text-4xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter mb-4 ${slides[currentSlide].textColor} drop-shadow-2xl`}
                    >
                      {slides[currentSlide].title}
                    </motion.h1>
                    <motion.p
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="text-white text-lg md:text-2xl mb-8 font-light tracking-wide max-w-2xl mx-auto"
                    >
                      {slides[currentSlide].subtitle}
                    </motion.p>
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                    >
                      <Link to="/collections/all" className="gold-btn inline-block">
                        {slides[currentSlide].btnText}
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            ) : (
              // Split Content Slide (Slide 2, 3, 4)
              <div
                className="flex flex-col md:flex-row w-full h-full items-center"
                style={{
                  backgroundImage: `url(${slides[currentSlide].background})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Left Side - Image */}
                <div className="w-full md:w-1/2 h-[45%] md:h-full flex items-center justify-center p-6 md:p-12">
                  <motion.div
                    initial={{ x: -50, opacity: 0, scale: 0.9 }}
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative group w-full h-full max-w-sm lg:max-w-lg"
                  >
                    <div className="absolute inset-0 border-2 border-[#D4AF37] translate-x-3 translate-y-3 rounded-2xl group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
                    <img
                      src={slides[currentSlide].image}
                      alt="Product"
                      className="relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl"
                    />
                  </motion.div>
                </div>

                {/* Right Side - Content */}
                <div className="w-full md:w-1/2 h-[55%] md:h-full flex flex-col justify-start md:justify-center items-center md:items-start p-6 md:p-16 text-center md:text-left">
                  <motion.h2
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`text-3xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter mb-4 ${slides[currentSlide].textColor}`}
                  >
                    {slides[currentSlide].title}
                  </motion.h2>
                  <motion.p
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className={`${slides[currentSlide].id === 2 ? 'text-gray-100' : 'text-gray-700'} text-base md:text-xl mb-6 max-w-md font-medium leading-relaxed`}
                  >
                    {slides[currentSlide].subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <Link
                      to="/collections/all"
                      className={`${slides[currentSlide].id === 2 ? 'bg-white text-green-900 hover:bg-gray-100' : 'gold-btn'} py-2.5 md:py-4 px-8 md:px-12 text-sm md:text-lg inline-block rounded-full shadow-lg transition-all font-bold tracking-widest uppercase`}
                    >
                      {slides[currentSlide].btnText}
                    </Link>
                  </motion.div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Navigation Dots - Moved outside hero container */}
      <div className="flex justify-center space-x-3 py-8 bg-[#FFF8E7]">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${currentSlide === index
                ? "bg-[#D4AF37] w-12 h-2.5"
                : "bg-gray-300 hover:bg-gray-400 w-2.5 h-2.5"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
};

export default Hero;
