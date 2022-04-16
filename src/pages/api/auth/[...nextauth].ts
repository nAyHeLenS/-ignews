<<<<<<< HEAD
import { log } from 'console';
=======
>>>>>>> e218f72ffa34985af87100f497ef1633d431b98e
import { sign } from 'crypto';
import { query as q } from 'faunadb';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
<<<<<<< HEAD
=======
import { signIn } from 'next-auth/react';
import { userInfo } from 'os';
>>>>>>> e218f72ffa34985af87100f497ef1633d431b98e
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
<<<<<<< HEAD
                            q.Collection('users'),
=======
                            q.Collection('user'),
>>>>>>> e218f72ffa34985af87100f497ef1633d431b98e
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
<<<<<<< HEAD
            }  catch (err) {
                console.log(err)
=======
            }  catch {
>>>>>>> e218f72ffa34985af87100f497ef1633d431b98e
                return false
            }
        }
    }
})



<<<<<<< HEAD
// README.md - line 29
// verificar sintaxe 
=======
// README.md -line 29
>>>>>>> e218f72ffa34985af87100f497ef1633d431b98e
