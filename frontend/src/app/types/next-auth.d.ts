import NextAuth, { User, type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      token: string;
      type: string;
    };
  }
  interface User {
    id: string;
      email: string;
      token: string;
      type: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      email: string;
      token: string;
      type: string;
    };
  }
}
