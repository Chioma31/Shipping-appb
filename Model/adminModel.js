import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create Schema
const AdminSchema = new Schema({
  names: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
}
);

const Admin = mongoose.model("Admin", AdminSchema)

export default  Admin;
