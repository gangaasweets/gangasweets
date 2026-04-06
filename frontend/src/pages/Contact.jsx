import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { contactSupport } from '../redux/slices/authSlice';
import MetaHTML from '../components/Common/MetaHTML';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(contactSupport(formData))
            .unwrap()
            .then(() => {
                toast.success("Thank you! Your message has been sent successfully.");
                setFormData({ name: '', email: '', message: '' });
            })
            .catch((err) => {
                toast.error(err.message || "Failed to send message.");
            });
    };

    const pageVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <motion.div
            className="bg-white text-gray-900 min-h-screen py-16"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
        >
            <MetaHTML 
                title="Contact Us - Customer Support & Inquiries"
                description="Get in touch with Ganga Sweets. Reach out for any questions, support, or bulk order inquiries. We're here to help you with your sweet gifting needs."
            />
            <div className="container mx-auto px-4 lg:px-8 max-w-6xl">

                {/* HEADER */}
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={sectionVariants}
                >
                    <h1 className="text-3xl md:text-4xl font-['Cinzel'] font-bold mb-3 text-[#D4AF37] uppercase tracking-wider">
                        Contact Us
                    </h1>
                    <p className="text-[14px] text-gray-600 max-w-xl mx-auto leading-relaxed font-light">
                        We'd love to hear from you. Please fill out the form below or reach out using the contact details provided.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

                    {/* FORM */}
                    <motion.div
                        className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={sectionVariants}
                    >
                        <h2 className="text-xl font-['Cinzel'] font-bold mb-8 tracking-widest uppercase">
                            Send us a message
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest mb-2 text-gray-400">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4AF37] transition-all"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest mb-2 text-gray-400">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4AF37] transition-all"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest mb-2 text-gray-400">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full px-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4AF37] transition-all resize-none"
                                    placeholder="How can we help you?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#D4AF37] text-white text-xs font-bold py-4 rounded-full uppercase tracking-[0.2em] hover:bg-[#B8962E] hover:scale-[1.02] transition-all shadow-lg shadow-[#D4AF37]/20 disabled:bg-gray-400"
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </motion.div>

                    {/* CONTACT INFO */}
                    <motion.div
                        className="space-y-10 py-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={sectionVariants}
                    >
                        <div>
                            <h2 className="text-xl font-['Cinzel'] font-bold mb-6 tracking-widest uppercase">
                                Contact Information
                            </h2>
                            <p className="text-[15px] text-gray-500 font-light leading-relaxed">
                                Our support team is dedicated to providing you with the royal service you deserve. We are available during business hours to assist with orders, bulk inquiries, or any pure ghee sweetness you're looking for.
                            </p>
                        </div>

                        <div className="space-y-8">

                            <div className="flex items-center space-x-6 group">
                                <div className="bg-[#D4AF37]/10 p-4 rounded-2xl group-hover:bg-[#D4AF37] transition-all duration-500">
                                    <FiMapPin className="text-2xl text-[#D4AF37] group-hover:text-white transition-all duration-500" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-1">Our Location</h3>
                                    <p className="text-gray-600 font-medium">123 Mithai Lane, Etah, India</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-6 group">
                                <div className="bg-[#D4AF37]/10 p-4 rounded-2xl group-hover:bg-[#D4AF37] transition-all duration-500">
                                    <FiPhone className="text-2xl text-[#D4AF37] group-hover:text-white transition-all duration-500" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-1">Call Us</h3>
                                    <p className="text-gray-600 font-medium">+91 98972 - 78469</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-6 group">
                                <div className="bg-[#D4AF37]/10 p-4 rounded-2xl group-hover:bg-[#D4AF37] transition-all duration-500">
                                    <FiMail className="text-2xl text-[#D4AF37] group-hover:text-white transition-all duration-500" />
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-1">Email Us</h3>
                                    <p className="text-gray-600 font-medium">ajyendrasinghjadon@gmail.com</p>
                                </div>
                            </div>

                        </div>
                    </motion.div>

                </div>

                {/* GOOGLE MAP SECTION */}
                <motion.div
                    className="mt-20 lg:mt-28"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={sectionVariants}
                >
                    <h2 className="text-xl font-['Cinzel'] font-bold mb-8 tracking-widest uppercase text-center">
                        Visit Our Store
                    </h2>
                    <div className="w-full h-[300px] md:h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFF8E7] relative">
                        <iframe
                            title="Ganga Sweets Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7073.805306319651!2d78.64352359357909!3d27.56553149999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3974fd524a18581b%3A0x3207143084d66a7c!2sGANGA%20SWEETS%20%26%20DEPARTMENTAL%20STORE!5e0!3m2!1sen!2sin!4v1775460979552!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                        <div className="absolute inset-0 pointer-events-none rounded-3xl border border-gray-100"></div>
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
};

export default Contact;