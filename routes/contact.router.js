import express from 'express';
import passport from 'passport';
import contactController from '../controllers/contact.controller';
import contactService from '../services/contact.service';

export const contactRouter = express.Router();

contactRouter
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), contactController.index)
  .post(passport.authenticate('jwt', { session: false }), contactService.validateCreate, contactController.create);

contactRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), contactController.show)
  .put(passport.authenticate('jwt', { session: false }), contactService.validateUpdate, contactController.update)
  .delete(passport.authenticate('jwt', { session: false }), contactController.destroy);
