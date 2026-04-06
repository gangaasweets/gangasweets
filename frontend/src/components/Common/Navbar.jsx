import { Link, useLocation } from "react-router-dom";
import { HiOutlineUser, HiOutlineShoppingBag, HiBars3BottomRight, HiChevronDown } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/ganga sweets.webp";
import { fetchCategories } from "../../redux/slices/productsSlice";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const location = useLocation();

  const cartItemCount = cart?.products?.reduce((total, product) => total + product.quantity, 0) || 0;

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  const toggleNavDrawer = () => setNavDrawerOpen(!navDrawerOpen);
  const toggleCartDrawer = () => setDrawerOpen(!drawerOpen);

  const navLinks = [
    { name: "About Us", path: "/about" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6 relative z-50">
        {/* Left - Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Ganga Sweets" className="h-12 md:h-8 w-auto object-contain" />
          </Link>
        </div>

        {/* Center - Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {/* Shop Dropdown */}
          <div
            className="relative group py-2"
            onMouseEnter={() => setShopDropdownOpen(true)}
            onMouseLeave={() => setShopDropdownOpen(false)}
          >
            <button className={`flex items-center text-sm font-semibold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${location.pathname.startsWith('/collections') ? 'text-[#D4AF37]' : 'text-gray-700 hover:text-[#D4AF37]'}`}>
              Shop <HiChevronDown className={`ml-1 transition-transform duration-200 ${shopDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {shopDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 mt-0 w-48 bg-white border border-gray-100 shadow-xl rounded-md overflow-hidden z-50"
                >
                  <div className="py-2">
                    <Link
                      to="/collections/all"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors"
                      onClick={() => setShopDropdownOpen(false)}
                    >
                      All Products
                    </Link>
                    <div className="border-t border-gray-50 my-1"></div>
                    {categories.map((category) => (
                      <Link
                        key={category._id || category.name}
                        to={`/collections/all?category=${category.name.toLowerCase()}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#D4AF37] transition-colors capitalize"
                        onClick={() => setShopDropdownOpen(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${isActive(link.path) ? 'text-[#D4AF37]' : 'text-gray-700 hover:text-[#D4AF37]'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right icons */}
        <div className="flex items-center space-x-1 md:space-x-4">
          {user && user.role === "admin" && (
            <Link to="/admin" className="hidden lg:block bg-black px-3 py-1 rounded text-xs text-white uppercase tracking-tighter hover:bg-[#D4AF37] transition-colors">
              Admin
            </Link>
          )}

          {/* Search */}
          <div className="relative">
            <SearchBar />
          </div>

          <Link to="/profile" className="p-2 text-gray-700 hover:text-[#D4AF37] transition-colors">
            <HiOutlineUser className="h-6 w-6" />
          </Link>

          <button onClick={toggleCartDrawer} className="relative p-2 text-gray-700 hover:text-[#D4AF37] transition-colors cursor-pointer">
            <HiOutlineShoppingBag className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#D4AF37] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          <button onClick={toggleNavDrawer} className="md:hidden p-2 text-gray-700 hover:text-[#D4AF37] cursor-pointer">
            <HiBars3BottomRight className="h-7 w-7" />
          </button>
        </div>
      </nav>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile navigation */}
      <AnimatePresence>
        {navDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-[60]"
              onClick={toggleNavDrawer}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 w-3/4 sm:w-1/2 h-full bg-white shadow-2xl z-[70] overflow-y-auto"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <img src={logo} alt="Logo" className="h-10 w-auto" />
                <button onClick={toggleNavDrawer}>
                  <IoMdClose className="h-7 w-7 text-gray-500 hover:text-black" />
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Explore Ganga Sweets</h3>
                <nav className="flex flex-col space-y-6">
                  {/* Shop Section in Mobile */}
                  <div>
                    <span className="block text-lg font-bold text-gray-800 mb-4 border-l-4 border-[#D4AF37] pl-3">Our Menu</span>
                    <div className="flex flex-col space-y-3 pl-4 border-l border-gray-100">
                      <Link
                        to="/collections/all"
                        onClick={toggleNavDrawer}
                        className="text-gray-600 hover:text-[#D4AF37]"
                      >
                        All Categories
                      </Link>
                      {categories.map((cat) => (
                        <Link
                          key={cat._id || cat.name}
                          to={`/collections/all?category=${cat.name.toLowerCase()}`}
                          onClick={toggleNavDrawer}
                          className="text-gray-600 hover:text-[#D4AF37] capitalize"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={toggleNavDrawer}
                      className={`text-lg font-bold border-b border-gray-50 pb-2 ${isActive(link.path) ? 'text-[#D4AF37]' : 'text-gray-800 hover:text-[#D4AF37]'}`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  {user && user.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={toggleNavDrawer}
                      className="text-lg font-bold border-b border-gray-50 pb-2 text-red-600 hover:text-[#D4AF37]"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
