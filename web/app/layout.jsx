import "./globals.css";
import { Fraunces, Inter } from "next/font/google";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
import MeshGradient from "../components/MeshGradient.jsx";
import SmoothScroll from "../components/SmoothScroll.jsx";

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["opsz"],
});
const body = Inter({ subsets: ["latin"], display: "swap", variable: "--font-body" });

export const metadata = {
  title: "INNIA",
  description:
    "INNIA ayuda a docentes con estrategias prácticas para estudiantes con TDAH y TEA. Funciona 100% en tu computador, sin datos de estudiantes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body>
        <MeshGradient />
        <div className="grain" aria-hidden="true" />
        <SmoothScroll />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
