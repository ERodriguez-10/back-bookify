import { Schema, model } from "mongoose";

const authCollection = "auth";

const authSchema = new Schema({
  email: { type: String, required: true, min: 3, max: 50 },
  password: { type: String, required: true, min: 15, max: 500 },
  createdAt: { type: Date, default: Date.now },
});

const authModel = model(authCollection, authSchema);

export default authModel;
