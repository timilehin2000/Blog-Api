// import PostRepository from "../repository/post.repository";
import PostModel, { PostInstance } from "../models/post.model";
import AuthController from "../controllers/auth.controller";
import UserModel, { UserInstance } from "../models/user.model";
import UserRepository from "../repository/user.repository";
import { ModelStatic } from "../repository/repository";
import PostController from "../controllers/post.controller";
import PostRepository from "../repository/post.repository";

const userRepository = new UserRepository(
  UserModel as ModelStatic<UserInstance>
);
const postRepository = new PostRepository(
  PostModel as ModelStatic<PostInstance>
);

const authController = new AuthController(userRepository);
const postController = new PostController(postRepository);

export { authController, postController };
