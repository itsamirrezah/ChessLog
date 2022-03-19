import formidable from "formidable";
import path from "path";

export default function withImageParser(req, res, next) {
  const form = new formidable.IncomingForm({
    multiples: false,
    uploadDir: path.join(process.cwd(), "public", "images", "posts"),
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res
        .status(422)
        .json({ message: "something went wrong while parsing image." });
    }
    req.body = fields;
    req.files = files;
    next();
  });
}
