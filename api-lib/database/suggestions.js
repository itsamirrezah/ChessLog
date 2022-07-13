import { ObjectId } from "mongodb";
import { join, userRelations } from "./utils";

export async function suggestAuthors(client, userId) {
  const data = await userRelations(client).aggregate([
    {
      $facet: {
        following: [
          {
            $match: { t: ObjectId(userId) },
          },
          { $project: { f: 1, _id: 0 } },
        ],
        all: [
          ...join("users", "f", "_id", "user"),
          { $replaceRoot: { newRoot: "$user" } },
          { $project: { username: 1, about: 1, name: 1 } },
          { $group: { _id: "$_id", user: { $first: "$$ROOT" } } },
          { $replaceRoot: { newRoot: "$user" } },
          {
            $match: {
              username: { $not: { $eq: null } },
              _id: { $not: { $eq: ObjectId(userId) } },
            },
          },
        ],
      },
    },
    {
      $project: {
        followingIds: {
          $map: { input: "$following", as: "id", in: "$$id.f" },
        },
        all: 1,
      },
    },
    {
      $project: {
        all: {
          $filter: {
            input: "$all",
            as: "user",
            cond: { $not: { $in: ["$$user._id", "$followingIds"] } },
          },
        },
      },
    },
    { $unwind: "$all" },
    { $replaceRoot: { newRoot: "$all" } },
    { $sample: { size: 3 } },
    { $addFields: { isFollowed: false } },
  ]);

  return data.toArray();
}
