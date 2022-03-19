import { ObjectId } from "mongodb";
async function getPosts(client, filter, exclude) {
  const collection = client.db().collection("posts");
  const result = await collection
    .find(filter ? filter : {})
    .project(exclude ? exclude : {})
    .toArray();
  return result.map((p) => ({ ...p, _id: p._id.toString() }));
}

// export async function getAllFeaturedPosts(client) {
//   return getPosts(client, { isFeatured: true }, { content: 0 });
// }

// export async function getAllPosts(client) {
//   return getPosts(client, null, { content: 0 });
// }

// export async function getPostByList(client, list) {
//   return getPosts(client, { _id: { $in: list } }, { content: 0 });
// }

export async function getAllPostLinks(client) {
  return getPosts(client, null, { slug: 1 });
}

async function getPost(client, filter, exclude) {
  const collection = client.db().collection("posts");
  const post = await collection.findOne(filter ? filter : {}, {
    projection: exclude ? exclude : {},
  });
  return { ...post, _id: post._id.toString() };
}

export async function getPostByLink(client, titleLink) {
  return getPost(client, { slug: titleLink }, null);
}

export async function getPostById(client, id) {
  return getPost(client, { _id: ObjectId(id) });
}

export async function insertPost(client, post) {
  const collection = client.db().collection("posts");
  const result = await collection.insertOne({ ...post });
  return result;
}

export async function addLike(client, postId, user) {
  const collection = client.db().collection("posts");
  const result = await collection.updateOne(
    { _id: ObjectId(postId) },
    { $push: { likes: user } }
  );
  return result;
}

export async function updatePost(client, postId, post) {
  const collection = client.db().collection("posts");
  const result = await collection.updateOne(
    { _id: ObjectId(postId) },
    { $set: { ...post } }
  );
  return result;
}

// export async function getPostByFollowing(client, followingIds) {
//   const posts = client.db().collection("posts");

//   const result = await posts
//     .aggregate([
//       {
//         $match: {
//           $expr: {
//             $in: ["$author.id", followingIds],
//           },
//         },
//       },
//     ])
//     .toArray();

// return result;
// }
