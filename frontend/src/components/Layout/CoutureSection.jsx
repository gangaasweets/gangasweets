import React from 'react';
import cate1 from "../../assets/cate1.webp";
import cate2 from "../../assets/cate2.webp";
import cate3 from "../../assets/cate3.webp";
import bg from "../../assets/pinkTexture2.webp";

const CoutureSection = () => {
    const categories = [
        { title: "Wedding Gifting", image: cate1, path: "/collections/all?category=Gifts" },
        { title: "Mithai", image: cate2, path: "/collections/all?category=Sweets" },
        { title: "Gift Packs", image: cate3, path: "/collections/all?category=Gifts" },
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
        <section 
            className="py-16 md:py-24 border-t-[10px] border-b-[10px] border-[#b08d57]"
            style={{ 
                backgroundImage: `url(${bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="main-container">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-['Cinzel'] tracking-[0.2em] text-[#b08d57] mb-4 uppercase">
                        OUR COUTURE
                    </h2>
                    <Separator />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {categories.map((item, index) => (
                        <div key={index} className="group relative">
                            {/* Image with golden lines */}
                            <div className="relative overflow-hidden border-t-4 border-b-4 border-[#b08d57]">
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"></div>
                            </div>

                            {/* Label */}
                            <div className="mt-6 text-center">
                                <h3 className="text-xl md:text-2xl font-['Cinzel'] font-bold tracking-widest text-gray-800 uppercase">
                                    {item.title}
                                </h3>
                                <div className="mt-2 w-0 h-[1px] bg-[#b08d57] mx-auto group-hover:w-24 transition-all duration-300"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoutureSection;
