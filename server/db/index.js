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

  await Promise.all([
    titles().map((title) => {
      Sticky.create({
        title,
        text: faker.lorem.paragraph(3),
        isPublic: true,
        userId: moe.id,
        color: "seagreen",
        emojiString: "pizza",
      });
    }),
    titles().map((title) => {
      Sticky.create({
        title,
        text: faker.lorem.paragraph(3),
        isPublic: true,
        userId: lucy.id,
        font: "fantasy",
      });
    }),
    titles().map((title) => {
      Sticky.create({
        title,
        text: faker.lorem.paragraph(3),
        isPublic: true,
        userId: larry.id,
        color: "pink",
        font: "arial",
      });
    }),
    titles().map((title) => {
      Sticky.create({
        title,
        text: faker.lorem.paragraph(3),
        isPublic: true,
        userId: ethyl.id,
        color: "dodgerBlue",
        font: "times new roman",
      });
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
