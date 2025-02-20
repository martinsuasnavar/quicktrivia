import type { Metadata } from "next";
import NavBar from "./components/containers/navbar";
import localFont from "next/font/local";
import "./globals.css";
import "../../styles.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased background`}
      >
        <NavBar></NavBar>
        {children}
        <footer className="bg-black p-2 text-center">
          <div>QuickTrivia ©</div>
          <div> Trivia API provided by <a href="https://opentdb.com/">Open Trivia Database</a></div>
        
          <div className="rounded-md font-semibold mt-10 bg-white text-black w-28 mx-auto p-0.5">CONTACT</div>
          <a href="https://suasnavardev.vercel.app">➤ suasnavar.dev</a>
        </footer>
      </body>
    </html>
  );
}
