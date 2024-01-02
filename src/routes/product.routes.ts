import { Router } from "express";
import ProductDAO from "../dao/product.dao";

const productManager = new ProductDAO();

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json({
      title: "Products found",
      status: 200,
      message: "All products found",
      instance: "GET /api/products",
      payload: products,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        title: "Products not found",
        status: 404,
        error: error.name,
        message: error.message,
        instance: "GET /api/products",
      });
    }
  }
});

productRouter.get("/id/:id", async (req, res) => {
  try {
    const product = await productManager.getProductById(req.params.id);
    res.status(200).json({
      title: "Product found",
      status: 200,
      message: `Product with ID ${req.params.id} found`,
      instance: "GET /api/products/id/:id",
      payload: product,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        title: "Product not found",
        status: 404,
        error: error.name,
        message: error.message,
        instance: "GET /api/products/id/:id",
      });
    }
  }
});

productRouter.get("/code/:code", async (req, res) => {
  try {
    const product = await productManager.getProductByCode(req.params.code);
    res.status(200).json({
      title: "Product found",
      status: 200,
      message: `Product with CODE ${req.params.code} found`,
      instance: "GET /api/products/code/:code",
      payload: product,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        title: "Product not found",
        status: 404,
        error: error.name,
        message: error.message,
        instance: "GET /api/products/code/:code",
      });
    }
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const product = await productManager.addProduct(req.body);
    res.status(201).json({
      title: "Product created",
      status: 201,
      message: `Product with ID ${product._id} created`,
      instance: "POST /api/products",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        title: "Product validation failed",
        status: 400,
        error: error.name,
        message: error.message,
        instance: "POST /api/products",
      });
    }
  }
});

productRouter.put("/:id", async (req, res) => {
  try {
    const product = await productManager.updateProduct(req.params.id, req.body);
    res.status(202).json({
      title: "Product updated",
      status: 202,
      message: `Product with ID ${req.params.id} updated`,
      instance: "PUT /api/products/:id",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        title: "Product validation failed",
        status: 400,
        error: error.name,
        message: error.message,
        instance: "PUT /api/products/:id",
      });
    }
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const product = await productManager.deleteProduct(req.params.id);
    res.status(200).json({
      title: "Product deleted",
      status: 200,
      message: `Product with ID ${req.params.id} deleted`,
      instance: "DELETE /api/products/:id",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        title: "Product deletion failed",
        status: 404,
        error: error.name,
        message: error.message,
        instance: "DELETE /api/products/:id",
      });
    }
  }
});

export default productRouter;
