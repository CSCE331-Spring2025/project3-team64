import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/",
  },
  callbacks: {
    async signIn({ user }) {
      const allowedDomain = "tamu.edu";
      
      if(user.email?.split("@")[1] !== allowedDomain) {
        console.log("Blocked sign in attempt");
        return false;
      }

      return true;
    },
  },
  session: {
    strategy: "jwt",
  }
};
