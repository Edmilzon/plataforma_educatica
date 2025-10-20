import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const HANDLE = NextAuth({
      providers : [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID! as String,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as String!, 
        })
    ]
}) ; 

export { HANDLE as GET, HANDLE as POST };