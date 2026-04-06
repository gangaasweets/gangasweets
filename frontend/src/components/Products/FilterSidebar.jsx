import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom"
import { SidebarFilterSkeleton } from "../Common/Skeleton";
import { fetchCategories } from "../../redux/slices/productsSlice";

const FilterSidebar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()

    const [filters, setFilters] = useState({
        category: "",
        subCategory: "",
        isSugarFree: false,
        productType: "",
        minPrice: 0,
        maxPrice: 2000,
    });

    const [priceRange, setPriceRange] = useState([0, 2000]);

    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.products);

    const [loading, setLoading] = useState(categories.length === 0);

    const productTypes = ["Standard", "Simple"];

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(fetchCategories());
        }
    }, [dispatch, categories.length]);

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);
        setFilters({
            category: params.category || "",
            subCategory: params.subCategory || "",
            isSugarFree: params.isSugarFree === "true",
            productType: params.productType || "",
            minPrice: params.minPrice || 0,
            maxPrice: params.maxPrice || 2000,
        });
        setPriceRange([0, params.maxPrice || 2000]);

        if (categories.length > 0) {
            setLoading(false);
        }
    }, [searchParams, categories.length])

    const handleFilterChange = (e) => {
        const { name, value, checked, type } = e.target;
        let newFilters = { ...filters };

        if (type === "checkbox") {
            if (checked) {
                newFilters[name] = [...(newFilters[name] || []), value]
            } else {
                newFilters[name] = newFilters[name].filter((item) => item !== value);
            }
        } else {
            newFilters[name] = value;
        }
        setFilters(newFilters);
        updateURLParams(newFilters)
    }


    const updateURLParams = (newFilters) => {
        const params = new URLSearchParams();
        Object.keys(newFilters).forEach((key) => {
            if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
                params.append(key, newFilters[key].join(","));
            } else if (newFilters[key]) {
                params.append(key, newFilters[key]);
            }
        });
        setSearchParams(params)
        navigate(`?${params.toString()}`)
    }

    const handlePriceChange = (e) => {
        const newPrice = e.target.value;
        setPriceRange([0, newPrice])
        const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice }
        setFilters(newFilters)
        updateURLParams(newFilters)
    }


    if (loading) {
        return <div className="bg-gray-50 h-full"><SidebarFilterSkeleton /></div>
    }

    return (
        <div className="p-6 bg-gray-50 h-full overflow-y-auto min-h-[600px]">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-[16px] font-medium tracking-tight">Filters</h3>
                <button
                    onClick={() => {
                        setFilters({
                            category: "",
                            subCategory: "",
                            isSugarFree: false,
                            productType: "",
                            minPrice: 0,
                            maxPrice: 2000,
                        });
                        setSearchParams({});
                    }}
                    className="flex items-center gap-2 text-xs font-medium 
             px-3 py-1.5 rounded-full 
             bg-gray-200 hover:bg-black hover:text-white 
             transition-all duration-200"
                >
                    Clear All
                </button>
            </div>

            {/* CATEGORY */}
            <div className="mb-8 border-b pb-6">
                <h4 className="text-[13px] font-medium uppercase tracking-tight mb-4 text-gray-700">
                    Category
                </h4>
                <div className="space-y-3">
                    {categories.map((category) => (
                        <label key={category._id || category.name} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="radio"
                                name="category"
                                value={category.name.toLowerCase()}
                                onChange={handleFilterChange}
                                checked={filters.category === category.name.toLowerCase()}
                                className="w-4 h-4 accent-black"
                            />
                            <span className="text-[13px] text-gray-600 group-hover:text-black transition capitalize">
                                {category.name}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* SUGAR FREE */}
            <div className="mb-8 border-b pb-6">
                <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-[14px] font-medium text-gray-700 group-hover:text-black">Sugar Free Only</span>
                    <div className="relative">
                        <input
                            type="checkbox"
                            name="isSugarFree"
                            checked={filters.isSugarFree}
                            onChange={(e) => {
                                const newFilters = { ...filters, isSugarFree: e.target.checked };
                                setFilters(newFilters);
                                updateURLParams(newFilters);
                            }}
                            className="sr-only peer"
                        />
                        <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                    </div>
                </label>
            </div>

            {/* PRODUCT TYPE */}
            <div className="mb-8 border-b pb-6">
                <h4 className="text-[13px] font-medium uppercase tracking-tight mb-4 text-gray-700">
                    Product Type
                </h4>
                <div className="space-y-3">
                    {productTypes.map((type) => (
                        <label key={type} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="radio"
                                name="productType"
                                value={type.toLowerCase()}
                                onChange={handleFilterChange}
                                checked={filters.productType === type.toLowerCase()}
                                className="w-4 h-4 accent-[#D4AF37]"
                            />
                            <span className="text-[13px] text-gray-600 group-hover:text-black transition">
                                {type}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* PRICE */}
            <div className="mb-8">
                <h4 className="text-[13px] font-medium uppercase tracking-tight mb-4 text-gray-700">
                    Price
                </h4>

                <input
                    type="range"
                    min={0}
                    max={2000}
                    step={50}
                    value={priceRange[1]}
                    onChange={handlePriceChange}
                    className="w-full accent-[#D4AF37]"
                />

                <div className="flex justify-between text-[13px] text-gray-600 mt-3">
                    <span>₹0</span>
                    <span className="text-[13px] font-medium">₹{priceRange[1]}</span>
                </div>
            </div>
        </div>
    );



}

export default FilterSidebar