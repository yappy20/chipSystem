import type { NextAuthOptions, User } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient(); // Singleton PrismaClient

interface MyUser extends User {
    id: string;
    name: string;
    password: string;
}

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET, // Fixed typo (should be NEXTAUTH_SECRET, not NEXT_AUTH_SECRET)
    callbacks: {
        async signIn({ user }) {
            if (!user.email) return false;
            try {
                await prisma.user.upsert({
                    where: { email: user.email },
                    update: {},
                    create: { email: user.email, chips: 0 }
                });
                return true;
            } catch (error) {
                console.error("Error during signIn:", error);
                return false;
            }
        },
    }
};
