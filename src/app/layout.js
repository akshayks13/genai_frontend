import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "CareerAI - AI-Powered Career Advisor",
  description: "Empowering students and professionals with AI-driven career guidance, skill mapping, and personalized roadmaps for the future of work.",
  keywords: "career advice, AI career guidance, skill assessment, career roadmap, job trends",
  authors: [{ name: "CareerAI Team" }],
  openGraph: {
    title: "CareerAI - AI-Powered Career Advisor",
    description: "Get personalized career guidance powered by AI",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
