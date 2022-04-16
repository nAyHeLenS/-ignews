import { query as q } from 'faunadb';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { signIn } from 'next-auth/react';
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
        async signIn({user: User,account: Account, profile: Profile})
       
        /**
          async signIn({user, account, profile}){
            const { email } = user

            try{
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Indexes('user_by_email'),
                                    q.Casefold(user.email)
                                )
                            )
                        )
                    ),
                    q.Create(
                        q.Collection('users'),
                        { data: { email } } 
                    ),
                    q.Get(
                        q.Match('user_by_email'),
                        q.Casefold(user.email)
                    )
                    )
                )
            return true
            } catch{
                return false
            }

        }, 
        */
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