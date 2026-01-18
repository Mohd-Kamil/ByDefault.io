import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HoverSlider, HoverSliderImage, HoverSliderImageWrap, TextStaggerHover } from "@/components/ui/animated-slideshow";

const SLIDES = [
    {
        id: "design",
        title: "Graphic Design & UI/UX",
        imageUrl: "/graphics/Ad Creatives/ChatGPT Image Jan 16, 2026, 01_01_26 PM.png"
    },
    {
        id: "web",
        title: "Website Development",
        imageUrl: "/graphics/Ad Creatives/ChatGPT Image Jan 19, 2026, 01_17_14 AM.png"
    }
];

const Projects = () => {
    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate(`/work/${id}`);
    };

    return (
        <section id="work" className="section bg-[#101010] py-20">
            <div className="container">
                <div className="mb-20">
                    <h3 className="mb-8 text-neutral-500 text-sm font-medium capitalize tracking-wide">
                        / Our Services
                    </h3>
                    <HoverSlider className="w-full">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20">
                            {/* Left: Text Links */}
                            <div className="flex flex-col space-y-6 md:space-y-10 w-full md:w-1/2">
                                {SLIDES.map((slide, index) => (
                                    <Link key={slide.id} to={`/work/${slide.id}`} className="block w-fit">
                                        <TextStaggerHover
                                            index={index}
                                            className="cursor-pointer text-2xl md:text-4xl font-bold uppercase tracking-tighter text-neutral-300 md:text-neutral-500 hover:text-white animate-pulse md:animate-none transition-colors duration-300"
                                            text={slide.title}
                                        />
                                    </Link>
                                ))}
                            </div>

                            {/* Right: Images */}
                            <div className="w-full md:w-1/2">
                                <HoverSliderImageWrap className="h-full w-full">
                                    {SLIDES.map((slide, index) => (
                                        <HoverSliderImage
                                            key={slide.id}
                                            index={index}
                                            imageUrl={slide.imageUrl}
                                            alt={slide.title}
                                            onClick={() => handleNavigate(slide.id)}
                                            className="w-full h-auto object-contain cursor-pointer"
                                            loading="eager"
                                        />
                                    ))}
                                </HoverSliderImageWrap>
                            </div>
                        </div>
                    </HoverSlider>
                </div>
            </div>
        </section>
    );
};

export default Projects;
