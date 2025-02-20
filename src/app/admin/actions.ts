"use server";
import { PrismaClient } from "@prisma/client";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { ADMIN_EMAILS } from "./page";

export async function addChips(email: string, amount: number) {
    const session = await getServerSession(options);
    if (!session?.user?.email) return;
    if (!ADMIN_EMAILS.includes(session.user.email)) return;
    const prisma = new PrismaClient();
    await prisma.user.update({
        where: { email },
        data: {
            chips: { increment: amount }
        }
    })
}
