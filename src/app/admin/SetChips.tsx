"use client";
import { useState } from "react";
import { setChips as setChipsBE } from "./actions";

export function SetChips({
  email,
  update,
}: {
  email: string;
  update: (newChips: number) => void;
}) {
  const [chips, setChips] = useState("0");
  const [loading, setIsLoading] = useState(false);

  async function onClick() {
    const numChips = Number(chips);
    if (isNaN(numChips)) {
      alert("thats not a number");
      return;
    }
    setIsLoading(true);
    const newChips = await setChipsBE(email, numChips);
    if (newChips === null) {
      alert("Something happened, pls sign out and then back in <3");
      return;
    }
    setChips("0");
    update(newChips);
    setIsLoading(false);
  }

  return (
    <div>
      <input
        type="number"
        value={chips}
        onChange={(e) => setChips(e.target.value)}
        disabled={loading}
      />
      <button onClick={onClick}>Set chips</button>
    </div>
  );
}
