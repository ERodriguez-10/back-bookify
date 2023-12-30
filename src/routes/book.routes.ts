import { Router } from "express";
import BookDAO from "../dao/book.dao";

const BookInstance = new BookDAO();

const bookRouter = Router();

bookRouter.get("/", async (req, res) => {
  const limit =
    typeof req.query.limit === "string" ? req.query.limit : undefined;
  const page = typeof req.query.page === "string" ? req.query.page : undefined;
  const sort = typeof req.query.sort === "string" ? req.query.sort : undefined;
  const query =
    typeof req.query.query === "string" ? req.query.query : undefined;

  const productData = await BookInstance.getBooks(limit, page, sort, query);

  res.status(200).json({ productData });
});

bookRouter.get("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    const productFind = await BookInstance.getBookById(pid);
    res.status(200).json({ productSelected: productFind });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error ocurred." });
    }
  }
});

bookRouter.post("/", async (req, res) => {
  const productReq = req.body;

  try {
    const productCreated = await BookInstance.addBook(productReq);
    res.status(201).json({
      message: "Product succesfully created",
      productCreated: productCreated,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error ocurred." });
    }
  }
});

bookRouter.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const productReq = req.body;

  try {
    const updateProduct = await BookInstance.updateBook(pid, productReq);
    if (updateProduct.modifiedCount === 0) throw new Error("Product not found");

    res.status(200).json({ message: "Product has modified" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error ocurred." });
    }
  }
});

bookRouter.delete("/:pid", async (req, res) => {
  const { pid } = req.params;

  try {
    await BookInstance.deleteBook(pid);
    res.status(200).json({
      message: "Content successfully deleted!",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error ocurred." });
    }
  }
});

export default bookRouter;
