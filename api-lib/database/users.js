import { ObjectId } from "mongodb";
import { join, users } from "./utils";

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
