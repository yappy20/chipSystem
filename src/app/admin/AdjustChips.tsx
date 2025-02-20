"use client";
import { useState } from "react";
import { addChips } from "./actions";

export function AdjustChips({ email }: { email: string }) {
    const [chips, setChips] = useState(0);

    return <div>
        <input type='number' value={chips} onChange={(e) => setChips(Number(e.target.value))} />
        <button onClick={() => {
            addChips(email, chips).then(() => {
                alert('yessir');
                setChips(0);
            })
        }}>Add chips</button>
    </div>
}