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
        <body className="d-flex flex-column min-vh-100">
        <header>
            <Nav />
        </header>

        <main className="flex-grow-1 py-4">
            <div className="container">{children}</div>
        </main>

        <footer className="bg-light text-center text-muted py-3 mt-auto border-top">
            <div className="container">
                <p className="mb-0">© {new Date().getFullYear()} Pride STEM Canada</p>
            </div>
        </footer>
        </body>
        </html>
    );
}
