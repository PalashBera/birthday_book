const config = require('../config/database.js')[process.env.NODE_ENV || 'development'];

import Sequelize from 'sequelize';

const sequelize = new Sequelize(`${config.url}?sslmode=${config.sslmode}`, {
  dialect: config.dialect,
  logging: config.logging,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle
  }
});

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize
};

db.users = require('./user.js')(sequelize, Sequelize);
db.contacts = require('./contact.js')(sequelize, Sequelize);

// Association between users and contacts
db.users.hasMany(db.contacts, { foreignKey: 'user_id' });
db.contacts.belongsTo(db.users, { foreignKey: 'user_id' });

module.exports = db;
