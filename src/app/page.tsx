"use client";
import SlotMachine from "./slot_machine/page";
import Link from "next/link";
import "./globals.css"; // Import global styles
import "./page.css"

export default function Home() {
  return (
    <main className="centered"> {/* Use centered class */}
      <div className="content">
        <h1>Welcome to The Chip System</h1>
        {/* <p>This is a Next.js app using the App Router and TypeScript.</p> */}
        <Link href="login">
          <button className="GetStartedbutton">Get Started</button>
        </Link>
        <SlotMachine />
      </div>
    </main>
  );
}
