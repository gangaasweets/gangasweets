import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CategorySection = () => {
    const categories = [
        {
            name: "Ganga's Special Mithai",
            image: "https://images.unsplash.com/photo-1589113103503-49ef83d89e7e?q=80&w=2070&auto=format&fit=crop", // placeholder sweet image
            link: "/collections/all?category=Sweets",
            delay: 0,
            x: -50
        },
        {
            name: "Bengali Specialities",
            image: "https://images.unsplash.com/photo-1605192554106-95482659535a?q=80&w=1974&auto=format&fit=crop", // placeholder sweet image
            link: "/collections/all?category=Bengali",
            delay: 0.2,
            x: 50
        }
    ];

    return (
        <section className="py-16 px-4 lg:px-0 mx-4 md:mx-12 overflow-hidden">
            <div className="container mx-auto flex flex-col md:flex-row gap-8">
                {categories.map((cat, idx) => (
                    <motion.div
                        key={idx}
                        className="relative flex-1 group overflow-hidden rounded-xl shadow-lg"
                        initial={{ opacity: 0, x: cat.x }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, delay: cat.delay }}
                    >
                        <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-[500px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-bottom justify-start p-8">
                            <div className="mt-auto">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight drop-shadow-md">
                                    {cat.name}
                                </h2>
                                <Link to={cat.link}
                                    className="inline-block gold-btn px-8 py-3 text-[14px]">
                                    Shop Collection
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;