import withImageParser from "../../../api-lib/middlewares/image-parser";
import { insertPost, updatePost } from "../../../api-lib/database/posts";
import globalHandler from "../../../api-lib/nc";
import withDatabase from "../../../api-lib/middlewares/database";
import { getRecentlyStories } from "../../../api-lib/database/stories";

const handler = globalHandler();
handler.use(withDatabase);

handler.get(async (req, res, next) => {
  const { ...pageParams } = req.query;
  const page = +pageParams.page;
  const limit = +pageParams.limit;

  const latestStories = await getRecentlyStories(
    req.db,
    page,
    page * limit,
    limit
  );
  res.status(200).json(latestStories);
});

handler.post(withImageParser, async (req, res, next) => {
  let { title, content, author } = req.body;
  const image = req.files.image;
  //todo: validation post
  const post = {
    isFeatured: !!Math.floor(Math.random() * 2),
    title,
    content,
    link: title.toLowerCase().replace(/ /g, "-"),
    excerpt: content.substring(0, 20),
    date: new Date().toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    }),
    image: image ? image.filepath.split("public")[1] : "",
    author: JSON.parse(author),
  };

  const result = await insertPost(req.db, post);
  if (!result) res.status(500).json({ message: "Insert post failed!" });
  res.status(201).json({
    message: "Insert successfully",
    postLink: `/posts/${post.link}`,
  });
});

handler.put(withImageParser, async (req, res, next) => {
  const post = req.body;
  const image = req.files.image;
  post.image = image ? image.filepath.split("public")[1] : "";

  let updatedPost = {};
  for (let key in post) {
    const value = post[key];
    if (!value || key === "id") continue;
    updatedPost = { ...updatedPost, [key]: value };
  }

  const result = await updatePost(req.db, post.id, updatedPost);
  if (!result) return res.status(500).end();

  res.status(200).end();
});

export const config = {
  api: { bodyParser: false },
};

export default handler;
