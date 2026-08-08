import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { SystemProvider } from "../context/SystemContext";
import AppLayout from "../components/layout/AppLayout";

export const metadata = {
  title: "Shadow System - Life RPG Operating System",
  description: "Futuristic AAA Life RPG Operating System Architecture",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <SystemProvider>
            <AppLayout>
              {children}
            </AppLayout>
          </SystemProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
