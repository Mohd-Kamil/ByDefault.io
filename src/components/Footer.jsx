import React from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal';

const Footer = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <footer className="py-20 border-t border-white/10 bg-[#0a0a0a]">
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
                    <div className="max-w-xl">
                        <h2 className="text-3xl md:text-6xl font-bold mb-8 tracking-tight">
                            Let's Create Something Amazing
                        </h2>
                        <p className="text-xl text-gray-400 mb-8">
                            Have a project in mind? We'd love to hear about it. Get in touch with us and let's start a conversation.
                        </p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:scale-105 transition-transform"
                        >
                            Start a Project
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-12">
                        <div>
                            <h4 className="font-bold mb-4 text-gray-500">Socials</h4>
                            <ul className="space-y-2">
                                <li><a href="https://www.linkedin.com/in/bydefault-io-/" className="hover:text-white transition-colors">LinkedIn</a></li>
                                <li><a href="https://www.instagram.com/by.default.io?igsh=YWdhbjB1NDdxZWV1" className="hover:text-white transition-colors">Instagram</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-gray-500">Contact</h4>
                            <ul className="space-y-2">
                                <li><a href="mailto:bydefaultdotio@gmail.com" className="hover:text-white transition-colors">bydefaultdotio@gmail.com <br />+918299211164   </a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-sm text-gray-500">
                    <div>© 2026 ByDefault.io. All rights reserved.</div>
                    <div className="flex gap-6 mt-4 md:mt-0">
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
