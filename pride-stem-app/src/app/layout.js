import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "My Next.js App",
  description: "A simple Next.js app with a shared layout",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav style={{backgroundColor: "lightblue"}}>
            <ul style={{ display: "flex", gap: "1rem", listStyle: "none" }}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About Us</Link></li>
                <li> <Link href="/governance">Governance</Link></li>
                <li> <Link href="/conference">Conference</Link></li>
                <li> <Link href="/vendors">Vendors</Link></li>
                <li> <Link href="/contact">Contact Us</Link></li>
            </ul>
          </nav>

        </header>

        <main style={{ padding: "0px" }}>
          {children}
        </main>

        <footer style={{ textAlign: "center", marginTop: "2rem"}}>
          <p>© {new Date().getFullYear()} Pride STEM Canada</p>
        </footer>
      </body>
    </html>
  );
}