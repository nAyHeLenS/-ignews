import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
// import Providers from 'next-auth/providers';


export default NextAuth({

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
    ],

    //database: process.env.DATABASE_URL
})

/**
 * * Para integrar o github na aplicação precisamos de duas informações Client ID e Client Secret
 * precisamos criar uma aplicação dentro do github para atenticação
*  */