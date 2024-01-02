import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./routes/product.routes";
import mongoosePaginate from "mongoose-paginate-v2";

dotenv.config();

const app: Express = express();

// Enviroment variables

const PORT = process.env.PORT || 8080;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const CLUSTER_URL = process.env.CLUSTER_URL;

// Cors middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  next();
});

// Mongoose configuration
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER_URL}/${DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("[server]: Connected to MongoDB Atlas.");
  });

mongoose.plugin(mongoosePaginate);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server.");
});

app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
