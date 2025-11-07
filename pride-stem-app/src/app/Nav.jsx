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
        { href: "/register", label: "Conference" },
        { href: "/governance", label: "Governance" },
        { href: "/vendors", label: "Sponsors" },
        { href: "/contact", label: "Contact" },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                {/* Logo */}
                <Link href="/" className={styles.navBrand}>
                    <Image
                        src="/img/pride-in-stem.png"  
                        alt="Pride STEM Canada Logo"
                        width={50} 
                        height={45}
                        priority
                        className={styles.logo}
                    />
                    <span className={styles.brandText}>Pride STEM</span>
                </Link>

                {/* Mobile Toggle */}
                <button 
                    className={styles.mobileToggle}
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                >
                    <span className={`${styles.hamburger} ${isOpen ? styles.active : ""}`}></span>
                </button>

                {/* Navigation Links */}
                <ul className={`${styles.navMenu} ${isOpen ? styles.active : ""}`}>
                    {items.map(({ href, label }) => (
                        <li className={styles.navItem} key={href}>
                            <Link
                                href={href}
                                className={`${styles.navLink} ${
                                    pathname === href ? styles.active : ""
                                }`}
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
