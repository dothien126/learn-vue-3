import { Request, Response } from 'express';

import UserModel from '../models/userModel';
import { AllCommentChild, CreateCommentInput } from '../schemas/commentSchema';
import { createComment, findCommentById } from '../services/commentService';

export const createCommentHandler = async (
  req: Request<CreateCommentInput['params'], {}, CreateCommentInput['body']>,
  res: Response
) => {
  try {
    const { userId } = req.params;

    // create a todo
    const data = req.body;
    const comment = await createComment(data);

    const user = await UserModel.findOne({ userId });
    if (!user) {
      return res.status(404).json('User is not exist');
    }

    // assign todo for user
    comment.user = user;
    await comment.save();

    // add todoList for user
    user.commentList.push(comment._id);
    await user.save();
    console.log(user.commentList);

    const id = data.parentId;
    if (id) {
      comment.parent_id.push(comment._id);
      comment.path = `${id}#${comment._id}`;
      await comment.save();
    } else {
      null;
    }

    return res.status(201).json({ commentList: comment });
  } catch (e: any) {
    return res.status(500).json(e);
  }
};

export const getAllCommentChild = async (req: Request<AllCommentChild>, res: Response) => {
  try {
    const { id } = req.params;
    const comment = await findCommentById(id);
    if (!comment) {
      return res.status(404).json('Comment is not exist');
    }

    const commentList = comment.parent_id

    return res.status(200).json({ ListComment: commentList });
  } catch (e: any) {
    return res.status(500).json(e);
  }
};
