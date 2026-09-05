import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DepthRail from '../components/DepthRail';

export const metadata = {
  title: 'Dhruv Singh Bisht — AI/ML Engineer & Unmanned Systems Builder',
  description:
    'Portfolio of Dhruv Singh Bisht — AI/ML engineering student building autonomous underwater vehicles, robotics allocation systems, and full-stack applications.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <DepthRail />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
