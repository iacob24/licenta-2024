const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./server/models/User');

const dbURI = 'mongodb://localhost:27017/job-portal';

mongoose.connect(dbURI, {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

async function createUser(name, username, email, plainPassword, role) {
  const userExists = await User.findOne({ email });
  if (userExists) {
    console.log(`User with email ${email} already exists.`);
    return;
  }

  const hashedPassword = await bcrypt.hash(plainPassword, 10);
  const user = new User({
    name,
    username,
    email,
    password: hashedPassword,
    role,
    date: new Date()
  });

  await user.save();
  console.log(`User ${username} created successfully`);
}

async function main() {
  await createUser('Cara Teodora', 'carateodora', 'cara.teodora@yahoo.com', 'Password', 'freelancer');
  await createUser('Andrei Iacob', 'andrei', 'andrei.iacob26@yahoo.com', 'Password123', 'entrepreneur');

  // Adaugă mai mulți utilizatori după nevoie
  mongoose.connection.close();
}

main().catch(err => console.log(err));
