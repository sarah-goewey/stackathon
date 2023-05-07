const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, ENUM } = conn.Sequelize;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;


const Sticky = conn.define('sticky', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  title: {
    type: STRING,
    allowNull: false,
    defaultValue: 'New Sticky',
  },
  text: {
    type: TEXT
  },
  color: {
    type: ENUM ('gold', 'pink', 'dodgerBlue', 'seagreen', 'mediumpurple', 'silver'),
    allowNull: false,
    defaultValue: 'gold'
  },
  font: {
    type: ENUM ('verdana', 'arial', 'times new roman', 'fantasy'),
    allowNull: false,
    defaultValue: 'verdana'
  },
  isPublic: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
})

module.exports = Sticky