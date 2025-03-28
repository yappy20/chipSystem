import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { AdjustChips } from "./AdjustChips";
import "./admin.css";
import { ADMIN_EMAILS } from "./vars";

// Instantiate PrismaClient once outside the component to avoid multiple instances
const prisma = new PrismaClient();

export default async function Page() {
    // Get session data from NextAuth
    const session = await getServerSession(options);

    // If there is no email in the session or the user is not an admin, redirect
    if (!session?.user?.email) {
        redirect('/');
    }
    if (!ADMIN_EMAILS.includes(session.user.email)) {
        redirect('/');
    }

    try {
        // Check if the user already exists in the database
        const existingUser = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        // If the user doesn't exist, add them to the database with initial values
        if (!existingUser) {
            await prisma.user.create({
                data: {
                    email: session.user.email,
                    chips: 0, // or any default value you want
                },
            });
        }

        // Fetch all users from the database
        const users = await prisma.user.findMany();

        // Log all users to the console for debugging
        console.log(users);

        return (
            <table>
                <thead>
                    <tr>
                        <th>email</th>
                        <th>chips</th>
                        <th>adjust</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.email}>
                            <td>{u.email}</td>
                            <td>{u.chips}</td>
                            <td><AdjustChips email={u.email} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    } catch (error) {
        console.error("Error accessing database:", error);
        // Optionally, you could render an error page or return a message to the user
    }
}
