import type { Metadata } from "next";
import "./globals.css";
import { FilterProvider } from "@/context/FilterContext";

export const metadata: Metadata = {
  title: "TaskBoard - Kanban Project Management",
  description: "A modern project management tool with kanban boards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <FilterProvider>
          {children}
        </FilterProvider>
      </body>
    </html>
  );
}
