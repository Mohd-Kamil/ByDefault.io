import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import Modal from '../components/Modal';

const ProjectDetails = () => {
    const { id } = useParams();
    const project = projects.find(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    if (!project) return <div className="min-h-screen flex items-center justify-center">Project not found</div>;

    return (
        <div className="pt-32 pb-20">
            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <div className="container">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/#work" className="hover:text-white transition-colors">Projects</Link>
                    <span>/</span>
                    <span className="text-white">{project.title}</span>
                </div>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">{project.title}</h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed">
                        {project.longDescription}
                    </p>
                    <div className="flex gap-4 mt-8">
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform"
                            >
                                Live Preview <ArrowUpRight size={20} />
                            </a>
                        )}
                    </div>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-3xl overflow-hidden mb-20 border border-white/10"
                >
                    <img src={project.images.hero} alt={project.title} loading="lazy" decoding="async" className="w-full h-auto object-contain" />
                </motion.div>

                {/* Tech Stack */}
                <div className="mb-20">
                    <div className="bg-white/5 rounded-2xl p-8 border border-white/5">
                        <h3 className="font-bold mb-6">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.techStack.map(tech => (
                                <span key={tech} className="bg-white/10 px-3 py-1 rounded-full text-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                {project.images.gallery.length > 0 && (
                    <div className="mb-20">
                        <h2 className="text-2xl font-bold mb-8">Project Gallery</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {project.images.gallery.map((img, index) => (
                                <div key={index} className="rounded-2xl overflow-hidden border border-white/10">
                                    <img src={img} alt={`Gallery ${index + 1}`} loading="lazy" decoding="async" className="w-full h-auto object-contain" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="border-t border-white/10 pt-20 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} /> Back to Projects
                    </Link>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white text-black px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform"
                    >
                        Start Your Project
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
