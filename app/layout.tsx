import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Notion Clone",
  description:
    "Clone of the popular Notion App for use with Technatro Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap"
          />
        </head>
        <body className="quicksand">
          <Header />

          <div className="flex min-h-screen">
            {/* Sidebar */}
            <Sidebar />

            <div className="flex-1 p-3 bg-gray-100 overflow-y-auto scrollbar-hide">
              {children}
            </div>
          </div>
          <Toaster position="bottom-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
