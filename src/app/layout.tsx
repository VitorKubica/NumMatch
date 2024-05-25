import type { Metadata } from "next";
import { Montserrat } from 'next/font/google';
import './globals.css';

const work = Montserrat({
  subsets: ['latin'],
})


export const metadata: Metadata = {
  title: "NumMatch - Nandita",
  description: "NumMatch - facilitator for Nandita",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={work.className}>{children}</body>
    </html>
  );
}
