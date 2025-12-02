/**
 * Root Layout Component
 * 
 * This is the main layout wrapper for the entire Pride STEM Canada website.
 * All pages are rendered within this layout, which provides:
 * - Consistent header (navigation bar)
 * - Consistent footer
 * - Global styles and metadata
 * - Responsive container structure
 * 
 * This file runs on every page and wraps all content.
 * 
 * Structure:
 * <html>
 *   <body>
 *     <header> - Navigation bar (Nav component)
 *     <main> - Page content goes here (children prop)
 *     <footer> - Copyright and basic info
 *   </body>
 * </html>
 */

import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS for grid system and utilities
import "./globals.css"; // Global custom styles
import Nav from "./Nav"; // Navigation bar component
import Footer from "./Footer"; // Footer component
import BackToTop from "./BackToTop"; // Back to top button
import Breadcrumb from "./Breadcrumb"; // Breadcrumb navigation

/**
 * Metadata for the website
 * This affects the browser tab title and search engine results
 */
export const metadata = {
    title: "Pride STEM Canada",
    description: "Celebrating 2SLGBTQ+ voices in STEM across Canada",
};

/**
 * RootLayout Component
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The page content to render
 */
export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',    // Full viewport height minimum
            paddingTop: '70px',    // Space for fixed navigation bar
            margin: 0,
            padding: 0,
            backgroundColor: '#ffffff'  // Solid white background
        }}>
        
        {/* === HEADER SECTION === */}
        {/* Contains the navigation bar, fixed at top of page */}
        <header>
            <Nav />
        </header>

        {/* === MAIN CONTENT SECTION === */}
        {/* flex: 1 makes this section expand to fill available space */}
        {/* This pushes the footer to the bottom even on short pages */}
        <main style={{ 
            flex: 1,               // Grow to fill available space
            width: '100%',
            paddingTop: '0',       // No top padding - breadcrumb provides spacing
            paddingBottom: '2rem',  // Space below content
            backgroundColor: '#ffffff'  // Solid white background
        }}>
            {/* Breadcrumb Navigation */}
            <Breadcrumb />
            
            {/* Full width content - no max-width constraint */}
            {children}
        </main>

        {/* === FOOTER SECTION === */}
        <Footer />
        
        {/* Back to Top Button */}
        <BackToTop />
        </body>
        </html>
    );
}
