import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import {
  getUserByEmailAndPassword,
  getUserById,
} from "../../../api-lib/database/users";
import { connectDatabase } from "../../../api-lib/database/utils";

export default function handler(req, res) {
  return NextAuth(req, res, {
    callbacks: {
      async jwt({ token, user, profile, account, isNewUser }) {
        let newUser = user;
        if (newUser) {
          token.user = user;
        }
        if (req.query.update) {
          const client = await connectDatabase();
          newUser = await getUserById(client, token.user.id);
          token.user = {
            id: newUser._id,
            email: newUser.email,
            username: newUser.username,
            name: newUser.name,
          };
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
          const client = await connectDatabase();
          const user = await getUserByEmailAndPassword(client, email, password);

          return {
            id: user._id,
            email: user.email,
            username: user.username,
            name: user.name,
          };
        },
      }),
    ],
  });
}
