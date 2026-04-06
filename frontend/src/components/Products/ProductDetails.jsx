import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";
import { ProductDetailsSkeleton } from "../Common/Skeleton";
import MetaHTML from "../Common/MetaHTML";
import SchemaMarkup from "../Common/SchemaMarkup";
import Breadcrumbs from "../Common/Breadcrumbs";


const ProductDetails = ({ productId }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct, loading, error, similarProducts } = useSelector(
        (state) => state.products
    )
    const { user, guestId } = useSelector((state) => state.auth)
    const [mainImage, setMainImage] = useState("");
    const [selectedWeight, setSelectedWeight] = useState("1kg"); // Default to 1kg
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const productFetchId = productId || id;

    useEffect(() => {
        if (productFetchId) {
            dispatch(fetchProductDetails(productFetchId));
            dispatch(fetchSimilarProducts({ id: productFetchId }));
        }
    }, [dispatch, productFetchId]);

    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setMainImage(selectedProduct.images[0].url);
        }
        if (selectedProduct?.productType === "standard") {
            setSelectedWeight("1kg");
        } else {
            setSelectedWeight("one unit");
        }
    }, [selectedProduct]);

    const handleQuantityChange = (action) => {
        if (action === "plus") setQuantity((prev) => prev + 1);
        if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
    };

    const handleAddToCart = () => {
        if (selectedProduct?.productType === "standard" && !selectedWeight) {
            toast.error("Please select weight before adding to cart.", {
                duration: 1000,
            });
            return;
        }

        setIsButtonDisabled(true);

        dispatch(
            addToCart({
                productId: productFetchId,
                quantity,
                selectedWeight: selectedWeight,
                guestId,
                userId: user?._id,
            })
        )
            .then(() => {
                toast.success("Added to cart!", {
                    duration: 1000,
                })
            })
            .finally(() => {
                setIsButtonDisabled(false);
            })
    };

    const getDisplayPrice = () => {
        if (!selectedProduct) return 0;
        let price = selectedProduct.basePrice || selectedProduct.price;
        if (selectedProduct.productType === "standard") {
            if (selectedWeight === "500g") return (price / 2).toFixed(2);
            if (selectedWeight === "250g") return (price / 4).toFixed(2);
        }
        return price;
    };

    // Helper to optimize Cloudinary URLs
    const optimizeCloudinaryUrl = (url) => {
        if (!url || !url.includes("cloudinary.com")) return url;
        if (url.includes("/upload/")) {
            return url.replace("/upload/", "/upload/f_auto,q_auto/");
        }
        return url;
    };

    const productSchema = selectedProduct ? {
        name: selectedProduct.name,
        image: selectedProduct.images?.map(img => img.url),
        description: selectedProduct.description,
        brand: {
            "@type": "Brand",
            name: selectedProduct.brand || "Ganga Sweets"
        },
        offers: {
            "@type": "Offer",
            url: window.location.href,
            priceCurrency: "INR",
            price: selectedProduct.basePrice || selectedProduct.price,
            availability: selectedProduct.countInStock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        }
    } : null;

    if (loading) {
        return <ProductDetailsSkeleton />
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">Error: {error}</div>
    }

    return (
        <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {selectedProduct && (
                <>
                    <MetaHTML 
                        title={selectedProduct.name}
                        description={selectedProduct.description?.substring(0, 160)}
                        ogImage={selectedProduct.images?.[0]?.url}
                        ogType="product"
                    />
                    <SchemaMarkup type="Product" data={productSchema} />
                    <div className="max-w-6xl mx-auto bg-white p-4 sm:p-6 rounded-lg">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Left Thumbnails */}
                            <div className="hidden md:flex flex-col space-y-3 mr-4">
                                {selectedProduct.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={optimizeCloudinaryUrl(image.url)}
                                        alt={image.altText || `${selectedProduct.name} Thumbnail ${index}`}
                                        loading="lazy"
                                        className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" : "border-[#E5E5E5]"}`}
                                        onClick={() => setMainImage(image.url)}
                                    />
                                ))}
                            </div>
                            {/* Main Image */}
                            <div className="md:w-1/2">
                                <div className="mb-4">
                                    <img
                                        src={optimizeCloudinaryUrl(mainImage)}
                                        alt={selectedProduct.name}
                                        loading="eager"
                                        className="w-full h-auto object-cover rounded-lg shadow-sm"
                                    />
                                </div>
                            </div>
                            {/* Mobile Thumbnail */}
                            <div className="md:hidden flex overflow-x-auto space-x-3 mb-6">
                                {selectedProduct.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={optimizeCloudinaryUrl(image.url)}
                                        alt={image.altText || `${selectedProduct.name} Mobile Thumbnail ${index}`}
                                        loading="lazy"
                                        className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" : "border-[#E5E5E5]"}`}
                                        onClick={() => setMainImage(image.url)}
                                    />
                                ))}
                            </div>

                            {/* Right Side */}
                            <div className="md:w-1/2 md:ml-6 flex flex-col space-y-6">
                                <div>
                                    <h1 className="text-[28px] font-medium text-gray-900 mb-2 uppercase tracking-tight">
                                        {selectedProduct.name}
                                    </h1>

                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {selectedProduct.isBestSeller && (
                                            <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Best Seller</span>
                                        )}
                                        {selectedProduct.isPremium && (
                                            <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Premium</span>
                                        )}
                                        {selectedProduct.isSugarFree && (
                                            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Sugar Free</span>
                                        )}
                                    </div>

                                    <div className="flex items-center space-x-2 text-[24px]">
                                        <span className="text-[#D4AF37] font-semibold">
                                            ₹{getDisplayPrice()}
                                        </span>
                                        {selectedProduct.productType === "standard" && (
                                            <span className="text-[12px] text-gray-400 font-normal">
                                                (for {selectedWeight})
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <p className="text-[14px] text-gray-600 leading-relaxed">
                                    {selectedProduct.description}
                                </p>

                                <div className="space-y-4">
                                    {selectedProduct.productType === "standard" && (
                                        <div>
                                            <p className="text-[13px] font-medium text-gray-900">Select Weight:</p>
                                            <div className="flex gap-3 mt-2">
                                                {["250g", "500g", "1kg"].map((weight) => (
                                                    <button
                                                        key={weight}
                                                        onClick={() => setSelectedWeight(weight)}
                                                        className={`flex-1 py-3 border border-[#E5E5E5] rounded-md text-[13px] font-medium transition-all cursor-pointer ${selectedWeight === weight ? "border-[#D4AF37] bg-[#FFF8E7] text-[#D4AF37]" : "hover:bg-gray-50 text-gray-600"}`}
                                                    >
                                                        {weight}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <p className="text-[13px] font-medium text-gray-900">Quantity:</p>
                                        <div className="flex items-center space-x-4 mt-2">
                                            <button onClick={() => handleQuantityChange("minus")} className="px-3 py-1 bg-gray-100 rounded text-[13px] hover:cursor-pointer transition">
                                                -
                                            </button>
                                            <span className="text-[13px] font-medium">{quantity}</span>
                                            <button onClick={() => handleQuantityChange("plus")} className="px-3 py-1 bg-gray-100 rounded text-[13px] hover:cursor-pointer transition">
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={isButtonDisabled}
                                        className={`bg-[#D4AF37] text-white py-4 px-5 rounded-md w-full text-[14px] font-bold tracking-wide shadow-md transition-all ${isButtonDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-[#B8962E] cursor-pointer"}`}>
                                        {isButtonDisabled ? "ADDING TO CART..." : "ADD TO CART"}
                                    </button>
                                </div>

                                <div className="pt-6 border-t border-[#E5E5E5] flex flex-col space-y-4">
                                    <h3 className="text-[13px] font-medium text-gray-900">Characteristics:</h3>
                                    <div className="space-y-2">
                                        {selectedProduct.category && (
                                            <p className="text-[13px] text-gray-600">
                                                <span className="font-medium text-gray-900">Category:</span> {selectedProduct.category}
                                            </p>
                                        )}
                                        {selectedProduct.subCategory && (
                                            <p className="text-[13px] text-gray-600">
                                                <span className="font-medium text-gray-900">Type:</span> {selectedProduct.subCategory}
                                            </p>
                                        )}
                                        <p className="text-[13px] text-gray-600">
                                            <span className="font-medium text-gray-900">Sugar Free:</span> {selectedProduct.isSugarFree ? "Yes" : "No"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <motion.div
                            className="mt-20"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-[18px] text-center font-medium mb-4">
                                You May Also Like
                            </h2>
                            <ProductGrid products={similarProducts} loading={loading} error={error} />
                        </motion.div>
                    </div>
                </>
            )}
        </motion.div>
    );
};

export default ProductDetails;