import { validationResult } from 'express-validator';
import { errorFormatter, notFoundError } from '../helpers/error.helper';
import responder from '../helpers/responder.helper';
import database from '../models';

export default {
  async index(req, res) {
    try {
      const contacts = await database.contacts.findAll({ where: { user_id: req.user.id } });
      return responder.success(req, res, contacts, { message: 'Contacts have been successfully fetched.' });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async show(req, res) {
    try {
      const contact = await database.contacts.findOne({ where: { id: req.params.id, user_id: req.user.id } });
      if (!contact) { return responder.notFound(res, { errors: [notFoundError('Contact', req.params.id)] }) };
      return responder.success(req, res, contact, { message: 'Contact has been successfully fetched.' });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async create(req, res) {
    try {
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) { return responder.unprocessableEntity(res, { errors: errors.array() }) };

      const contact = await database.contacts.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        clientId: req.body.clientId,
        userId: req.user.id
      });

      return responder.success(req, res, contact, { message: 'Contact has been successfully created.' });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async update(req, res) {
    try {
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) { return responder.unprocessableEntity(res, { errors: errors.array() }) };
      const contact = await database.contacts.findOne({ where: { id: req.params.id, user_id: req.user.id } });
      if (!contact) { return responder.notFound(res, { errors: [notFoundError('Contact', req.params.id)] }) };

      contact.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        clientId: req.body.clientId
      });

      return responder.success(req, res, contact, { message: 'Contact has been successfully updated.' });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async destroy(req, res) {
    try {
      const contact = await database.contacts.findOne({ where: { id: req.params.id, user_id: req.user.id } });
      if (!contact) { return responder.notFound(res, { errors: [notFoundError('Contact', req.params.id)] }) };
      contact.destroy();
      return responder.success(req, res, contact, { message: 'Contact has been successfully deleted.' });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  }
};
