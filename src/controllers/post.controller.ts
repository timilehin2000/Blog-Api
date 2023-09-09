import { NextFunction, Request, Response } from "express";
import { PostInstance } from "../models/post.model";
import { IPostRepository } from "../repository/post.repository";
import { errorResponse, successResponse } from "../utils/responses";
import logger from "../utils/logger";
import formatLog from "../utils/logger/formatLogs";
import { capitalize } from "../utils/helpers/util";
import { Op } from "sequelize";

class PostController {
  postRepositoy: IPostRepository<PostInstance>;

  constructor(postRepository: IPostRepository<PostInstance>) {
    this.postRepositoy = postRepository;
  }

  addPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { title, content, category } = req.body;

    const { id, firstName, lastName } = req.user;

    try {
      const post = await this.postRepositoy.create({
        title,
        content,
        userId: id,
        category,
        author: capitalize(`${firstName} ${lastName}`),
      } as PostInstance);

      return successResponse(res, 201, "New post added successful", post);
    } catch (error) {
      return next(error);
    }
  };

  fetchPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { page, limit, author, title, category } = req.query;

    const pageNo = page ? Number(page) : 1;
    const pageLimit = limit ? Number(limit) : 10;
    const skip = pageNo === 1 ? 0 : pageLimit * (pageNo - 1);

    const searchParams: { [key: string]: any } = {};

    if (title) {
      searchParams.title = { [Op.iLike]: `%${title}%` };
    }
    if (category) {
      searchParams.category = { [Op.iLike]: `%${category}%` };
    }
    if (author) {
      searchParams.author = { [Op.iLike]: `%${author}%` };
    }

    try {
      const posts = await this.postRepositoy.findAll({
        limit: pageLimit,
        offset: skip,
        where: searchParams,
      });

      logger.info(
        formatLog(req, "Successfully Fetched Posts uploaded by user")
      );
      return successResponse(res, 200, "Posts fetched successful", posts);
    } catch (error) {
      return next(error);
    }
  };

  fetchPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.user;

    const { postId } = req.params;

    try {
      const post = await this.postRepositoy.findOne({
        where: { id: postId },
      });

      if (!post) {
        return errorResponse(res, 404, "Could not find this post. Try again");
      }

      logger.info(
        formatLog(req, "Successfully Fetched post uploaded by Users")
      );
      return successResponse(res, 200, "Post fetched successfully", post);
    } catch (error) {
      return next(error);
    }
  };

  editPost = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;

    const { postId } = req.params;
    const { title, content } = req.body;

    try {
      const post = await this.postRepositoy.update(
        { title, content } as PostInstance,
        { where: { userId: id, id: postId } }
      );

      if (!post) {
        return errorResponse(res, 404, "Could not find this post. Try again");
      }

      logger.info(formatLog(req, "Successfully edited post uploaded by Users"));
      return successResponse(res, 200, "Post edited successfully", null);
    } catch (error) {
      return next(error);
    }
  };

  deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.user;

    const { postId } = req.params;

    try {
      await this.postRepositoy.delete({
        where: { id: postId, userId: id },
      });

      logger.info(formatLog(req, "Successfully delete post uploaded by Users"));
      return successResponse(res, 200, "Post edited successfully", null);
    } catch (error) {
      return next(error);
    }
  };
}

export default PostController;
