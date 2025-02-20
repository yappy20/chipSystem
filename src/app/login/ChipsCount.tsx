import { PrismaClient } from "@prisma/client";

export async function ChipsCount({ email }: { email: string }) {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({ where: { email: email } });
    return <p className='chipcount'>Your chips: {user?.chips ?? 0}</p>
    // const user x/
}