"use client";

import { signIn } from "next-auth/react";

export function LoginButton() {
    return <button className="menuButton" onClick={() => signIn()}>Log in</button>
}