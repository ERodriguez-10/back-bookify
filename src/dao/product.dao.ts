import { ProductModel } from "../models/product.model";

interface IProductDAO {
  getProducts(): Promise<any>;
  getProductById(id: string): Promise<any>;
  getProductByCode(code: string): Promise<any>;
  addProduct(product: any): Promise<any>;
  updateProduct(id: string, product: any): Promise<any>;
  deleteProduct(id: string): Promise<any>;
}

interface IProduct {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  thumbnail: string[];
  brand: string;
  code: string;
  color: string[];
  reviews: {
    name: string;
    comment: string;
    rating: string;
  }[];
}

class ProductDAO implements IProductDAO {
  private productModel: typeof ProductModel;

  constructor() {
    this.productModel = ProductModel;
  }
  async getProducts() {
    const products = await this.productModel.find();
    return products;
  }
  async getProductById(id: string) {
    const product = await this.productModel.findById(id);
    return product;
  }
  async getProductByCode(code: string) {
    const product = await this.productModel.findOne({ code: code });
    return product;
  }
  async addProduct(product: IProduct) {
    const newProduct = new this.productModel(product);
    await newProduct.save();
    return newProduct;
  }
  async updateProduct(id: string, product: IProduct) {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      product,
      { new: true }
    );
    return updatedProduct;
  }
  async deleteProduct(id: string) {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);
    return deletedProduct;
  }
}

export default ProductDAO;
