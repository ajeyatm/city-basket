import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import products from './data/products.js'
import users from './data/users.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    const userArray = await User.insertMany(users)
    const adminUser = userArray[0]._id

    await Product.insertMany(
      products.map((product) => {
        return { ...product, user: adminUser }
      })
    )
    console.log('Data imported!!'.green.inverse)
    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()

    console.log('Data destroyed!!'.bgRed)
    process.exit()
  } catch (error) {
    console.log(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
