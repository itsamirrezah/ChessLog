// import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

// export async function findUserByEmailAndPassword(client, email, password) {
//   const user = await findUserByEmail(client, email);
//   if (!user) return false;
//   const isEqual = await bcrypt.compare(password, user.password);
//   if (!isEqual) return false;
//   return { ...user, password: undefined };
// }

// export async function getUserById(client, userId) {
//   const users = client.db().collection("users");
//   const user = await users.findOne({ _id: ObjectId(userId) });
//   return user;
// }

// export async function insertUser(client, email, password) {
//   const hash = await bcrypt.hash(password, 12);
//   const collection = client.db().collection("users");
//   const { insertedId } = await collection.insertOne({
//     email,
//     password: hash,
//     username: null,
//     name: "Anonymous",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     about: null,
//   });
//   return insertedId;
// }

// export async function getUserFollowingIds(client, userId) {
//   const userRelation = client.db().collection("user-relations");
//   const result = await userRelation
//     .find({ t: ObjectId(userId) })
//     .project({ f: 1, _id: 0 })
//     .toArray();

//   return result.map((d) => d.f);
// }

// export async function getUserFollowing(client, userId) {
//   const userRelation = client.db().collection("user-relations");
//   const result = await userRelation
//     .aggregate([
//       {
//         $match: {
//           t: ObjectId(userId),
//         },
//       },
//       {
//         $lookup: {
//           from: "users",
//           localField: "f",
//           foreignField: "_id",
//           as: "following",
//         },
//       },
//       { $unwind: "$following" },
//       {
//         $project: {
//           "following._id": 1,
//         },
//       },
//     ])
//     .toArray();

//   return result.map((u) => u.following._id.toString());
// }

export async function isFollowing(client, userId, followingUserId) {
  const userRelation = client.db().collection("user-relations");
  const relation = await userRelation.findOne({
    t: ObjectId(userId),
    f: ObjectId(followingUserId),
  });
  return !!relation;
}

export async function getUserFollowers(client, userId) {
  const userRelation = client.db().collection("user-relations");
  const result = await userRelation
    .aggregate([
      {
        $match: {
          f: ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "t",
          foreignField: "_id",
          as: "followers",
        },
      },
      { $unwind: "$followers" },
      {
        $project: {
          "followers._id": 1,
        },
      },
    ])
    .toArray();

  return result.map((u) => u.followers._id.toString());
}

// export async function unfollowUser(client, t, f) {
//   const userRelation = client.db().collection("user-relations");
//   const result = await userRelation.deleteOne({
//     t: ObjectId(t),
//     f: ObjectId(f),
//   });
//   return result;
// }

// export async function getUsers(client, excludes) {
//   const collection = client.db().collection("users");
//   const users = await collection.find({ _id: { $nin: excludes } }).toArray();
//   return users;
// }

// export async function getUserSavedPosts(client, userId) {
//   const user = await getUserById(client, userId);

//   const saved = user?.saved || {};
//   return Object.entries(saved)
//     .filter((row) => !!row[1])
//     .map((row) => ObjectId(row[0]));
// }
