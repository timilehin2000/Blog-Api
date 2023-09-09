import express, { Router } from "express";
import { addPostValidation } from "../validators/post/post.validators";
import { postController } from "../di/controllerLoccator";
import requiresSignIn from "../middleware/auth/requireLogin";

const postRoutes: Router = express.Router();

postRoutes.use(requiresSignIn);

postRoutes.post("/add", addPostValidation, postController.addPost);
postRoutes.get("/fetchposts", postController.fetchPosts);
postRoutes.get("/fetchPost/:postId", postController.fetchPost);
postRoutes.patch("/editPost/:postId", postController.editPost);
postRoutes.delete("/deletePost/:postId", postController.deletePost);

export default postRoutes;
