import "./globals.css";
import { Fraunces, Inter } from "next/font/google";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["opsz"],
});
const body = Inter({ subsets: ["latin"], display: "swap", variable: "--font-body" });

export const metadata = {
  title: "INNIA — Asistente pedagógico para aulas inclusivas (TDAH y TEA)",
  description:
    "INNIA ayuda a docentes con estrategias prácticas para estudiantes con TDAH y TEA. Funciona 100% en tu computador, sin datos de estudiantes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body>
        <div className="aurora" aria-hidden="true">
          <span className="aurora-a" />
          <span className="aurora-b" />
          <span className="aurora-c" />
        </div>
        <div className="grain" aria-hidden="true" />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
