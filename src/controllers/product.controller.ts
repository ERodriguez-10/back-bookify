import { ProductModel } from "../models/product.model";
import { IProduct, IProductController } from "../interfaces/product";

class ProductController implements IProductController {
  private productModel: typeof ProductModel;

  constructor() {
    this.productModel = ProductModel;
  }

  async getProducts(): Promise<IProduct[]> {
    const products = await this.productModel.find();
    return products;
  }

  async getProductById(id: string): Promise<IProduct | null> {
    const product = await this.productModel.findById(id);
    if (product === null) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }

  async getProductByCode(code: string): Promise<IProduct | null> {
    const product = await this.productModel.findOne({ code: code });
    if (product === null) {
      throw new Error(`Product with code ${code} not found`);
    }
    return product;
  }

  async addProduct(product: IProduct): Promise<IProduct | null> {
    const newProduct = await this.productModel.create(product);
    return newProduct;
  }

  async updateProduct(id: string, product: IProduct): Promise<IProduct | null> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      product,
      { new: true }
    );
    if (updatedProduct === null)
      throw new Error(`Product with id ${id} not found. Cannot update.`);
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<string | null> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    if (deletedProduct === null)
      throw new Error(`Product with id ${id} not found. Cannot delete.`);
    return `Product ID ${id} deleted successfully`;
  }
}

export default ProductController;
