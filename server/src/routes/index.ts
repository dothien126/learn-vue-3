import express from 'express';

import userRoute from './userRoute';
import authRoute from './authRoute';
import todoRoute from './todoRoute';
import commentRoute from './commentRoute';

const router = express.Router();

router.get('/home', (_, res) => res.sendStatus(200));

router.use(userRoute);
router.use(authRoute);
router.use(todoRoute);
router.use(commentRoute);

export default router;
