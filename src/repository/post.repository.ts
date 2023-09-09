import { UpdateOptions } from "sequelize";
import { PostInstance } from "../models/post.model";
import Repository, { IRepository } from "./repository";

export interface IPostRepository<PostInstance>
  extends IRepository<PostInstance> {
  create(data: PostInstance): Promise<any>;
  update(data: PostInstance, update: UpdateOptions): Promise<any>;
}

class PostRepository extends Repository<PostInstance> {
  create = async (data: PostInstance): Promise<any> => {
    const { title, content, userId, category, author } = data;

    const post = await this.model.create({
      title,
      content,
      userId,
      category,
      author,
    });
    return post;
  };

  update = async (data: PostInstance, updates: UpdateOptions): Promise<any> => {
    const post = await this.model.update(data, updates);
    return post;
  };
}

export default PostRepository;
