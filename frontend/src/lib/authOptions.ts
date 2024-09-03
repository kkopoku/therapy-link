import axios from "axios";
import { NextAuthOptions, Session } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const uri = process.env.NEXT_PUBLIC_SERVER_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        type: { label: "Type", type: "text" },
      },

      async authorize(credentials, req): Promise<any | {}> {

        if (!credentials) {
          throw new Error("Please provide all required login credentials");
        }

        const { email, password } = credentials

        const response = await axios.post(`${uri}/api/v1/auth/login`, {
          email,
          password
        }).catch(err => {
          console.log(err.response.data)
          throw err.response.data
        })

        const user = {
          id: response.data.user._id,
          email: response.data.user.email,
          name: response.data.user.firstName + ' ' + response.data.user.otherNames,
          type: response.data.user.userType,
          token: response.data.token,
        };

        return user;
      },
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 6 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },

    async session({ token, session }) {
      if (token) {
        session.user = token.user as Session["user"];
      }

      return session;
    },
  },
};

export default NextAuth(authOptions)
