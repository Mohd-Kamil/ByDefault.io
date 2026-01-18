import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Phone, Mail } from 'lucide-react';

const Modal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="w-full max-w-lg bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl pointer-events-auto relative z-10 m-4"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <h2 className="text-2xl font-bold">Get in touch with us</h2>
                            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <a
                                href="tel:+918299211164"
                                className="w-full flex items-center justify-between p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-full bg-white/10">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg mb-1">Call Us</div>
                                        <div className="text-sm text-gray-400">+91 8299211164</div>
                                    </div>
                                </div>
                                <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                            </a>

                            <a
                                href="mailto:bydefaultdotio@gmail.com"
                                className="w-full flex items-center justify-between p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-full bg-white/10">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg mb-1">Email Us</div>
                                        <div className="text-sm text-gray-400">Send us a message</div>
                                    </div>
                                </div>
                                <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
