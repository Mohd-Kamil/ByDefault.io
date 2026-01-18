import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const ProjectCard = React.memo(({ project, isMajor = false }) => (
    <div className={`block ${isMajor ? 'col-span-1 md:col-span-2' : ''}`}>
        <motion.div
            className={`group relative rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 transition-colors ${project.color} h-full p-0`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            {/* Main Link Overlay */}
            <Link to={`/projects/${project.id}`} className="absolute inset-0 z-10" aria-label={`View ${project.title}`} />

            {/* Project Image Background - Glassy Effect */}
            <div className="absolute inset-0 z-0 bg-transparent flex items-center justify-center pointer-events-none">
                <img
                    src={project.images.hero}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                {/* Visibility Gradients - Top and Bottom Protection */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
            </div>

            {/* Content Container - Glassy Full Overlay */}
            <div className={`relative z-20 h-full flex flex-col justify-between p-6 md:p-10 pointer-events-none bg-black/60 backdrop-blur-sm transition-colors duration-500 group-hover:bg-black/50 ${isMajor ? 'min-h-[500px] md:min-h-[600px]' : 'min-h-[400px] md:min-h-[450px]'}`}>
                <div className={`${isMajor ? 'max-w-3xl' : ''}`}>
                    <span className="text-sm font-medium text-purple-300 mb-2 block uppercase tracking-wider drop-shadow-md">
                        {project.category}
                    </span>
                    <h3 className={`${isMajor ? 'text-4xl md:text-6xl' : 'text-3xl'} font-bold mb-4 text-white drop-shadow-md`}>{project.title}</h3>
                    <p className={`text-white/90 ${isMajor ? 'text-xl md:text-2xl' : 'text-lg'} leading-relaxed mb-4 drop-shadow-md`}>
                        {project.description}
                    </p>
                </div>

                <div className="flex items-center gap-4 pointer-events-auto">
                    <div className="flex items-center gap-2 text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                        View Project <ArrowUpRight size={16} />
                    </div>
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm font-medium bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full backdrop-blur-md transition-colors opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 text-white border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Live Preview <ArrowUpRight size={16} className="rotate-45" />
                        </a>
                    )}
                </div>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none" />
        </motion.div>
    </div>
));

const DesignProjectCard = React.memo(({ project }) => (
    <motion.div
        className={`group relative rounded-3xl overflow-hidden border border-white/10 aspect-[4/3] backdrop-blur-sm will-change-transform ${project.color || 'bg-white/5'}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
    >
        <img
            src={project.images.hero}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
    </motion.div>
));

const ProjectSection = ({ title, description, projects }) => {
    if (!projects || projects.length === 0) return null;
    const [majorProject, ...otherProjects] = projects;

    return (
        <div className="mb-32 last:mb-0">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
                <p className="text-xl text-gray-400 max-w-2xl">
                    {description}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Major Project - Takes full width on desktop */}
                <ProjectCard project={majorProject} isMajor={true} />

                {/* Other Projects - Grid layout */}
                {otherProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

const DesignSection = ({ title, description, projects }) => {
    if (!projects || projects.length === 0) return null;

    return (
        <div className="mb-32 last:mb-0">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
                <p className="text-xl text-gray-400 max-w-2xl">
                    {description}
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project) => (
                    <DesignProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

const Projects = () => {
    const [activeTab, setActiveTab] = React.useState('design');
    const webProjects = projects.filter(p => p.type === 'web');

    // Group design projects by subcategory
    const designProjects = projects.filter(p => p.type === 'design');
    const designCategories = ['Ad Creatives', 'Magazines', 'Social Media', 'UI/UX'];
    const groupedDesignProjects = designCategories.map(category => ({
        title: category,
        projects: designProjects.filter(p => p.subcategory === category)
    }));

    // Fallback for any design projects that might not match the specific categories (optional)
    const uncategorizedDesignProjects = designProjects.filter(p => !designCategories.includes(p.subcategory));
    if (uncategorizedDesignProjects.length > 0) {
        groupedDesignProjects.push({
            title: 'Other Designs',
            projects: uncategorizedDesignProjects
        });
    }

    return (
        <section id="work" className="section bg-[#101010]">
            <div className="container">
                <div className="flex justify-center mb-16">
                    <div className="inline-flex bg-white/5 p-1 rounded-full border border-white/10 backdrop-blur-sm">
                        <button
                            onClick={() => setActiveTab('design')}
                            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'design'
                                ? 'bg-white text-black shadow-lg'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Graphic Design & UI/UX
                        </button>
                        <button
                            onClick={() => setActiveTab('web')}
                            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'web'
                                ? 'bg-white text-black shadow-lg'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Web Development
                        </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'web' ? (
                        <motion.div
                            key="web"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ProjectSection
                                title="Web Development"
                                description="Building scalable, high-performance web applications and digital solutions."
                                projects={webProjects}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="design"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {groupedDesignProjects.map((group, index) => (
                                <DesignSection
                                    key={group.title}
                                    title={group.title}
                                    description={index === 0 ? "Crafting intuitive user experiences and compelling brand identities." : ""}
                                    projects={group.projects}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Projects;
