import "./globals.css";
import styles from "./layout.module.css";
import Nav from "./Nav"; // Import the client component

export const metadata = {
    title: "Pride STEM Canada",
    description: "Celebrating 2SLGBTQ+ voices in STEM across Canada",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <header className={styles.header}>
            <div className={styles.headerInner}>
                <p className={styles.logo}>🌈 Pride STEM Canada</p>
                <Nav />
            </div>
        </header>

        <main className={styles.main}>{children}</main>

        <footer className={styles.footer}>
            <div className={styles.footerInner}>
                <p>© {new Date().getFullYear()} Pride STEM Canada</p>
            </div>
        </footer>
        </body>
        </html>
    );
}
