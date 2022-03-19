import { connectDatabase } from "../database/utils";

export default async function withDatabase(req, res, next) {
  const client = await connectDatabase();
  if (!client) throw new Error("cannot connect to server.");
  req.db = client;
  next();
}
