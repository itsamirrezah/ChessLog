import { getSession } from "next-auth/react";

export default async function withAuth(req, res, next) {
  const session = await getSession({ req });
  if (!session) throw new Error("user is not authenticated");
  req.user = session.user;
  next();
}
