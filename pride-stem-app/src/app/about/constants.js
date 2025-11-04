export const COLORS = {
    primary: '#ff0080',
    secondary: '#7928ca',
    gradientText: 'linear-gradient(90deg, #ff0080, #7928ca)',
    gradientBg: {
        primary: 'linear-gradient(135deg, rgba(255,0,128,0.1), rgba(121,40,202,0.1))',
        secondary: 'linear-gradient(135deg, rgba(121,40,202,0.1), rgba(255,0,128,0.1))',
    },
    buttonHover: 'linear-gradient(90deg, #ff4da6, #9c4bff)',
    buttonNormal: 'linear-gradient(90deg, #ff0080, #7928ca)',
};

export const ANIMATIONS = {
    fadeIn: {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true },
    },
    slideInLeft: {
        initial: { x: -100, opacity: 0 },
        whileInView: { x: 0, opacity: 1 },
        transition: { duration: 0.8 },
    },
    slideInRight: {
        initial: { x: 100, opacity: 0 },
        whileInView: { x: 0, opacity: 1 },
        transition: { duration: 0.8 },
    },
    scaleIn: {
        initial: { scale: 0.8, opacity: 0 },
        whileInView: { scale: 1, opacity: 1 },
        transition: { duration: 0.8 },
    },
};