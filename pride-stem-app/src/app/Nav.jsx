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

    {
        href: "/conference",
        label: "Conference",
        children: [
            { href: "/register", label: "Register" },
            { href: "/schedule", label: "Schedule" },
            { href: "/present", label: "Present" },
            { href: "/partner", label: "Partner" },
            { href: "/contact", label: "Contact" }
        ]
    },

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
                    aria-label="Toggle menu" 
                    aria-expanded={isOpen} 
                >
                    {/* Hamburger icon - has 'active' class when menu is open */}
                    <span className={`${styles.hamburger} ${isOpen ? styles.active : ""}`}></span>
                </button>

                {/* Navigation Links Menu */}
               <ul className={`${styles.navMenu} ${isOpen ? styles.active : ""}`}>
                    {items.map(({ href, label, children }) => (
                    <li 
                        key={href}
                        className={`${styles.navItem} ${children ? styles.hasDropdown : ""}`}
                    >
                {/* Dropdown functionality for Conference navigation item */}
                    {children ? (
                     <button
                        className={`${styles.navLink} ${
                        pathname === href ? styles.active : ""
                        }`}
                        onClick={(e) => {
                        // Mobile toggle only
                        e.preventDefault();
                        e.currentTarget.parentElement.classList.toggle(styles.dropdownOpen);
                         }}
                     >
                    {label}
                    </button>
                    ) : (
                     /* otherwise use normal <Link> */
                    <Link
                        href={href}
                        className={`${styles.navLink} ${
                            pathname === href ? styles.active : ""
                        }`}
                        onClick={() => setIsOpen(false)}
                    >
                        {label}
                    </Link>
                    )}

            {/* Dropdown submenu (only for Conference) */}
            {children && (
                <ul className={styles.dropdownMenu}>
                    {children.map((child) => (
                        <li key={child.href}>
                            <Link
                                href={child.href}
                                className={styles.dropdownLink}
                                onClick={() => setIsOpen(false)}
                            >
                                {child.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    ))}
</ul>
            </div>
        </nav>
    );
}
