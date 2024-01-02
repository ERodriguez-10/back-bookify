import { Router } from "express";
import ProductDAO from "../dao/product.dao";

const productManager = new ProductDAO();

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const products = await productManager.getProducts();

  res.json(products);
});

export default productRouter;
