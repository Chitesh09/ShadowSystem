import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { SystemProvider } from "../context/SystemContext";

export const metadata = {
  title: "Shadow System - Life RPG Operating System",
  description: "Futuristic AAA Life RPG Operating System Architecture",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <SystemProvider>
            {children}
          </SystemProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
