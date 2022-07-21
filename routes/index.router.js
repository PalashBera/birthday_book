import express from 'express';
import { userRouter } from './user.router';
import { contactRouter } from './contact.router';

export const rootRouter = express.Router();
rootRouter.use('/users', userRouter);
rootRouter.use('/contacts', contactRouter);
