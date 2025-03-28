"use client";
import "./slot_machine.css";
import { useState } from "react";

export default function SlotMachine() {
    // Symbols for the reels
    const symbols = ["🍒", "🍋", "🍊", "🍉", "🍇", "🍓"];
    
    // State for each reel
    const [reel1, setReel1] = useState<string>("🍒");
    const [reel2, setReel2] = useState<string>("🍋");
    const [reel3, setReel3] = useState<string>("🍊");

    // Function to generate a random symbol
    const getRandomSymbol = () => {
        return symbols[Math.floor(Math.random() * symbols.length)];
    };

    // Spin function
    const spin = () => {
        setReel1(getRandomSymbol());
        setReel2(getRandomSymbol());
        setReel3(getRandomSymbol());
    };

    // Check for win condition
    const checkWin = () => {
        if (reel1 === reel2 && reel2 === reel3) {
            return "You Win!";
        }
        return "Try Again!";
    };

    return (
        <main className="centered">
            <div className="content">
                <h1>Welcome to The Slot Machine</h1>
                <p>This is a Next.js app using the App Router and TypeScript.</p>

                <div className="slot-machine">
                    <div className="reel">{reel1}</div>
                    <div className="reel">{reel2}</div>
                    <div className="reel">{reel3}</div>
                </div>

                <button onClick={spin} className="spin-btn">
                    Spin
                </button>

                <h2>{checkWin()}</h2>
            </div>
        </main>
    );
}
