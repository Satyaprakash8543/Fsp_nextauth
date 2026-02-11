import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import connectDb from "./db";
import User from "@/models/user_model";
import bcrypt from "bcryptjs";

//Summary=>NextAuth.js ek authentication library hai Next.js ke liye.
//sign in
//token generate
// Store user details inside the token.
//session ke auder user ki detail dalni hai token se.

const authOptions: NextAuthOptions = {
  //email password se authontication karana or (Cradentials provider)
  providers: [
    // Provider means login kaise karoge.
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        //When you come to the login page, all the fields should be .
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      //How to sign in proccess
      //email password
      //email check === user exist
      //check password
      //signin successfully
      //user data

      async authorize(credentials, req) {
        let email = credentials?.email;
        let password = credentials?.password;
        if (!email || !password) {
          throw new Error("email or password is not found");
        }
        await connectDb();
        let user = await User.findOne({ email });
        if (!user) {
          throw new Error("user not found");
        }
        //  compare password
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("incorrect Password");
        }
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),

    // Login google

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, //give me string
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    //signIn
    async signIn({ account, user }) {
      if (account?.provider == "google") {
        await connectDb();
        let existUser = await User.findOne({ email: user?.email });
        if (!existUser) {
          let existUser = await User.create({
            name: user.name,
            email: user?.email,
          });
        }
        user.id = existUser._id as string;
      }
      return true
    },

    //token generete
    // Store user details inside the token.
    //token is basicaly object hota hai
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },

    //User details will be added to the session from the token. and define type next-auth.d.ts file(create)
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image as string;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 day again login //30day24hour in day 60 minute 60 second 1000 millesecond
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXT_AUTH_SECRET,
};
export default authOptions;
//sign in
//token generate
//token ke ander user detial daal di.
//session ke auder user ki detail dalni hai token se.
