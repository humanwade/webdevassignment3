import mongoose from 'mongoose';
import config from '../config/config.js';
import User from '../server/models/user.model.js';

const email = process.argv[2];
const newPassword = process.argv[3];

if (!email || !newPassword) {
  console.log('Usage: node scripts/reset-password.js <email> <new-password>');
  console.log('Example: node scripts/reset-password.js admin@example.com MyNewPass123');
  process.exit(1);
}

if (newPassword.length < 6) {
  console.log('Error: Password must be at least 6 characters.');
  process.exit(1);
}

await mongoose.connect(config.mongoUri);

const user = await User.findOne({ email });
if (user === null) {
  console.log('User not found:', email);
  await mongoose.disconnect();
  process.exit(1);
}

user.password = newPassword;
await user.save();

console.log('Password reset OK for', email, `(role: ${user.role})`);
await mongoose.disconnect();
