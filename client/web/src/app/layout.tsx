import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";

import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fantasy DraftBoard",
  description: "Fantasy football draft board",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme 
          accentColor="orange" 
          grayColor="sand" 
          radius="medium" 
          scaling="95%"
          panelBackground='translucent' 
          appearance='inherit'
        >
          {children}
        </Theme>
      </body>
    </html>
  );
}
