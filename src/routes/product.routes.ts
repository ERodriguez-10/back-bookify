import { Router } from "express";
import ProductController from "../controllers/product.controller";

const productManager = new ProductController();

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json({
      success: true,
      error: null,
      data: products,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        error: error.message,
        data: null,
      });
    }
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.id);
    res.status(200).json({
      success: true,
      error: null,
      data: product,
    });
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        error: error.message,
        data: null,
      });
    }
  }
});

productRouter.get("/code/:code", async (req, res) => {
  try {
    const product = await productManager.getProductByCode(req.params.code);
    res.status(200).json({
      success: true,
      error: null,
      data: product,
    });
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        error: error.message,
        data: null,
      });
    }
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const product = await productManager.addProduct(req.body);
    res.status(201).json({
      success: true,
      error: null,
      data: product,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message,
        data: null,
      });
    }
  }
});

productRouter.put("/:id", async (req, res) => {
  try {
    const product = await productManager.updateProduct(req.params.id, req.body);
    res.status(202).json({
      success: true,
      error: null,
      data: product,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        error: error.message,
        data: null,
      });
    }
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const product = await productManager.deleteProduct(req.params.id);
    res.status(200).json({
      success: true,
      error: null,
      data: product,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        error: error.message,
        data: null,
      });
    }
  }
});

export default productRouter;
