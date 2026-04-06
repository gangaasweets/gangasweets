import { HiCheckBadge, HiClock, HiTruck } from "react-icons/hi2"
import { motion } from "framer-motion"

const FeaturesSection = () => {
    return (
        <section className="py-16 px-4 bg-white">
            <motion.div
                className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.2 }
                    }
                }}
            >
                {/* Feature 1 */}
                <motion.div
                    className="flex flex-col items-center group hover:scale-105 transition-transform duration-300"
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                >
                    <div className="p-4 rounded-full mb-4 bg-[#FFF8E7] group-hover:bg-[#F8C8DC] transition-colors">
                        <HiCheckBadge className="text-2xl text-[#D4AF37]" />
                    </div>
                    <h4 className="tracking-tight mb-2 font-bold text-[14px] uppercase">
                        Pure Ghee & Quality
                    </h4>
                    <p className="text-gray-600 text-[13px] tracking-tight">
                        Crafted with premium ingredients and traditional recipes.
                    </p>
                </motion.div>
                {/* Feature 2 */}
                <motion.div
                    className="flex flex-col items-center group hover:scale-105 transition-transform duration-300"
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                >
                    <div className="p-4 rounded-full mb-4 bg-[#FFF8E7] group-hover:bg-[#F8C8DC] transition-colors">
                        <HiClock className="text-2xl text-[#D4AF37]" />
                    </div>
                    <h4 className="tracking-tight mb-2 font-bold text-[14px] uppercase">
                        Freshness Guaranteed
                    </h4>
                    <p className="text-gray-600 text-[13px] tracking-tight">
                        Prepared fresh daily for the perfect taste and texture.
                    </p>
                </motion.div>
                {/* Feature 3 */}
                <motion.div
                    className="flex flex-col items-center group hover:scale-105 transition-transform duration-300"
                    variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                >
                    <div className="p-4 rounded-full mb-4 bg-[#FFF8E7] group-hover:bg-[#F8C8DC] transition-colors">
                        <HiTruck className="text-2xl text-[#D4AF37]" />
                    </div>
                    <h4 className="tracking-tight mb-2 font-bold text-[14px] uppercase">
                        Express Local Delivery
                    </h4>
                    <p className="text-gray-600 text-[13px] tracking-tight">
                        Same day delivery available for local Etah orders.
                    </p>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default FeaturesSection