import { CHECK_CREDENTIALS_URL, LOGIN_URL } from "@/lib/apiEndpoints";
import axios from "axios";
import { AuthOptions, ISODateString } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export type CustomSession = {
  user?: CustomUser;
  expires: ISODateString;
};

export type CustomUser = {
  //we are creating a custom type for our user, as it contains one additional parameter, i.e. token
  id?: string | null;
  name?: string | null;
  email?: string | null;
  token?: string | null;
};
//next auth provides us with callbacks too, which are of 4 types: signin, session, jwt ,redirect. we will be using only two of them here: session and jwt
export const authOptions: AuthOptions = {
  pages: {
    signIn: "/login",
  },
  // Configure one or more authentication providers
  callbacks: {
    async session({
      session,
      user,
      token,
    }: {
      session: CustomSession;
      token: JWT;
      user: CustomUser;
    }) {
      // if we click and see the type of this session argument,it has 3 parameters: id, name, email.we need custom session to handle out our token too.
      session.user = token.user as CustomUser; //getting the current user from the token
      return session;
    },
    //what is being done is: jwt callback is returning us the token and the same token is being use to set the session.user
    async jwt({ token, user }: { token: JWT; user: CustomUser | null }) {
      if (user) {
        token.user = user; //setting the current user into the token.
        //this user we are getting from the credential provider. Inside the authorize method, we are getting it
      }
      return token;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {}, //we could have used those options inside the email and password. It would give us pre-generated auth pages that nextauth provides. but, since we are using our own auth pages, we dont need them.
        password: {},
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { data } = await axios.post(LOGIN_URL, credentials);
        const user = data?.data; //since we are setting the user inside data from backend.

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    // ...add more providers here
  ],
};
