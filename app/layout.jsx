export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <header>
                    <SiteHeader />
                </header>
                <main>
                    {children}
                </main>
                <footer>
                    <SiteFooter />
                </footer>
            </body>
        </html>
    );
}

function SiteHeader() {
    return <h1>Test heading</h1>
}

function SiteFooter() {
    return <p>Test footer text</p>
}