import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Linkedin, Mail, Hammer, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Modal from './Modal';

// Simple Fiverr Icon SVG
const FiverrIcon = ({ size = 20, className = "" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="10" />
        <path d="M9 12h6" />
        <path d="M12 9v6" />
    </svg>
);

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const isProjectPage = location.pathname.startsWith('/projects/');

    if (isProjectPage) {
        return (
            <motion.header
                className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4"
                initial={{ y: -100, x: "-50%" }}
                animate={{ y: 0, x: "-50%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="flex items-center justify-between px-6 py-3 rounded-full bg-[#101010]/90 backdrop-blur-md border border-white/10 shadow-2xl">
                    <Link to="/" className="text-2xl font-['Pixelify_Sans'] font-bold text-white hover:text-gray-300 transition-colors">
                        ByDefault.io
                    </Link>

                    <Link
                        to="/"
                        className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Go Back
                    </Link>
                </div>
            </motion.header>
        );
    }

    return (
        <>
            <motion.header
                className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
                initial={{ y: -100, x: "-50%" }}
                animate={{ y: 0, x: "-50%" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="flex items-center justify-between md:justify-start md:gap-6 px-4 md:pl-6 md:pr-2 py-2 rounded-full bg-[#101010]/90 backdrop-blur-md border border-white/10 shadow-2xl w-[90vw] md:w-auto mx-auto">
                    {/* Logo */}
                    <Link to="/" className="text-white hover:text-gray-300 transition-colors shrink-0">
                        <img src="/logo.png" alt="Brand Logo" className="w-8 h-8 object-contain" />
                    </Link>

                    {/* Social Icons - Hidden on Mobile */}
                    <div className="hidden md:flex items-center gap-5">
                        <a href="https://www.instagram.com/by.default.io?igsh=YWdhbjB1NDdxZWV1" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors"><Instagram size={20} /></a>
                        <a href="https://www.linkedin.com/in/bydefault-io-/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors"><Linkedin size={20} /></a>
                        <a href="mailto:bydefaultdotio@gmail.com" className="text-white hover:text-gray-300 transition-colors"><Mail size={20} /></a>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#eaefff] text-[#101010] px-4 py-2 md:px-6 md:py-3 rounded-full text-xs md:text-sm font-bold hover:scale-105 transition-transform shadow-lg whitespace-nowrap ml-auto md:ml-0"
                    >
                        Build with Us
                    </button>
                </div>
            </motion.header>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default Header;
