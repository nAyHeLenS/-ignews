import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],

    //database: process.env.DATABASE_URL
})
