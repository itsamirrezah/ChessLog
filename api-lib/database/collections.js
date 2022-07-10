import { users, join } from "./utils";
import { ObjectId } from "mongodb";

function getCollections(userId) {
  return [
    {
      $match: {
        _id: ObjectId(userId),
      },
    },
    {
      $project: {
        saved: { $ifNull: ["$saved", {}] },
        _id: 0,
      },
    },
  ];
}
export async function getSavedStoryIds(client, userId) {
  const result = await users(client).aggregate([...getCollections(userId)]);

  return result.next();
}

export async function getRecentlySavedStories(client, userId) {
  const result = await users(client).aggregate([
    // FIXME: sort by bookmark date
    ...getCollections(userId),
    {
      $project: {
        saved: { $objectToArray: "$saved" },
        _id: 0,
      },
    },
    { $unwind: "$saved" },
    { $replaceRoot: { newRoot: "$saved" } },

    {
      $facet: {
        totalCount: [{ $count: "total" }],
        stories: [
          { $project: { k: { $toObjectId: "$k" } } },
          ...join("stories", "k", "_id", "stories"),
          { $replaceRoot: { newRoot: "$stories" } },
          { $project: { content: 0, authorId: 0 } },
          { $limit: 5 },
        ],
      },
    },
    // FIXME: look for simpler solution for zero saved story state
    {
      $project: {
        stories: 1,
        totalCount: {
          $cond: {
            if: { $eq: ["$totalCount", []] },
            then: { total: 0 },
            else: "$totalCount",
          },
        },
      },
    },
    { $unwind: "$totalCount" },
    {
      $replaceRoot: {
        newRoot: { stories: "$stories", total: "$totalCount.total" },
      },
    },
  ]);

  return result.next();
}

export async function saveStory(client, userId, storyId, isSaved) {
  const updateOpt = isSaved
    ? { $set: { [`saved.${storyId}`]: true } }
    : { $unset: { [`saved.${storyId}`]: true } };

  const result = await users(client).updateOne(
    { _id: ObjectId(userId) },
    updateOpt,
    {
      upset: true,
    }
  );
  return result;
}
