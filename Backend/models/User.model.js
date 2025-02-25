import { model, Schema } from "mongoose";

/**
 * 1. Schema
 * 2. Nombre
 * 3. Model
 */

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

export default model("User", userSchema);
