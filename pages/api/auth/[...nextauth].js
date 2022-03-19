import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { findUserByEmailAndPassword } from "../../../api-lib/database/_users";
import { connectDatabase } from "../../../api-lib/database/utils";

export default NextAuth({
  callbacks: {
    async jwt({ token, user, profile, account, isNewUser }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ user, session, token }) {
      session.user = token.user;
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        const mongoClient = await connectDatabase();
        const user = await findUserByEmailAndPassword(
          mongoClient,
          email,
          password
        );
        if (!user) {
          throw new Error("email or password is wrong.");
        }
        return { id: user._id.toString(), email: user.email };
      },
    }),
  ],
});
