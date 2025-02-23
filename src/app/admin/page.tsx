import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { AdjustChips } from "./AdjustChips";
import "./admin.css";
import { ADMIN_EMAILS } from "./vars";


export default async function Page() {
    const session = await getServerSession(options);
    if (!session?.user?.email) redirect('/');
    if (!ADMIN_EMAILS.includes(session.user.email)) redirect('/');
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany();
    return <table>
        <thead>
            <tr>
                <th>email</th>
                <th>chips</th>
                <th>adjust</th>
            </tr>
        </thead>
        <tbody>
            {users.map(u => <tr key={u.email}>
                <td>{u.email}</td>
                <td>{u.chips}</td>
                <td><AdjustChips email={u.email} /></td>
            </tr>)}
        </tbody>
    </table>
}

//tada it works
//but u have to refresh the page cause server side rendering and im lazy

//i refreshed
//u see it work
//the url is http://localhost:3000/admin

//it works however now there needs to be away to get to that page for the admin
//like that?

//yes
//soooooo
//sooo
//now make it look pretty
//i do and its not that
//u dont know what perfection looks like