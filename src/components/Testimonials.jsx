import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
    {
        quote: "Great experience! Great Designing.",
        author: "LUX Infra",
    },
    {
        quote: "Provided great aesthetic appealing graphics for my brand.",
        author: "Mrityunjai",
    },
    {
        quote: "Excellent job, in time with the right price! We are going to have many more projects!",
        author: "@HouseOfLooms",
    },
    {
        quote: "Looks promising! Great work so far man.",
        author: "@RudraSetu",
    },
    {
        quote: "Great experience, always great to work with professionals. Highly recommend.",
        author: "DIFM",
    }
];

const Testimonials = () => {
    return (
        <section className="py-20 bg-[#101010] overflow-hidden">
            <div className="container mb-24">
                <h2 className="text-4xl font-bold mb-4">Client Testimonials</h2>
                <p className="text-gray-400">What our clients say about working with us.</p>
            </div>

            <div className="relative flex overflow-hidden mt-12">
                {/* Gradient Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#101010] to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#101010] to-transparent z-10" />

                {/* Sliding Container */}
                <motion.div
                    className="flex gap-8 whitespace-nowrap"
                    animate={{ x: [0, -1000] }} // Adjust value based on content width
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 20,
                            ease: "linear",
                        },
                    }}
                >
                    {/* Duplicate list for seamless loop */}
                    {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                        <div
                            key={i}
                            className="inline-block w-[300px] md:w-[400px] bg-white/5 border border-white/10 p-8 rounded-2xl whitespace-normal flex-shrink-0"
                        >
                            <p className="text-lg text-gray-300 mb-6 leading-relaxed">"{t.quote}"</p>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">{t.author}</span>
                                <span className="text-xl">{t.flag}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
