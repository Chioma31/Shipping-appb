import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  amountPaid: {
    type: String,
    required: true,
  },
  trackingId: {
    type: String,
  },
},
{
  timestamps: false,
}
);

const User = mongoose.model("Users", UserSchema)

export default  User;
