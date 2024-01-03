import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import productRouter from "./routes/product.routes";
import { connectToDB } from "./configs/db.config";

dotenv.config();

const app: Express = express();

// Enviroment variables

const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Routes
app.get("/health", (req: Request, res: Response) => {
  res.send("Server is up and running.");
});

app.use("/api/products", productRouter);

// Mongoose initialization
connectToDB();

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
