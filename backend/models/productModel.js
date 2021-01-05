import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    //user who reviews the product
    name: {
      type: String,
      required: [true, 'Reviewer name is required'],
    },
    rating: { type: Number, required: [true, 'Rating is required'] },
    comment: { type: String, required: [true, 'Comment is required'] },
    user: {
      //user id of the user
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Reviewer id is required'],
      ref: 'User',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const productSchema = mongoose.Schema(
  {
    user: {
      //user who adds product-->admin
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Admin id is required'],
      ref: 'User',
    },
    //product attributes
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    brand: {
      type: String,
      required: [true, 'Brand name is required'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: [true, 'Avg rating is required: default-0'],
      default: 0,
    },
    numReviews: {
      type: Number,
      required: [true, 'Number of reviews required: default-0'],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Price is required: default-0'],
      default: 0,
    },
    countInStock: {
      type: Number,
      required: [true, 'Count in Stock is required: default-0'],
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product
