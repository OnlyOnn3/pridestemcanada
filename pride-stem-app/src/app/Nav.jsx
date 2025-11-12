/**
 * Navigation Component (Nav.jsx)
 * 
 * Main navigation bar for the Pride STEM Canada website.
 * Features:
 * - Responsive design that adapts to mobile and desktop screens
 * - Hamburger menu for mobile devices
 * - Active page highlighting
 * - Logo with brand text
 * - Smooth menu animations
 * 
 * The navigation bar is fixed at the top of all pages via layout.js
 */

"use client";

import Link from "next/link";
import Image from 'next/image';
import { usePathname } from "next/navigation"; // Gets current page URL for active state
import { useState } from "react";
import styles from "./Nav.module.css";

export default function Nav() {
    // Get the current page path to highlight the active navigation link
    const pathname = usePathname();
    
    // State to track if mobile menu is open (hamburger menu)
    const [isOpen, setIsOpen] = useState(false);

    /**
     * Navigation menu items
     * Each item has:
     * - href: The URL path the link points to
     * - label: The text displayed in the navigation menu
     */
    const items = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/governance", label: "Governance" },
        { href: "/conference", label: "Conference" },
        { href: "/contact", label: "Contact Us" },
    ];

    /**
     * Toggle the mobile menu open/closed
     * Called when the hamburger icon is clicked on mobile devices
     */
    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                {/* Logo Section - Links back to homepage */}
                <Link href="/" className={styles.navBrand}>
                    <Image
                        src="/img/heart-logo.png"  
                        alt="Pride STEM Canada Logo"
                        width={50} 
                        height={45}
                        priority // Load logo immediately for better performance
                        className={styles.logo}
                    />
                    <span className={styles.brandText}>Pride STEM Canada</span>
                </Link>

                {/* Mobile Hamburger Menu Toggle Button */}
                {/* Only visible on mobile screens, controlled by CSS */}
                <button 
                    className={styles.mobileToggle}
                    onClick={toggleMenu}
                    aria-label="Toggle menu" // Accessibility label for screen readers
                    aria-expanded={isOpen} // Tells screen readers if menu is open
                >
                    {/* Hamburger icon - has 'active' class when menu is open */}
                    <span className={`${styles.hamburger} ${isOpen ? styles.active : ""}`}></span>
                </button>

                {/* Navigation Links Menu */}
                {/* On mobile: hidden by default, shown when isOpen is true */}
                {/* On desktop: always visible in horizontal layout */}
                <ul className={`${styles.navMenu} ${isOpen ? styles.active : ""}`}>
                    {items.map(({ href, label }) => (
                        <li className={styles.navItem} key={href}>
                            <Link
                                href={href}
                                // Highlight the link if it matches the current page
                                className={`${styles.navLink} ${
                                    pathname === href ? styles.active : ""
                                }`}
                                // Close mobile menu when a link is clicked
                                onClick={() => setIsOpen(false)}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
