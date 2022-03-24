import { ObjectId } from "mongodb";

async function getPost(client, filter, exclude) {
  const collection = client.db().collection("posts");
  const post = await collection.findOne(filter ? filter : {}, {
    projection: exclude ? exclude : {},
  });
  return { ...post, _id: post._id.toString() };
}

export async function getPostById(client, id) {
  return getPost(client, { _id: ObjectId(id) });
}

export async function insertPost(client, post) {
  const collection = client.db().collection("posts");
  const result = await collection.insertOne({ ...post });
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
