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
        <body style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
            paddingTop: '70px',
            margin: 0,
            padding: 0
        }}>
        <header>
            <Nav />
        </header>

        <main style={{ 
            flex: 1, 
            width: '100%',
            paddingTop: '2rem',
            paddingBottom: '2rem'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                paddingLeft: '1rem',
                paddingRight: '1rem'
            }}>
                {children}
            </div>
        </main>

        <footer style={{
            background: '#f9f9f9',
            textAlign: 'center',
            color: '#666',
            padding: '2rem 1rem',
            marginTop: 'auto',
            borderTop: '1px solid #e0e0e0'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <p style={{ margin: 0 }}>© {new Date().getFullYear()} Pride STEM Canada. All rights reserved.</p>
            </div>
        </footer>
        </body>
        </html>
    );
}
