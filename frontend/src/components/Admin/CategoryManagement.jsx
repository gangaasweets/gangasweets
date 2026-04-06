import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, createCategory, deleteCategory } from "../../redux/slices/productsSlice";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "sonner";

const CategoryManagement = () => {
    const dispatch = useDispatch();
    const { categories, loading, error } = useSelector((state) => state.products);
    const [newCategory, setNewCategory] = useState({ name: "", description: "" });

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!newCategory.name.trim()) {
            toast.error("Category name is required");
            return;
        }

        try {
            await dispatch(createCategory(newCategory)).unwrap();
            setNewCategory({ name: "", description: "" });
            toast.success("Category created successfully");
        } catch (err) {
            toast.error(err.message || "Failed to create category");
        }
    };

    const handleDeleteCategory = async (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            try {
                await dispatch(deleteCategory(id)).unwrap();
                toast.success("Category deleted");
            } catch (err) {
                toast.error(err.message || "Failed to delete category");
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-3xl font-bold mb-8 font-['Cinzel'] text-[#D4AF37]">Category Management</h2>

            {/* Add Category Form */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-10"
            >
                <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
                <form onSubmit={handleAddCategory} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Category Name (e.g. Sweets)"
                            className="p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#D4AF37] outline-none"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Brief Description"
                            className="p-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#D4AF37] outline-none"
                            value={newCategory.description}
                            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-2 bg-[#D4AF37] text-white px-6 py-3 rounded-lg hover:bg-[#B8962E] transition-all font-bold w-full md:w-auto"
                    >
                        <FiPlus /> Add Category
                    </button>
                </form>
            </motion.div>

            {/* Categories List */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600 uppercase text-xs tracking-wider">Name</th>
                            <th className="p-4 font-semibold text-gray-600 uppercase text-xs tracking-wider">Description</th>
                            <th className="p-4 font-semibold text-gray-600 uppercase text-xs tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-medium text-gray-800 capitalize">{category.name}</td>
                                <td className="p-4 text-gray-500 text-sm">{category.description || "-"}</td>
                                <td className="p-4 text-right">
                                    <button
                                        onClick={() => handleDeleteCategory(category._id)}
                                        className="text-red-500 hover:text-red-700 p-2 transition-colors"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {categories.length === 0 && !loading && (
                            <tr>
                                <td colSpan="3" className="p-10 text-center text-gray-400">No categories found. Add one above.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryManagement;
