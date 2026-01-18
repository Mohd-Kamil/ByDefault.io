import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Boxes } from "@/components/ui/background-boxes";
import { BeamsBackground } from "@/components/ui/beams-background";
import { useMediaQuery } from "@/hooks/use-media-query";

const words = ["UI/UX.", "Social Media.", "Content Creation.", "Web Applications.", "Websites.", "Mobile Apps.", "AI Solutions.", "Graphic Design.", "Logo Design.", "Brand Kit."];

const Hero = () => {
    const [index, setIndex] = useState(0);
    const { scrollY } = useScroll();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    // Smooth opacity transition for background switch
    const opacity = useTransform(scrollY, [0, 800], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
    const y = useTransform(scrollY, [0, 300], [0, 50]);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="min-h-screen flex flex-col justify-center pt-32 pb-20 relative overflow-hidden bg-[#101010]">
            {/* Background Layer - Explicit Z-Index 0 */}
            <motion.div
                style={{ opacity }}
                className="absolute inset-0 w-full h-full bg-black z-0 overflow-hidden"
            >
                <div className="absolute inset-0 w-full h-full bg-black z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

                {/* Conditional Rendering for Performance */}
                {isDesktop ? (
                    <div className="absolute inset-0 w-full h-full">
                        <Boxes />
                    </div>
                ) : (
                    <div className="absolute inset-0 w-full h-full z-10">
                        <BeamsBackground className="h-full min-h-0" intensity="medium" />
                    </div>
                )}

                {/* Bottom Fade Gradient */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#101010] to-transparent z-30 pointer-events-none" />
            </motion.div>

            {/* Brand Name - Positioned at top */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-24 md:top-32 left-0 w-full flex justify-center z-30 pointer-events-none"
            >
                <span className="font-['Pixelify_Sans'] text-3xl md:text-5xl text-white tracking-widest drop-shadow-[0_0_25px_rgba(150,150,150,0.9)]">
                    ByDefault.io
                </span>
            </motion.div>

            {/* Content Layer - Explicit Z-Index 10 */}
            <motion.div
                style={{ opacity, scale, y }}
                className="container relative z-10 pointer-events-none flex flex-col items-center text-center"
            >


                <div className="max-w-4xl mx-auto mt-24 md:mt-20 px-4">
                    <motion.h1
                        className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    >
                        Build <span className="text-gray-500">|</span>
                        <br />
                        <div className="text-gray-400 h-[1.2em] relative overflow-hidden text-4xl md:text-7xl flex justify-center items-center mt-2 md:mt-0">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 1 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, y: 20, position: "absolute" }}
                                    transition={{ duration: 0.3 }}
                                    className="inline-block whitespace-nowrap"
                                >
                                    {words[index].split("").map((char, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.05, delay: i * 0.08 }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                        className="inline-block w-[0.1em] h-[0.8em] bg-gray-400 ml-2 align-baseline"
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                    >
                        We craft digital experiences that blend form and function into seamless, captivating products. <br />Want your brand on Top? Call Us!
                    </motion.p>
                </div>
            </motion.div>
        </section >
    );
};

export default Hero;
