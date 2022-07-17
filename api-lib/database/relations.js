import { ObjectId } from "mongodb";
import { join, pagination, userRelations, users } from "./utils";

export async function follow(client, t, f) {
  const result = await userRelations(client).updateOne(
    { t: ObjectId(t), f: ObjectId(f) },
    { $set: { t: ObjectId(t), f: ObjectId(f) } },
    { upsert: true }
  );

  return result;
}

export async function unFollow(client, t, f) {
  const result = await userRelations(client).deleteOne({
    t: ObjectId(t),
    f: ObjectId(f),
  });
  return result;
}

export async function getUserFollowing(client, userId, page, skip, limit) {
  const result = await userRelations(client).aggregate([
    { $match: { t: ObjectId(userId), f: { $ne: ObjectId(userId) } } },
    ...getUserRelations(page, skip, limit),
  ]);

  return result.toArray();
}

export async function getUserFollowers(client, userId, page, skip, limit) {
  const result = await userRelations(client).aggregate([
    { $match: { f: ObjectId(userId), t: { $ne: ObjectId(userId) } } },
    ...getUserRelations(page, skip, limit),
  ]);
  return result.toArray();
}

function getUserRelations(page, skip, limit) {
  return [
    ...join("users", "f", "_id", "following"),
    { $replaceRoot: { newRoot: "$following" } },
    { $project: { _id: 1, name: 1, username: 1, email: 1, about: 1 } },
    ...pagination(page, skip, limit, "users"),
  ];
}
