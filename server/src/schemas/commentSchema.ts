import { object, string, TypeOf } from 'zod';

export const createCommentSchema = object({
  params: object({
    userId: string(),
  }),
  body: object({
    parentId: string() || null,

    content: string({
      required_error: 'Content is required',
    }),
  }),
});

export const allCommentChildSchema = object({
  params: object({
    id: string(),
  }),
});

export type CreateCommentInput = TypeOf<typeof createCommentSchema>;

export type AllCommentChild = TypeOf<typeof allCommentChildSchema>['params'];
