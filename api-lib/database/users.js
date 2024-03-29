import { ObjectId } from "mongodb";
import { join, userRelations, users } from "./utils";
import bcrypt from "bcrypt";

export async function getUserInfo(client, userId, includes) {
  const result = await users(client).aggregate([
    { $match: { _id: ObjectId(userId) } },
    { $project: { password: 0, createdAt: 0, updatedAt: 0, saved: 0 } },
    ...join("user-relations", "_id", "f", "followers", false),
    { $addFields: { followers: { $size: "$followers" } } },
    ...join("user-relations", "_id", "t", "following", false),
    { $addFields: { following: { $size: "$following" } } },

    ...(includes?.stories
      ? [...join("stories", "_id", "authorId", "stories", false)]
      : []),
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

export async function getUserIds(client) {
  const result = await users(client)
    .find({})
    .project({ _id: { $toString: "$_id" } })
    .toArray();
  return result;
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

export async function insertUser(client, email, password) {
  const hash = await bcrypt.hash(password, 12);

  const session = client.startSession();

  let user;
  try {
    await session.withTransaction(async () => {
      user = await users(client).insertOne(
        {
          email,
          password: hash,
          username: null,
          name: "Anonymous",
          createdAt: new Date(),
          updatedAt: new Date(),
          about: null,
        },
        { session }
      );

      await userRelations(client).insertOne(
        {
          t: ObjectId(user.insertedId),
          f: ObjectId(user.insertedId),
        },
        { session }
      );
    });
  } catch (e) {
    console.error(e);
    return null;
  } finally {
    await session.endSession();
    await client.close();
  }

  return user.insertedId;
}

export async function findUserByEmail(client, email) {
  const user = await users(client).findOne({ email });
  return user;
}
