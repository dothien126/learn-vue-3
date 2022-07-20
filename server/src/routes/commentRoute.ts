import express from 'express';
import { createCommentHandler, getAllCommentChild } from '../controllers/commentController';

import validate from '../middleware/validate';
import { allCommentChildSchema, createCommentSchema } from '../schemas/commentSchema';

const router = express.Router();

router.post('/api/comment/create/:userId/', validate(createCommentSchema), createCommentHandler);
router.get('/api/comment/commentchild/:id', validate(allCommentChildSchema), getAllCommentChild);

export default router;
