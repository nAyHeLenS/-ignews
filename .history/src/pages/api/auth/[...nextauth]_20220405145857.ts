import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
// import Providers from 'next-auth/providers';


export default NextAuth({

    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            authorization: {
                params:{
                    scope: 'read-user',
                }
            }
        }),
    ],
})

// README.md -line 29
