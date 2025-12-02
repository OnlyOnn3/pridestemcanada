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
 * - Conference dropdown: Click to navigate, hover to show submenu
 */

"use client";

import Link from "next/link";
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Nav.module.css";

export default function Nav() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const items = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/governance", label: "Governance" },
        {
            href: "/conference/about",
            label: "Conference",
            children: [
                { href: "/conference/about", label: "About" },
                { href: "/register", label: "Register" },
                { href: "/conference/schedule", label: "Schedule" },
                { href: "/conference/present", label: "Present" },
                { href: "/conference/partner", label: "Partner" },
                { href: "/conference/contact", label: "Contact" }
            ]
        },
        { href: "/contact", label: "Contact Us" },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                <Link href="/" className={styles.navBrand}>
                    <Image
                        src="/img/pride-stem-logo.jpeg"  
                        alt="Pride STEM Canada Logo"
                        width={50} 
                        height={45}
                        priority
                        className={styles.logo}
                    />
                    <span className={styles.brandText}>Pride STEM Canada</span>
                </Link>

                <button 
                    className={styles.mobileToggle}
                    onClick={toggleMenu}
                    aria-label="Toggle menu" 
                    aria-expanded={isOpen} 
                >
                    <span className={`${styles.hamburger} ${isOpen ? styles.active : ""}`}></span>
                </button>

                <ul className={`${styles.navMenu} ${isOpen ? styles.active : ""}`}>
                    {items.map(({ href, label, children }) => (
                        <li 
                            key={href}
                            className={`${styles.navItem} ${children ? styles.hasDropdown : ""}`}
                        >
                            {children ? (
                                /* Conference link with wrapper for hover */
                                <>
                                   <Link
                                    href={href}
                                    className={`${styles.navLink} ${
                                    pathname === href ? styles.active : ""
                                    }`}
                                        onClick={(e) => {
                                            const isMobileOrTablet = window.innerWidth <= 1024;

                                            if (isMobileOrTablet) {
                                            e.preventDefault();
                                            e.currentTarget.parentElement.classList.toggle(styles.dropdownOpen);
                                            } else {
                                                setIsOpen(false);
                                            }
                                            }}
                                    >
                                        {label}
                                    </Link>

                                    {/* Dropdown submenu - shown on hover (desktop) or click (mobile) */}
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
                                </>
                            ) : (
                                /* Regular navigation links */
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
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}