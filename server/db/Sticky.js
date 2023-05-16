const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, ENUM } = conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;
const emoji = require("node-emoji");

const Sticky = conn.define("sticky", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  title: {
    type: STRING,
    allowNull: false,
    defaultValue: "New Sticky",
  },
  text: {
    type: TEXT,
  },
  color: {
    type: ENUM(
      "gold",
      "pink",
      "dodgerBlue",
      "seagreen",
      "mediumpurple",
      "silver",
      "orange",
      "indianRed",
      "teal"
    ),
    allowNull: false,
    defaultValue: "gold",
  },
  font: {
    type: ENUM("verdana", "arial", "times new roman", "fantasy", "monospace"),
    allowNull: false,
    defaultValue: "verdana",
  },
  isPublic: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  emojiString: {
    type: STRING,
  },
});

Sticky.addHook("beforeSave", (sticky) => {
  if (!!sticky.emojiString && !emoji.hasEmoji(sticky.emojiString)) {
    const searchResult = emoji.search(sticky.emojiString.slice(0, 3));
    if (searchResult.length) {
      sticky.emojiString = searchResult[0].key;
    } else {
      sticky.emojiString = null;
    }
  }
});

module.exports = Sticky;
