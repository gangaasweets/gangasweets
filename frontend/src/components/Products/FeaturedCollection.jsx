import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import featured from "../../assets/featured.webp"

const FeaturedCollection = () => {
    return (
        <section className="py-1 px-4 lg:px-0 m-12">
            <div className="container flex flex-col-reverse lg:flex-row items-center bg-[#FFF8E7] rounded-3xl overflow-hidden border border-[#D4AF37]/20 shadow-inner">
                {/* Left Content */}
                <motion.div
                    className="lg:w-1/2 p-8 text-center lg:text-left"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-lg font-bold text-[#D4AF37] mb-2 uppercase tracking-[0.2em]">
                        Authentic & Pure
                    </h2>
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">The Royal Selection</h2>
                    <p className="text-gray-500 text-lg mb-6 max-w-lg">
                        Indulge in our most celebrated sweets and festive gift boxes, curated for royalty.
                    </p>
                    <Link to="/collections/all" className="bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800 hover:scale-105 inline-block transition-transform duration-300">
                        Show Now
                    </Link>
                </motion.div>
                {/* Right Content */}
                <motion.div
                    className="lg:w-1/2"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <img
                        src={featured}
                        alt="Ganga Sweets Special Selection"
                        loading="lazy"
                        className="w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl hover:scale-105 transition-transform duration-700"
                    />
                </motion.div>
            </div>
        </section>
    )
}

export default FeaturedCollection