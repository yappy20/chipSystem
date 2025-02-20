"use client";

import { useState } from "react";
import "./texasHoldem.css";

// Define a basic deck of cards
const suits = ["hearts", "diamonds", "clubs", "spades"];
const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

function createDeck() {
    const deck: any[] = [];
    suits.forEach((suit) => {
        ranks.forEach((rank) => {
            deck.push({ rank, suit, value: getCardValue(rank) });
        });
    });
    return deck;
}

function getCardValue(rank: string) {
    if (rank === "A") return 14;
    if (rank === "K") return 13;
    if (rank === "Q") return 12;
    if (rank === "J") return 11;
    return parseInt(rank);
}

function shuffleDeck(deck: any[]) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function getBestHand(hand: any[], communityCards: any[]) {
    // Combine hand and community cards
    const allCards = [...hand, ...communityCards];
    // Simplified best hand selection logic (e.g., checking for pairs, straights, etc.)
    const ranksCount: { [key: string]: number } = {};
    allCards.forEach((card) => {
        ranksCount[card.rank] = (ranksCount[card.rank] || 0) + 1;
    });

    // Check for pairs or higher hands
    let pairs = 0;
    for (let rank in ranksCount) {
        if (ranksCount[rank] === 2) pairs++;
    }

    if (pairs === 1) return "One Pair";
    if (pairs === 2) return "Two Pair";
    return "High Card";
}

export default function TexasHoldem() {
    const [playerHand, setPlayerHand] = useState<any[]>([]);
    const [communityCards, setCommunityCards] = useState<any[]>([]);
    const [gameStatus, setGameStatus] = useState("");
    const [deck, setDeck] = useState(createDeck());

    const startGame = () => {
        shuffleDeck(deck);
        const newDeck = [...deck]; // Create a copy of the deck to avoid modifying the state directly
        const playerHand = [newDeck.pop(), newDeck.pop()];
        const communityCards = [newDeck.pop(), newDeck.pop(), newDeck.pop(), newDeck.pop(), newDeck.pop()];

        // Check if cards are dealt properly
        if (!playerHand[0] || !playerHand[1] || communityCards.some(card => !card)) {
            console.error("Error: Cards were not dealt properly.");
            return;
        }

        setPlayerHand(playerHand);
        setCommunityCards(communityCards);
        setGameStatus("Game started! Waiting for actions...");
        setDeck(newDeck);
    };

    const checkHand = () => {
        const handResult = getBestHand(playerHand, communityCards);
        setGameStatus(`Your best hand is: ${handResult}`);
    };

    return (
        <main className="texas-holdem-container">
            <h1>Texas Hold'em Game</h1>
            <div className="game-status">{gameStatus}</div>

            <div className="hands">
                <div className="player-hand">
                    <h3>Your Hand:</h3>
                    {playerHand.filter(card => card).map((card, index) => (
                        <span key={index}>
                            {card.rank} of {card.suit} |{" "}
                        </span>
                    ))}
                </div>

                <div className="community-cards">
                    <h3>Community Cards:</h3>
                    {communityCards.filter(card => card).map((card, index) => (
                        <span key={index}>
                            {card.rank} of {card.suit} |{" "}
                        </span>
                    ))}
                </div>
            </div>

            <div className="actions">
                <button onClick={startGame}>Start Game</button>
                <button onClick={checkHand}>Check Hand</button>
            </div>
        </main>
    );
}
"use client";
import Link from "next/link";


export default function Home() {
    return (
        <main className="centered"> {/* Use centered class */}
            <div className="content">
                <h1>Welcome to The Demo Chip System</h1>
                <p>This is a Next.js app using the App Router and TypeScript.</p>
                <Link href="login">
                    <button className="GetStartedbutton">Get Started</button>
                </Link>
            </div>
        </main>
    );
}
