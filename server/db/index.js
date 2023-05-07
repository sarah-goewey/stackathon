const conn = require('./conn');
const User = require('./User');
const Sticky = require('./Sticky');

Sticky.belongsTo(User)
User.hasMany(Sticky)

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({ username: 'moe', password: '123'}),
    User.create({ username: 'lucy', password: '123' }),
    User.create({ username: 'larry', password: '123' }),
    User.create({ username: 'ethyl', password: '123' }),
  ]);

  await Promise.all([
    Sticky.create({ title: 'Moe Writes A Sticky', text: 'Just trying this out! So fun.', userId: moe.id}),
    Sticky.create({ title: 'Groceries', text: 'Milk, eggs, broccoli, cheese, tortillas, toilet paper', userId: moe.id})
  ])

  return {
    users: {
      moe,
      lucy,
      larry
    }
  };
};


module.exports = {
  syncAndSeed,
  User,
  Sticky
};
