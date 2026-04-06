import { useEffect, useRef, useState } from "react"
import { FaFilter } from "react-icons/fa";
import { motion } from "framer-motion";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
import MetaHTML from "../components/Common/MetaHTML";
import Breadcrumbs from "../components/Common/Breadcrumbs";

const CollectionPage = () => {
    const { collection } = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const queryParams = Object.fromEntries([...searchParams])

    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
    const collectionTitle = collection === "all" ? "Our Entire Menu" : `${capitalize(collection)} Selection`;

    useEffect(() => {
        dispatch(fetchProductsByFilters({ collection, ...queryParams }))
    }, [dispatch, collection, searchParams])

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Scroll lock when sidebar is open
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isSidebarOpen]);

    // Handle clicks outside sidebar
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setIsSidebarOpen(false);
            }
        };

        if (isSidebarOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSidebarOpen]);

    // Animation variants
    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
    };

    return (
        <motion.div
            className="flex flex-col lg:flex-row"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
        >
            {/* Mobile Filter Button */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden border border-gray-300 p-2 flex justify-center items-center hover:cursor-pointer mb-4"
            >
                <FaFilter className="mr-2" /> Filters
            </button>

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[60] lg:hidden transition-opacity duration-300
    ${isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* Filter Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed inset-y-0 left-0 z-[70] w-64 bg-white overflow-y-auto transform transition-transform duration-300
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:static lg:translate-x-0`}
            >
                <FilterSidebar />
            </div>


            <div className="flex flex-col lg:flex-row relative z-10">
        <motion.div
            className="grow p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <MetaHTML 
                title={collectionTitle}
                description={`Browse our premium ${collectionTitle.toLowerCase()}. Shop authentic pure ghee mithai and namkeen at Ganga Sweets with fast delivery.`}
            />
            <h1 className="premium-separator mt-8">{collectionTitle}</h1>
            <SortOptions />
            <ProductGrid products={products} loading={loading} error={error} />
        </motion.div>
            </div>

        </motion.div>
    );
};



export default CollectionPage;
