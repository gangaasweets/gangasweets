import { IoLogoInstagram } from "react-icons/io"
import { RiTwitterXLine } from "react-icons/ri"
import { TbBrandFiverr, TbBrandMeta } from "react-icons/tb"
import { Link } from "react-router-dom"
import { FiPhoneCall } from "react-icons/fi"
import { FaLinkedin } from "react-icons/fa"
const Footer = () => {
  return (
    <footer className="border-t-[3px] border-[#D4AF37]/50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
        {/* Newsletter Section */}
        <div className="flex flex-col space-y-6">
          <h3 className="text-[15px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] font-['Cinzel']">Join Our Sweet Circle</h3>
          <p className="text-[14px] text-[#777777] leading-relaxed">
            Be the first to hear about new mithai arrivals, festive gift boxes, and exclusive sweet offers.
          </p>
          <div className="flex flex-col space-y-3">
            <p className="text-[13px] font-bold text-[#D4AF37]">
              Sign up and get ₹101 off on your first order.
            </p>
            <form className="flex flex-col sm:flex-row gap-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 w-full text-[14px] border border-[#E5E5E5] focus:outline-none focus:border-[#D4AF37] transition-all rounded-l-full"
                required
              />
              <button
                type="submit"
                className="bg-[#D4AF37] text-white px-6 py-3 text-[13px] font-bold uppercase tracking-widest hover:bg-[#B8962E] transition-all cursor-pointer rounded-r-full whitespace-nowrap"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Shop Links */}
        <div className="flex flex-col space-y-6">
          <h3 className="text-[14px] font-bold text-black uppercase tracking-[0.2em] font-['Cinzel']">Shop</h3>
          <ul className="flex flex-col space-y-4 text-[13px] text-[#777777]">
            <li>
              <Link to="/collections/all?category=Sweets" className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider">Pure Ghee Sweets</Link>
            </li>
            <li>
              <Link to="/collections/all?category=Namkeen" className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider">Savory Namkeen</Link>
            </li>
            <li>
              <Link to="/collections/all?category=Gifts" className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider">Luxury Gift Boxes</Link>
            </li>
            <li>
              <Link to="/collections/all?category=Bakery" className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider">Fresh Bakery</Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="flex flex-col space-y-6">
          <h3 className="text-[14px] font-bold text-black uppercase tracking-[0.2em] font-['Cinzel']">Support</h3>
          <ul className="flex flex-col space-y-4 text-[13px] text-[#777777]">
            <li>
              <Link to="/contact" className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider">Contact Us</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider">About Us</Link>
            </li>
            <li>
              <Link to="/faqs" className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider">FAQs</Link>
            </li>
            <li>
              <Link to="/features" className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider">Features</Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-[#D4AF37] transition-colors uppercase tracking-wider">Blog</Link>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div className="flex flex-col space-y-6">
          <h3 className="text-[14px] font-bold text-black uppercase tracking-[0.2em] font-['Cinzel']">Follow Us</h3>
          <div className="flex items-center space-x-5">
            <a
              href="https://www.fiverr.com/s/Eg7Q8B0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#777777] hover:text-[#D4AF37] transition-colors"
            >
              <TbBrandFiverr className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/_ajyendra?igsh=ZTFvczZuMjZhNHkw"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#777777] hover:text-[#D4AF37] transition-colors"
            >
              <IoLogoInstagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/ajyendra-singh-jadon-10789138a?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#777777] hover:text-[#D4AF37] transition-colors"
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
          </div>
          <div className="pt-2">
            <p className="text-[14px] font-bold text-black mb-3 font-['Cinzel'] tracking-wider">Call Us</p>
            <p className="text-[14px] text-[#777777]">
              <a href="tel: +919897278469" className="hover:text-[#D4AF37] transition-colors font-medium">
                <FiPhoneCall className="inline-block mr-2" />
                +91 98972 - 78469
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto mt-16 pt-8 border-t border-[#E5E5E5]">
        <p className="text-[11px] text-[#777777] text-center tracking-[0.3em] uppercase font-bold">
          &copy; 2026, GANGA SWEETS. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  )
}

export default Footer