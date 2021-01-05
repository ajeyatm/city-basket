import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

//@desc  Fetches all products
//@route GET /api/products
//@access PUBLIC
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
  res.json(products)
})

//@desc  Fetches signle product
//@route GET /api/product/:id
//@access PUBLIC
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found..')
  }
})
