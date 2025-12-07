import 'dotenv/config';
import { connectDB } from '../utils/db.js';
import { Sale } from '../models/Sale.js';

const main = async () => {
  await connectDB();
  const count = await Sale.countDocuments();
  console.log('Total sales documents:', count);
  process.exit(0);
};

main().catch((err) => {
  console.error('Count error:', err);
  process.exit(1);
});