import Link from "next/link";
import { LoginButton } from "./LoginButton";
import { BackButton } from "./BackButton";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { LogoutButton } from "./LogoutButton";
import { ChipsCount } from "./ChipsCount";

import './login.css';
import { ADMIN_EMAILS } from "../admin/vars";
export default async function Login() {
    const session = await getServerSession(options);


    return (
        <main className="LogINcontainer">
            <div className="LogINcontent">
                {session?.user?.email ?
                    <div className="loggedincontainer">
                        <h1>Logged in as {session.user.name}</h1>
                        <ChipsCount email={session.user.email} />
                        {ADMIN_EMAILS.includes(session.user.email) && <Link href="/admin" className="adminlink">To the admin page</Link>}
                        <LogoutButton />
                    </div>
                    : <>
                        <p>Please enter your credentials to continue.</p>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <LoginButton />
                            <BackButton />
                        </div>
                    </>}
            </div>
        </main>
    );
}

