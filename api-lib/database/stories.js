import { ObjectId } from "mongodb";
import { stories, userRelations, pagination, join } from "./utils";

export async function getTimeline(client, userId, page, skip, limit) {
  const result = await userRelations(client).aggregate([
    {
      $match: { t: ObjectId(userId) },
    },
    ...join("posts", "f", "authorId", "stories"),
    { $replaceRoot: { newRoot: "$stories" } },
    { $project: { content: 0, authorId: 0 } },
    // FIXME: sort by date
    ...pagination(page, skip, limit),
  ]);

  return result.next();
}

export async function getRecentlyStories(client, page, skip, limit) {
  const result = await stories(client).aggregate([
    // FIXME: sort by date
    { $project: { content: 0, authorId: 0 } },
    ...pagination(page, skip, limit),
  ]);

  return result.next();
}

export async function getAllSlugs(client) {
  const result = await stories(client).aggregate([
    { $project: { slug: 1, _id: 0 } },
  ]);
  return result.toArray();
}

export async function getStoryBySlug(client, slug) {
  return await getStoryBy(client, { slug });
}

export async function getStoryById(client, id) {
  return await getStoryBy(client, { _id: ObjectId(id) });
}

export async function clapStory(client, storyId, userId, claps) {
  const result = await stories(client).updateOne(
    { _id: ObjectId(storyId) },
    { $inc: { [`claps.${userId}`]: claps, allClaps: claps } }
  );
  return result;
}

export async function getStoryActionsByUser(client, userId, storyId) {
  const result = await stories(client).aggregate([
    { $match: { _id: ObjectId(storyId) } },
    { $project: { userClaps: `$claps.${userId}`, userId: ObjectId(userId) } },
    ...join("users", "userId", "_id", "user"),
    { $project: { userSaved: `$user.saved.${storyId}`, userClaps: 1 } },
    {
      $project: {
        userSaved: { $ifNull: ["$userSaved", false] },
        userClaps: { $ifNull: ["$userClaps", 0] },
      },
    },
  ]);

  return result.next();
}

export async function getStoryBy(client, by) {
  const result = await stories(client).aggregate([{ $match: by }]);
  return result.next();
}

export async function createStory(client, author) {
  if (
    !author ||
    !author?._id ||
    !author?.name ||
    !author?.username ||
    !author.email
  )
    throw new Error("bad request");

  const story = {
    title: "",
    content: [
      { type: "title", content: "" },
      { type: "header", content: "" },
      { type: "md", content: "" },
    ],
    header: null,
    excerpt: null,
    author,
    slug: null,
    authorId: ObjectId(author._id),
    claps: {},
    allClaps: 0,
    published: false,
  };

  const result = await stories(client).insertOne(story);

  if (!result) throw new Error("insert story failed!");
  //FIXME: don't emit claps//allClaps to client
  return {
    ...JSON.parse(JSON.stringify({ _id: result.insertedId, ...story })),
  };
}
