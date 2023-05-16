const conn = require("./conn");
const User = require("./User");
const Sticky = require("./Sticky");
const { faker } = require("@faker-js/faker");

Sticky.belongsTo(User);
User.hasMany(Sticky);

const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({ username: "moe", password: "123" }),
    User.create({ username: "lucy", password: "123" }),
    User.create({ username: "larry", password: "123" }),
    User.create({ username: "ethyl", password: "123" }),
  ]);

  const titles = () => {
    const titles = [];
    for (let i = 0; i < 10; i++) {
      titles.push(faker.random.words(3));
    }
    return titles;
  };

  const colors = [
    "gold",
    "pink",
    "dodgerBlue",
    "seagreen",
    "mediumpurple",
    "silver",
    "orange",
    "indianRed",
    "teal",
  ];

  const fonts = ["verdana", "arial", "times new roman", "fantasy", "monospace"];

  const moesStickies = await Promise.all(
    titles().map((title) => {
      const sticky = Sticky.create({
        title,
        text: faker.lorem.paragraph(2),
        isPublic: true,
        userId: moe.id,
        emojiString: "pizza",
      });
      return sticky;
    })
  );

  const lucysStickies = await Promise.all(
    titles().map((title) => {
      const sticky = Sticky.create({
        title,
        text: faker.lorem.paragraph(2),
        isPublic: true,
        userId: lucy.id,
        emojiString: "heart",
      });
      return sticky;
    })
  );

  const larrysStickies = await Promise.all(
    titles().map((title) => {
      const sticky = Sticky.create({
        title,
        text: faker.lorem.paragraph(2),
        isPublic: true,
        userId: larry.id,
        emojiString: "candy",
      });
      return sticky;
    })
  );

  const ethylsStickies = await Promise.all(
    titles().map((title) => {
      const sticky = Sticky.create({
        title,
        text: faker.lorem.paragraph(2),
        isPublic: true,
        userId: ethyl.id,
        emojiString: "rainbow",
      });
      return sticky;
    })
  );

  await Promise.all([
    moesStickies.map((sticky, i) => {
      if (!!colors[i] && !!fonts[i]) {
        sticky.update({ color: colors[i], font: fonts[i] });
      }
      if (!!colors[i]) {
        sticky.update({ color: colors[i] });
      }
    }),
    lucysStickies.map((sticky, i) => {
      if (!!colors[i] && !!fonts[i]) {
        sticky.update({ color: colors[i], font: fonts[i] });
      }
      if (!!colors[i]) {
        sticky.update({ color: colors[i] });
      }
    }),
    larrysStickies.map((sticky, i) => {
      if (!!colors[i] && !!fonts[i]) {
        sticky.update({ color: colors[i], font: fonts[i] });
      }
      if (!!colors[i]) {
        sticky.update({ color: colors[i] });
      }
    }),
    ethylsStickies.map((sticky, i) => {
      if (!!colors[i] && !!fonts[i]) {
        sticky.update({ color: colors[i], font: fonts[i] });
      }
      if (!!colors[i]) {
        sticky.update({ color: colors[i] });
      }
    }),
  ]);

  await Promise.all([
    Sticky.create({
      title: "Moe's Private Note",
      text: faker.lorem.paragraph(3),
      userId: moe.id,
    }),
    Sticky.create({
      title: "Lucy's Private Note",
      text: faker.lorem.paragraph(3),
      userId: lucy.id,
    }),
    Sticky.create({
      title: "Larry's Private Note",
      text: faker.lorem.paragraph(3),
      userId: larry.id,
    }),
    Sticky.create({
      title: "Ethyl's Private Note",
      text: faker.lorem.paragraph(3),
      userId: ethyl.id,
    }),
  ]);

  return {
    users: {
      moe,
      lucy,
      larry,
      ethyl,
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Sticky,
};
