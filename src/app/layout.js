import Navbar from "@/components/Navbar";
import "./globals.css";
import { Lato } from "next/font/google";

const lato = Lato({ subsets: ["latin"], weight: ["400", "300", "700"] });

export const metadata = {
  title: "To-do App",
  description: "To-do app by next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
