import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Nav from "./Nav";

export const metadata = {
    title: "Pride STEM Canada",
    description: "Celebrating 2SLGBTQ+ voices in STEM across Canada",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body
            className="d-flex flex-column min-vh-100"
            style={{
                scrollBehavior: "smooth",
                perspective: "1000px",
                backgroundColor: "#ffffff",
                backgroundImage:
                    "radial-gradient(at 40% 20%, hsla(320,100%,76%,0.1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(280,100%,76%,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(320,100%,76%,0.1) 0px, transparent 50%)",
                backgroundAttachment: "fixed",
            }}
        >
        {/* Header */}
        <header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.85)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
            }}
        >
            <div className="loading-bar"></div>
            <Nav />
        </header>

        {/* Main Content */}
        <main
            className="flex-grow-1"
            style={{
                paddingTop: "2rem",
                paddingBottom: "4rem",
                transform: "translateZ(0)",
                willChange: "transform",
                overflowX: "hidden",
            }}
        >
            <div
                className="container"
                style={{
                    opacity: 1,
                    transform: "translateY(0)",
                    transition:
                        "opacity 0.6s ease-out, transform 0.6s ease-out",
                }}
            >
                {children}
            </div>
        </main>

        {/* Footer */}
        <footer className="bg-light text-center text-muted py-3 mt-auto border-top">
            <div className="container">
                <p suppressHydrationWarning className="mb-0">
                    © {new Date().getFullYear()} Pride STEM Canada
                </p>
            </div>
        </footer>
        </body>
        </html>
    );
}
