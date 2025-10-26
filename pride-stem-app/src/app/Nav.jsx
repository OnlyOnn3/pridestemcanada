"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./layout.module.css";

export default function Nav() {
    const pathname = usePathname();

    const items = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About Us" },
        { href: "/governance", label: "Governance" },
        { href: "/conference", label: "Conference" },
        { href: "/vendors", label: "Vendors" },
        { href: "/contact", label: "Contact Us" },
    ];

    return (
        <nav className={styles.nav} aria-label="Main">
            <ul className={styles.navList}>
                {items.map(({ href, label }) => (
                    <li key={href}>
                        <Link
                            href={href}
                            className={`${styles.navLink} ${
                                pathname === href ? styles.active : ""
                            }`}
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
