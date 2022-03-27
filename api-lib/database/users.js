import { ObjectId } from "mongodb";
import { join, users } from "./utils";
import bcrypt from "bcrypt";

export async function getUserInfo(client, userId) {
  const result = await users(client).aggregate([
    { $match: { _id: ObjectId(userId) } },
    { $project: { password: 0, createdAt: 0, updatedAt: 0, saved: 0 } },
    ...join("user-relations", "_id", "f", "followers", false),
    // FIXME: head followers detail
    { $addFields: { followers: { $size: "$followers" } } },
  ]);
  return result.next();
}

export async function getUserById(client, id) {
  return getUserBy(client, { _id: ObjectId(id) });
}

export async function getUserByEmailAndPassword(client, email, password) {
  const user = await getUserBy(client, { email: email }, { password: 1 });
  if (!user) throw new Error("email not found");
  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) throw new Error("wrong password");
  return { ...user, password: undefined };
}

export async function getUserBy(client, by, includes = {}) {
  const result = await users(client).aggregate([
    { $match: by },
    { $project: { name: 1, username: 1, email: 1, ...includes } },
  ]);
  return result.next();
}

export async function isUsernameAvailable(client, username) {
  const result = await getUserBy(client, { username });
  if (!result) return true;
  else return false;
}

export async function updateUser(client, id, update) {
  const result = await users(client).updateOne(
    { _id: ObjectId(id) },
    { $set: update }
  );
  return result;
}
