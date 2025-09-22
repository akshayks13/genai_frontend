import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "./providers";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const hideLayout =
    pathname.endsWith("/auth/login") ||
    pathname.endsWith("/auth/signup") ||
    pathname.endsWith("/auth/forgotpassword");

  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">
            {!hideLayout && <Header />}
            <main className="flex-1">{children}</main>
            {!hideLayout && <Footer />}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}