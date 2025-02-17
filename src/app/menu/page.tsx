"use client";

import Link from "next/link";
import "./menu.css"; // Correct relative import
// Correct relative import

export default function Menu() {
    return (
        <main className="Menucontainer">
            <div className="Menucontent">
                <h1>Menu</h1>
                <nav className="menu-nav">
                    <ul>
                        <li>
                            <Link href="/">🏠 Home</Link>
                        </li>
                        <li>
                            <Link href="/texas_holdem">Texas Holdem</Link>
                        </li>
                        <li>
                            <Link href="/black_jack">Black Jack</Link>
                        </li>
                        <li>
                            <Link href="/roulette">Roulette</Link>
                        </li>
                        <li>
                            <Link href="/slot_machine">Slot Machine</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </main>
    );
}
