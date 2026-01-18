import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { projects } from '../data/projects';

// --- Re-defining Components Locally for safety ---

const ProjectCard = React.memo(({ project, isMajor = false }) => (
    <div className={`block ${isMajor ? 'col-span-1 md:col-span-2' : ''}`}>
        <motion.div
            className={`group relative rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 transition-colors ${project.color} h-full p-0`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <Link to={`/projects/${project.id}`} className="absolute inset-0 z-10" aria-label={`View ${project.title}`} />
            <div className="absolute inset-0 z-0 bg-transparent flex items-center justify-center pointer-events-none">
                <img
                    src={project.images.hero}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
            </div>
            <div className={`relative z-20 h-full flex flex-col justify-between p-5 md:p-10 pointer-events-none bg-black/60 backdrop-blur-sm transition-colors duration-500 group-hover:bg-black/50 ${isMajor ? 'min-h-[350px] md:min-h-[600px]' : 'min-h-[280px] md:min-h-[450px]'}`}>
                <div className={`${isMajor ? 'max-w-3xl' : ''}`}>
                    <span className="text-sm font-medium text-neutral-400 mb-2 block uppercase tracking-wider drop-shadow-md">
                        {project.category}
                    </span>
                    <h3 className={`${isMajor ? 'text-3xl md:text-6xl' : 'text-2xl md:text-3xl'} font-bold mb-4 text-white drop-shadow-md`}>{project.title}</h3>
                    <p className={`text-white/90 ${isMajor ? 'text-lg md:text-2xl' : 'text-sm md:text-lg'} leading-relaxed mb-4 drop-shadow-md`}>
                        {project.description}
                    </p>
                </div>
                <div className="flex items-center gap-4 pointer-events-auto">
                    <div className="flex items-center gap-2 text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                        View Project <ArrowUpRight size={16} />
                    </div>
                </div>
            </div>
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

const CategoryPage = () => {
    const { category } = useParams();

    // Safety check
    if (!projects) return <div className="pt-32 text-center text-white">Loading projects...</div>;

    const webProjects = projects.filter(p => p.type === 'web');
    const designProjects = projects.filter(p => p.type === 'design');

    // Group logic for design
    const designCategories = ['Ad Creatives', 'Magazines', 'Social Media', 'UI/UX'];
    const groupedDesignProjects = designCategories.map(cat => ({
        title: cat,
        projects: designProjects.filter(p => p.subcategory === cat)
    }));

    // Handle 'Other'
    const uncategorized = designProjects.filter(p => !designCategories.includes(p.subcategory));
    if (uncategorized.length > 0) groupedDesignProjects.push({ title: 'Other Designs', projects: uncategorized });

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]);

    return (
        <section className="min-h-screen bg-[#101010] pt-32 pb-20">
            <div className="container">
                <Link to="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Home</span>
                </Link>

                <div className="mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold capitalize mb-4">
                        {category === 'web' ? 'Web Development' : 'Graphic Design & UI/UX'}
                    </h1>
                    <p className="text-xl text-gray-400">
                        {category === 'web'
                            ? "Building scalable, high-performance web applications."
                            : "Crafting intuitive user experiences and compelling brand identities."}
                    </p>
                </div>

                {category === 'web' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {webProjects.map((project, idx) => (
                            <ProjectCard key={project.id} project={project} isMajor={idx === 0} />
                        ))}
                        {webProjects.length === 0 && <p className="text-gray-500">No web projects found.</p>}
                    </div>
                )}

                {category === 'design' && (
                    <div className="space-y-32">
                        {groupedDesignProjects.map(group => (
                            group.projects.length > 0 && (
                                <div key={group.title}>
                                    <h2 className="text-4xl md:text-5xl font-bold mb-8">{group.title}</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {group.projects.map(project => (
                                            <DesignProjectCard key={project.id} project={project} />
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                        {designProjects.length === 0 && <p className="text-gray-500">No design projects found.</p>}
                    </div>
                )}
            </div>
        </section>
    );
};

export default CategoryPage;
