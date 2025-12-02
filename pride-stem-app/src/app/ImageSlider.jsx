"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ImageSlider.module.css"; 

const images = [
  "/img/slideshow1.jpg",
  "/img/slideshow2.webp",
  "/img/slideshow3.jpg",
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Change image every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const goToSlide = (index) => {
    setCurrent(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000); // Resume after 8 seconds
  };

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000);
  };

  return (
    <div className={styles.sliderContainer}>
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`Conference highlight ${current + 1} - Pride STEM Canada event`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.sliderImage}
        />
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button 
        onClick={goToPrevious} 
        className={`${styles.navButton} ${styles.navPrev}`}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button 
        onClick={goToNext} 
        className={`${styles.navButton} ${styles.navNext}`}
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Dots Navigation */}
      <div className={styles.dotsContainer}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`${styles.dot} ${index === current ? styles.dotActive : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}