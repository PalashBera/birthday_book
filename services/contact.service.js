import { check } from 'express-validator';
import database from '../models';

module.exports = {
  validateCreate: [
    check('firstName')
      .exists().withMessage('First name should be present.').bail()
      .isString().withMessage('First name should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('First name can\'t be blank.'),

    check('lastName')
      .exists().withMessage('Last name should be present.').bail()
      .isString().withMessage('Last name should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Last name can\'t be blank.'),

    check('clientId')
      .exists().withMessage('Client ID should be present.').bail()
      .isString().withMessage('Client ID should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Client ID can\'t be blank.').bail()
      .custom(async (value, { req, loc, path }) => {
        const contact = await database.contacts.findOne({ where: { clientId: value, user_id: req.user.id } });
        if (contact) return Promise.reject('Client ID has already been taken.');
      })
  ],

  validateUpdate: [
    check('firstName')
      .exists().withMessage('First name should be present.').bail()
      .isString().withMessage('First name should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('First name can\'t be blank.'),

    check('lastName')
      .exists().withMessage('Last name should be present.').bail()
      .isString().withMessage('Last name should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Last name can\'t be blank.'),

    check('clientId')
      .exists().withMessage('Client ID should be present.').bail()
      .isString().withMessage('Client ID should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('Client ID can\'t be blank.').bail()
      .custom(async (value, { req, loc, path }) => {
        const contact = await database.contacts.findOne({ where: { clientId: value, user_id: req.user.id } });
        if (contact && contact.id.toString() !== req.params.id) return Promise.reject('Client ID has already been taken.');
      })
  ]
};
