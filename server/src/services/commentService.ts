import CommentModel, { Comment } from '../models/commentModel';

export function createComment(input: Partial<Comment>) {
  return CommentModel.create(input);
}

export async function findCommentById(id: string) {
  return await CommentModel.findById(id);

}