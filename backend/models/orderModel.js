import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    user: {
      //user connected with the order
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'User Id for this order is required'],
      ref: 'User',
    },
    orderItems: [
      //list of products ordered
      {
        name: {
          type: String,
          required: [true, 'Ordered Product name is required'],
        },
        qty: {
          type: Number,
          required: [true, 'Ordered product quantity is required'],
        },
        image: {
          type: String,
          required: [true, 'Ordered product image is required'],
        },
        price: {
          type: Number,
          required: [true, 'Ordered product price is required'],
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: [true, 'Ordered product Id is required'],
          ref: 'Product',
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order
