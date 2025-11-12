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

  // Change image every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.sliderContainer}>
      <AnimatePresence>
        <motion.img
          key={current}
          src={images[current]}
          alt={`Slide ${current + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className={styles.sliderImage}
        />
      </AnimatePresence>
    </div>
  );
}