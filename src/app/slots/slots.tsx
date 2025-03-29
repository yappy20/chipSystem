"use client";

import { useReducer, useState } from "react";
import styles from "./style.module.css";

const SLOT_EMOJIS = ["🍒", "🍋", "🍉", "🍇", "🔔", "⭐", "7️⃣", "🍀"];

type Action =
  | {
      type: "RESET";
    }
  | { type: "SET_END"; payload: [number, number, number] };

type State = {
  wheel1: number;
  wheel2: number;
  wheel3: number;
  spinSpeed: string | null;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "RESET":
      return { wheel1: 0, wheel2: 0, wheel3: 0, spinSpeed: null };
    case "SET_END":
      return {
        wheel1: action.payload[0],
        wheel2: action.payload[1],
        wheel3: action.payload[2],
        spinSpeed: "7s",
      };
  }
}

function toIndex(num: number) {
  return num % SLOT_EMOJIS.length;
}

export function Slots() {
  const [slots, dispatch] = useReducer(reducer, {
    wheel1: 0,
    wheel2: 0,
    wheel3: 0,
    spinSpeed: null,
  });
  const [spinSpeed, setSpinSpeed] = useState<string | undefined>(undefined);

  function startSlots() {
    const serverValues = [0, 2, 4];
    const wheel1Random = Math.floor(Math.random() * 5) * SLOT_EMOJIS.length;
    const wheel2Random = Math.floor(Math.random() * 5) * SLOT_EMOJIS.length;
    const wheel3Random = Math.floor(Math.random() * 5) * SLOT_EMOJIS.length;
    dispatch({
      type: "SET_END",
      payload: [
        wheel1Random + serverValues[0],
        wheel2Random + serverValues[1],
        wheel3Random + serverValues[2],
      ],
    });
  }

    const numIcons1 = slots.wheel1 !== 0 ? slots.wheel1 + 1 : 3;
        const numIcons2 = slots.wheel2 !== 0 ? slots.wheel2 + 1 : 3;
        const numIcons3 = slots.wheel3 !== 0 ? slots.wheel3 + 1 : 3;


    
  return (
    <>
      <div className={styles.Machine}>
        <div
          className={styles.Slot}
          style={{
            translate: `0 -${((numIcons1 - 1) / (numIcons1)) * 100}%`,
            transition: `translate ${slots.spinSpeed}`,
          }}
        >
          {Array(numIcons1)
            .fill(null)
            .map((_, index) => (
              <p key={index}>{SLOT_EMOJIS[toIndex(index)]}</p>
            ))}
        </div>
        <div>
          {Array(numIcons2)
            .fill(null)
            .map((_, index) => (
              <p key={index}>{SLOT_EMOJIS[toIndex(index)]}</p>
            ))}
        </div>
        <div>
          {Array(numIcons3)
            .fill(null)
            .map((_, index) => (
              <p key={index}>{SLOT_EMOJIS[toIndex(index)]}</p>
            ))}
        </div>
      </div>
      <button onClick={startSlots}>Start</button>
    </>
  );
}
