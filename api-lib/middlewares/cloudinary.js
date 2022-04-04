import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_secret_key,
});

export default function withCloudinary(directory) {
  return (req, res, next) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: directory,
      },
      function (error, result) {
        if (error)
          return res.status(500).json({
            message: "cloudinary error, " + error.message,
          });

        if (result) {
          req.cloudinaryUrl = result.secure_url;
          next();
        }
      }
    );

    Readable.from(req.file.buffer).pipe(uploadStream);
  };
}
