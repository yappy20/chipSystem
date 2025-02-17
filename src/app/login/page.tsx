import Link from "next/link";
import { LoginButton } from "./LoginButton";
import { BackButton } from "./BackButton";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
export default async function Login() {
    const session = await getServerSession(options);

    return (
        <main className="LogINcontainer">
            <div className="LogINcontent">
                <h1>Login Page</h1>
                {session?.user ? JSON.stringify(session.user) : <>
                    <p>Please enter your credentials to continue.</p>
                    <div style={{ display: "flex", gap: "10px" }}>
                        {/* <Link href="menu">
                        <button className="menuButton">Log in</button>
                    </Link> */}
                        <LoginButton />
                        <BackButton />
                    </div>
                </>}
            </div>
        </main>
    );
}
