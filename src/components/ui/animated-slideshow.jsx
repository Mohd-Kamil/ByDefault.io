"use client"

import * as React from "react"
import { MotionConfig, motion } from "framer-motion"
import { cn } from "@/lib/utils"

function splitText(text) {
    const words = text.split(" ").map((word) => word.concat(" "))
    const characters = words.map((word) => word.split("")).flat(1)

    return {
        words,
        characters,
    }
}

const HoverSliderContext = React.createContext(undefined)

function useHoverSliderContext() {
    const context = React.useContext(HoverSliderContext)
    if (context === undefined) {
        throw new Error(
            "useHoverSliderContext must be used within a HoverSliderProvider"
        )
    }
    return context
}

export const HoverSlider = React.forwardRef(({ children, className, ...props }, ref) => {
    const [activeSlide, setActiveSlide] = React.useState(0)
    const changeSlide = React.useCallback(
        (index) => setActiveSlide(index),
        []
    )
    return (
        <HoverSliderContext.Provider value={{ activeSlide, changeSlide }}>
            <div ref={ref} className={className} {...props}>{children}</div>
        </HoverSliderContext.Provider>
    )
})
HoverSlider.displayName = "HoverSlider"

export const TextStaggerHover = React.forwardRef(({ text, index, children, className, ...props }, ref) => {
    const { activeSlide, changeSlide } = useHoverSliderContext()
    // Check if setActiveTab is provided (custom usage for page nav)
    // If we want this to be generic, we should probably stick to internal state, 
    // BUT the user wants this to control the projects view.
    // So the 'changeSlide' here only changes the IMAGE in the slider.
    // I will need to expose a way to know WHICH slide was clicked.
    // The user said "when user clicks... show him projects".
    // So I should add an onClick handler passed via props to TextStaggerHover?

    // For now, let's keep the component generic as requested, and I'll add the onClick in the parent usage.

    const { characters } = splitText(text)
    const isActive = activeSlide === index
    const handleMouse = () => changeSlide(index)

    return (
        <span
            className={cn(
                "relative inline-block origin-bottom overflow-hidden cursor-pointer",
                className
            )}
            {...props}
            ref={ref}
            onMouseEnter={handleMouse}
            onTouchStart={handleMouse}
            onClick={handleMouse}
        >
            {characters.map((char, index) => (
                <span
                    key={`${char}-${index}`}
                    className="relative inline-block overflow-hidden"
                >
                    <MotionConfig
                        transition={{
                            delay: index * 0.025,
                            duration: 0.3,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                    >
                        <motion.span
                            className="inline-block opacity-20"
                            initial={{ y: "0%" }}
                            animate={isActive ? { y: "-110%" } : { y: "0%" }}
                        >
                            {char}
                            {char === " " && index < characters.length - 1 && <>&nbsp;</>}
                        </motion.span>

                        <motion.span
                            className="absolute left-0 top-0 inline-block opacity-100"
                            initial={{ y: "110%" }}
                            animate={isActive ? { y: "0%" } : { y: "110%" }}
                        >
                            {char}
                        </motion.span>
                    </MotionConfig>
                </span>
            ))}
        </span>
    )
})
TextStaggerHover.displayName = "TextStaggerHover"

export const clipPathVariants = {
    visible: {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    },
    hidden: {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)",
    },
}

export const HoverSliderImageWrap = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "grid  overflow-hidden [&>*]:col-start-1 [&>*]:col-end-1 [&>*]:row-start-1 [&>*]:row-end-1 [&>*]:size-full",
                className
            )}
            {...props}
        />
    )
})
HoverSliderImageWrap.displayName = "HoverSliderImageWrap"

export const HoverSliderImage = React.forwardRef(({ index, imageUrl, children, className, ...props }, ref) => {
    const { activeSlide } = useHoverSliderContext()
    return (
        <motion.img
            className={cn("inline-block align-middle", className)}
            style={{
                pointerEvents: activeSlide === index ? 'auto' : 'none',
                zIndex: activeSlide === index ? 10 : 0,
                position: 'relative'
            }}
            transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
            variants={clipPathVariants}
            animate={activeSlide === index ? "visible" : "hidden"}
            ref={ref}
            src={imageUrl}
            {...props}
        />
    )
})
HoverSliderImage.displayName = "HoverSliderImage"
