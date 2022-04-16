import { sign } from 'crypto';
import { query as q } from 'faunadb';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { signIn } from 'next-auth/react';
import { userInfo } from 'os';
import { fauna } from '../../../services/fauna';

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
    callbacks: {
        async signIn({ user: User, account: Account, profile: Profile }){
            const { email } = User

            try{
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'),
                                    q.Casefold(User.email)
                                )
                            )
                        ),
                        q.Create(
                            q.Collection('user'),
                            { data: { email } }
                        ),
                        q.Get(
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(User.email)
                            )
                        )
                    )
                )

               return true
            }  catch {
                return false
            }
        }
    }
})



// README.md -line 29

/**
 q.Create(
  q.Collection('users'),
  { 
    data: { email }
  }
 */