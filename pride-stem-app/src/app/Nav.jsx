"use client";

import Link from "next/link";
import Image from 'next/image';
import { usePathname } from "next/navigation";

export default function Nav() {
    const pathname = usePathname();

    const items = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About Us" },
        { href: "/register", label: "Conference" },
        { href: "/governance", label: "Governance" },
        { href: "/vendors", label: "Vendors" },
        { href: "/contact", label: "Contact Us" },
    ];

    return (
        <nav
            className="navbar navbar-expand-lg navbar-dark shadow-sm fixed-top"
            style={{
                background: "linear-gradient(90deg, #ff0080, #7928ca)",
                zIndex: 1000
            }}
        >
            <div className="container">
                <Link href="/" className="navbar-brand fw-bold d-flex align-items-center gap-2">
                    <Image
                        src="/img/pride-in-stem.png"  
                        alt="Pride STEM Canada Logo"
                        width={70} 
                        height={60}
                        priority
                    />
                    <span className="fw-bold text-light">Pride STEM Canada</span>
                </Link>
                <button
                    className="navbar-toggler border-0"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNav"
                    aria-controls="mainNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainNav">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {items.map(({ href, label }) => (
                            <li className="nav-item" key={href}>
                                <Link
                                    href={href}
                                    className={`nav-link ${
                                        pathname === href ? "active fw-semibold text-light border-bottom border-white" : "text-light"
                                    }`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
