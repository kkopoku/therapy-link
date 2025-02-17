import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "@/providers/providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: '%s | Therapy Link',
    default: 'Therapy Link'
  },
  description: "Safe Space",
};

export default function RootLayout({
  children,
  session
}: Readonly<{
  children: React.ReactNode
  session: any
}>) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </Provider>
    </html>
  );
}
