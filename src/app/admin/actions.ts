"use server";
import { PrismaClient } from "@prisma/client";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { ADMIN_EMAILS } from "./vars";


export async function addChips(email: string, amount: number) {
    const session = await getServerSession(options);
    if (!session?.user?.email) return null;
    if (!ADMIN_EMAILS.includes(session.user.email)) return null;
    const prisma = new PrismaClient();
    const user = await prisma.user.update({
        where: { email },
        data: {
            chips: { increment: amount }
        }
    })
    return user.chips;
}

export async function setChips(email: string, amount: number) {
    const session = await getServerSession(options);
    if (!session?.user?.email) return null;
    if (!ADMIN_EMAILS.includes(session.user.email)) return null;
    const prisma = new PrismaClient();
    const user = await prisma.user.update({
        where: { email },
        data: {
            chips: amount
        }
    })
    return user.chips;
}
