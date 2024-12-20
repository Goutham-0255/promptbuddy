import Provider from "@components/Provider";
import NextAuth from "next-auth";
import { signIn } from "next-auth/react";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from '@utils/database';
import User from '@models/user';


const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    redirect_uri: 'https://prompt-point-blue.vercel.app/api/auth/callback/google'
                }
            }
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            });
    
            session.user.id = sessionUser._id.toString();
    
            return session;
        },
        async signIn({ account, credentials, user, profile }){
            try {
                await connectToDB();
                
    
                // if a user already exist
                const userExists = await User.findOne({
                    email: profile.email
                });
                //if not, creeate new user
                if (!userExists){
                    console.log('creating new user',profile.email);

                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ","").toLowerCase(),
                        image: profile.picture
                    })
                }
                return true;
    
            } catch (error) {
                console.log(error)
                return session;
            }
        }
    
    }
})

export {handler as GET, handler as POST};