import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Layout/Hero"
import CoutureSection from "../components/Layout/CoutureSection";
import HampersSection from "../components/Layout/HampersSection";
import PromoSection from "../components/Layout/PromoSection";
import BlogSection from "../components/Layout/BlogSection";
import TestimonialsSection from "../components/Layout/TestimonialsSection";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import CategorySection from "../components/Products/CategorySection";
import NewArrival from "../components/Products/NewArrival";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
import axios from "axios";
import { ProductDetailsSkeleton } from "../components/Common/Skeleton";
import MetaHTML from "../components/Common/MetaHTML";
import SchemaMarkup from "../components/Common/SchemaMarkup";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // Fetch products for a specific collection
    dispatch(
      fetchProductsByFilters({
        category: "Sweets",
        limit: 8,
      })
    );
    // Fetch Best seller products
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
  };

  const organizationSchema = {
    name: "Ganga Sweets",
    url: window.location.origin,
    logo: `${window.location.origin}/logo.png`,
    description: "Ganga Sweets - Premium Pure Ghee Sweets, Namkeen & Gifting in Etah.",
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <MetaHTML
        title="Ganga Sweets - Pure Ghee Mithai & Premium Bakery"
        description="Indulge in the royalty of Ganga Sweets. Shop authentic pure ghee mithai, namkeen, and luxury gift boxes with nationwide delivery."
      />
      <SchemaMarkup type="Organization" data={organizationSchema} />
      <Hero />
      <CoutureSection />
      <HampersSection />
      <PromoSection />
      <BlogSection />
      <TestimonialsSection />
      <NewArrival />
    </motion.div>
  );
};

export default Home;