import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const MAX_IMPORT_USERS = 3;
const MAX_IMPORT_PRODUCTS = 5;

const MAX_DESTROY_USERS = 3;
const MAX_DESTROY_PRODUCTS = 5;

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users.slice(0, MAX_IMPORT_USERS));

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.slice(0, MAX_IMPORT_PRODUCTS).map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    const deletedUsers = await User.deleteMany().limit(MAX_DESTROY_USERS);
    const deletedProducts = await Product.deleteMany().limit(MAX_DESTROY_PRODUCTS);
    await Order.deleteMany();

    console.log(`Data Destroyed! Users: ${deletedUsers.deletedCount}, Products: ${deletedProducts.deletedCount}`.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
