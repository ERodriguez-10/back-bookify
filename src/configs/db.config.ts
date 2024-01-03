import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const CLUSTER_URL = process.env.CLUSTER_URL;

export const connectToDB = () => {
  mongoose
    .connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER_URL}/${DB_NAME}?retryWrites=true&w=majority`
    )
    .then(() => {
      console.log("[server]: Connected to MongoDB Atlas.");
    });
};
