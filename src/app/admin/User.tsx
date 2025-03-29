"use client";

import { useState } from "react";
import { AdjustChips } from "./AdjustChips";
import { SetChips } from "./SetChips";

export function User({
  defaultChips,
  email,
}: {
  defaultChips: number;
  email: string;
    }) {
    const [chips, setChips] = useState(defaultChips);
    
  return (
    <tr key={email}>
      <td>{email}</td>
      <td>{chips}</td>
      <td>
        <AdjustChips email={email} update={setChips} />
      </td>
      <td>
        <SetChips email={email} update={setChips} />
      </td>
    </tr>
  );
}
