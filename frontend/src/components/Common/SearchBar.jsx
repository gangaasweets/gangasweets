import { useState, useEffect, useRef } from "react"
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductsByFilters, setFilters } from "../../redux/slices/productsSlice";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const searchRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handle clicks outside to close suggestions
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Fetch suggestions
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm.trim().length >= 2) {
                setIsLoading(true);
                try {
                    const response = await axios.get(
                        `${import.meta.env.VITE_BACKEND_URL}/api/products?search=${searchTerm}&limit=5`
                    );
                    setSuggestions(response.data);
                    setShowSuggestions(true);
                } catch (error) {
                    console.error("Error fetching suggestions:", error);
                    setSuggestions([]);
                    setShowSuggestions(false);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        };

        const debounceTimer = setTimeout(fetchSuggestions, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchTerm]);

    const handleSearchToggle = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            setSearchTerm("");
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            dispatch(setFilters({ search: searchTerm }))
            dispatch(fetchProductsByFilters({ search: searchTerm }))
            navigate(`/collections/all?search=${searchTerm}`)
            setIsOpen(false);
            setShowSuggestions(false);
        }
    }

    const handleSuggestionClick = (id) => {
        navigate(`/product/${id}`);
        setIsOpen(false);
        setShowSuggestions(false);
        setSearchTerm("");
    };

    return (
        <div ref={searchRef} className={`flex items-center justify-center transition-all duration-300 ${isOpen ? "fixed top-0 left-0 w-full bg-white h-24 z-[100] shadow-md" : "w-auto"} `}>
            {isOpen ? (
                <form onSubmit={handleSearch} className="relative flex items-center justify-center w-full px-4">
                    <div className="relative w-full max-w-2xl">
                        <input
                            type="text"
                            placeholder="Search for sweets, snacks or more..."
                            value={searchTerm}
                            autoFocus
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-50 px-6 py-3 pl-12 pr-12 rounded-full border border-gray-200 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] w-full text-gray-800 transition-all font-medium"
                        />
                        {/* Search icon */}
                        <button type="submit" className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#D4AF37] cursor-pointer">
                            <HiMagnifyingGlass className="h-6 w-6" />
                        </button>

                        {/* Suggestions Dropdown */}
                        <AnimatePresence>
                            {showSuggestions && (suggestions.length > 0 || isLoading) && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[110]"
                                >
                                    {isLoading ? (
                                        <div className="p-4 text-center text-gray-500 text-sm italic">Searching...</div>
                                    ) : suggestions.length > 0 ? (
                                        <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                                            {suggestions.map((product) => (
                                                <div 
                                                    key={product._id}
                                                    onClick={() => handleSuggestionClick(product._id)}
                                                    className="flex items-center p-3 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                                                >
                                                    <img 
                                                        src={product.images[0]?.url} 
                                                        alt={product.name} 
                                                        className="w-12 h-12 object-cover rounded-md"
                                                    />
                                                    <div className="ml-4 flex-grow">
                                                        <h4 className="text-sm font-semibold text-gray-800 truncate">{product.name}</h4>
                                                        <p className="text-xs text-gray-500 capitalize">{product.category}</p>
                                                    </div>
                                                    <div className="text-sm font-bold text-[#D4AF37]">
                                                        ₹{product.price}
                                                    </div>
                                                </div>
                                            ))}
                                            <div 
                                                onClick={handleSearch}
                                                className="p-3 text-center text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-[#D4AF37] cursor-pointer bg-gray-50/50"
                                            >
                                                See all results for "{searchTerm}"
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="p-4 text-center text-gray-500 text-sm italic">No products found "{searchTerm}"</div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    {/* close button */}
                    <button
                        type="button"
                        onClick={handleSearchToggle}
                        className="ml-4 p-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-100">
                        <HiMiniXMark className="h-7 w-7" />
                    </button>
                </form>
            ) : (
                <button onClick={handleSearchToggle} className="p-2 text-gray-700 hover:text-[#D4AF37] transition-colors cursor-pointer">
                    <HiMagnifyingGlass className="h-6 w-6" />
                </button>
            )}
        </div>
    );
};

export default SearchBar;