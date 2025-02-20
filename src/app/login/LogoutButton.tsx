"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
    return <button className="menuButton logout" onClick={() => signOut()}>Log Out</button>
}