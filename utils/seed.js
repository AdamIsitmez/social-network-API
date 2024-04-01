const connection = require('../config/connection');
const { User, Thought } = require('../models');
const usersData = require('./userSeedData.json')
const thoughtData = require('./thoughtSeedData.json');
const { ifError } = require('assert');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  try {
    const userSeeds = await User.insertMany(usersData)
    console.log("Users created:", userSeeds);
  } catch (err) {
    console.error("Error creating users:", err);
  }

  try {
    const thoughtSeeds = await Thought.insertMany(thoughtData)
    console.log("Thoughts created:", thoughtSeeds);
    console.log(thoughtSeeds)
    for (const thought of thoughtSeeds) {
      const user = await User.findOne({ username: thought.username });

      if (user) {
        user.thoughts.push(thought._id);
        await user.save();
      }
    }
  } catch (err) {
    console.error("Error creating thoughts:", err);
  }

  process.exit(0);
});

async function getUsers() {
  try {
    const users = await User.find();
    console.log(users);
  } catch (error) {
    console.error('Error:', error);
  }
}

getUsers();
