import { ObjectId } from "mongodb";
import { userRelations } from "./utils";

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
