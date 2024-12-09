import type { User as CustomUser } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        loginkey: { label: "loginkey", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const response = await fetch(`http://localhost:8888/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              loginkey: credentials.loginkey,
              password: credentials.password,
            }),
            credentials: "include",
          });

          const data = await response.json();

          if (response.ok && data.canLogin) {
            return {
              ...data.user,
              token: data.token,
              refreshToken: data.refreshToken,
            };
          } else {
            throw new Error(data);
          }
        } catch (error) {
          console.error("Error during login:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GG_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GG_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const response = await fetch(
            `http://localhost:8888/api/auth/google`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                googleId: account.providerAccountId,
                displayName: user.name,
                email: user.email,
              }),
              credentials: "include",
            },
          );
          const data = await response.json();
          if (response.ok && data.canLogin) {
            (account as any).userData = data.data;
            return {
              ...data.data.user,
              token: data.data.token,
              refreshToken: data.data.refreshToken,
            };
          } else {
            throw new Error(data);
          }
        } catch (error) {
          console.error("Error during Google login:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, session, trigger, account }) {
      if (account?.provider === "google" && user) {
        token.user = {
          ...(account as any).userData.user,
          token: (account as any).userData.token,
          refreshToken: (account as any).userData.refreshToken,
        };
      } else if (user) {
        token.user = {
          ...user,
          token: (user as any).token,
          refreshToken: (user as any).refreshToken,
        };
      }

      if (trigger === "update") {
        token = { ...token, ...session };
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user as any; // Cast token.user as your custom User type
      return session;
    },
  },
  pages: {
    signIn: "/auth", // Custom path for sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
});

export { handler as GET, handler as POST };
