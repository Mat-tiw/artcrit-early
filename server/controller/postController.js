import Post from "../model/Post.js";
import Image from "../model/Image.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import multer from "multer";
import crypto from "crypto";
import User from "../model/User.js";
function generateRandomString(length) {
  return crypto.randomBytes(length).toString("hex");
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "D:/Desktop/artcrit-alpha/artcrit-early/server/public";
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const randomString = generateRandomString(5);
    cb(null, `${randomString}${file.originalname}`);
  },
});

const upload = multer({ storage });

export const createPost = async (req, res) => {
  let userId = 1;
  const { postTitles, postBadge } = req.body;
  const files = req.files;
  try {
    const post = await Post.create({
      post_title: postTitles,
      post_badge: postBadge,
      user_id: userId,
    });
    const imagePromises = files.map(async (image) => {
      return await Image.create({
        image_path: `http://localhost:3030/static/${image.filename}`,
        post_id: post.id_post,
      });
    });
    await Promise.all(imagePromises);
    res.status(200).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const testFile = (req, res) => {
  const files = req.body.files;
  console.log(files);
};
export const getAllPost = async (req, res) => {
  try {
    const postsWithImages = await Post.findAll({
      include: [
        {
          model: Image,
          attributes: ['id_image', 'image_path'],
        },
        {
          model: User,
          attributes: ['id_user', 'user_name', 'user_email', 'user_avatar'],
        },
      ],
    });

    res.json(postsWithImages);
  } catch (error) {
    console.error('Error fetching posts and images:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const uploadPostImage = upload.array("files", 4);