import type { NextAuthOptions, User } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client';

interface MyUser extends User {
    id: string; // Make sure id is a string, as expected by NextAuth
    name: string;
    password: string;
}

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         username: { label: "Username", type: "text", placeholder: "username" },
        //         password: { label: "Password", type: "password", placeholder: "password" },
        //     },
        //     async authorize(credentials) {
        //         const user: MyUser = { id: '1', name: 'DAVE', password: 'nextAuth' }

        //         if (credentials?.username === user.name && credentials?.password === user.password) {
        //             return user
        //         } else {
        //             return null
        //         }
        //     }
        // })
    ],
    secret: process.env.NEXT_AUTH_SECRET,
    callbacks: {
        async signIn({ user }) {
            if (!user.email) return false;
            const prisma = new PrismaClient();
            prisma.user.upsert({
                where: { email: user.email },
                update: {},
                create: { email: user.email, chips: 0 }
            })
            return true;
        },
    }
}
