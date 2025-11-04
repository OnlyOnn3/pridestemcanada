export const SECTIONS = [
    {
        id: "description",
        title: "Who are we?",
        body: "Hello! This is some text informing you about the Pride STEM conference and the organization behind it!"
    },
    {
        id: "info",
        title: "More Information",
        body: "This is where we have more information about Pride STEM."
    },
    {
        id: "contact",
        title: "Unspecified",
        body: "Unspecified body text."
    }
];

export const ANIMATIONS = {
    fadeIn: {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
        transition: { duration: 0.35 }
    },
    slideUp: {
        initial: { y: 50, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        viewport: { once: true },
        transition: { duration: 0.35 }
    },
    slideInLeft: {
        initial: { x: -100, opacity: 0 },
        whileInView: { x: 0, opacity: 1 },
        viewport: { once: true },
        transition: { duration: 0.35 }
    },
    slideInRight: {
        initial: { x: 100, opacity: 0 },
        whileInView: { x: 0, opacity: 1 },
        viewport: { once: true },
        transition: { duration: 0.35 }
    },
    scaleIn: {
        initial: { scale: 0.8, opacity: 0 },
        whileInView: { scale: 1, opacity: 1 },
        viewport: { once: true },
        transition: { duration: 0.35 }
    }
};