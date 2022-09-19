import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  email: {
    type: String,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  trackingId: {
    type: String,
  },
  progress: {
    type: Number,
    default: 0,
    required:true
  },
}
,{
  timestamps: true,
}
);

const Order = mongoose.model("Order", OrderSchema)

export default  Order;