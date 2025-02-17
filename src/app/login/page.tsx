"use client";
import Link from "next/link";
export default function Login() {
    return (
        <main className="LogINcontainer">
            <div className="LogINcontent">
                <h1>Login Page</h1>
                <p>Please enter your credentials to continue.</p>
                <div style={{ display: "flex", gap: "10px" }}>
                    <Link href="menu">
                        <button className="menuButton">Log in</button>
                    </Link>
                    <button className="GoBackbutton" onClick={() => history.back()}>Go back</button>
                </div>
            </div>
        </main>
    );
}
