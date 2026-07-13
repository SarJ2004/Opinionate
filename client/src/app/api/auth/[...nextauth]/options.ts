import { CHECK_CREDENTIALS_URL, LOGIN_URL, GOOGLE_LOGIN_URL } from "@/lib/apiEndpoints";
import axios from "axios";
import { AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export type CustomSession = {
  user?: CustomUser;
  expires: ISODateString;
};

export type CustomUser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  token?: string | null;
};

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const { data } = await axios.post(GOOGLE_LOGIN_URL, {
            email: user.email,
            name: user.name,
            oauth_id: user.id,
            provider: "google",
          });
          const customUser = data?.data;
          if (customUser) {
            (user as CustomUser).token = customUser.token;
            (user as CustomUser).id = customUser.id.toString();
            return true;
          }
          return false;
        } catch (error) {
          console.error("Google Auth Backend Sync Error", error);
          return false;
        }
      }
      return true;
    },
    async session({
      session,
      token,
    }: {
      session: CustomSession;
      token: JWT;
      user: CustomUser;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },
    async jwt({ token, user }: { token: JWT; user: CustomUser | null }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { data } = await axios.post(LOGIN_URL, credentials);
        const user = data?.data;

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
