'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];
const db = {};

const MODELS_DIR = path.join(__dirname, 'models');
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: Op,
});

// sequelize.sync({
//   force: true
// });

fs
  .readdirSync(MODELS_DIR)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(MODELS_DIR, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
  switch (modelName) {

    case 'Message': db[modelName].sync({ force: true });
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Op;

module.exports = db;
