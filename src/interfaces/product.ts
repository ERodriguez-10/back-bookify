export interface IProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  thumbnail: string[];
  brand: string;
  code: string;
  color: string[];
  reviews: {
    name: string;
    comment: string;
    rating: number;
  }[];
}

export interface IProductController {
  getProducts(): Promise<IProduct[]>;
  getProductById(id: string): Promise<IProduct | null>;
  getProductByCode(code: string): Promise<IProduct | null>;
  addProduct(product: IProduct): Promise<IProduct | null>;
  updateProduct(id: string, product: IProduct): Promise<IProduct | null>;
  deleteProduct(id: string): Promise<string | null>;
}

export interface IProductDoc extends IProduct, Document {}
