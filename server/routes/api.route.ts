import * as express from 'express';
import { inspirationRouter } from './api/inspiration.route';
import { userRouter } from './api/user.route';

const router = express.Router();
router.use('/inspiration', inspirationRouter);
router.use('/user', userRouter);

export const apiRouter = router;
