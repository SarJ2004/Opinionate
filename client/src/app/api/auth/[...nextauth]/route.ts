import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
//copied this template from the documentation
import { authOptions } from "./options";
const handler = NextAuth(authOptions);
export { handler as POST, handler as GET }; //post when we decide to login the user, and get when we decide to fetch the user details.
