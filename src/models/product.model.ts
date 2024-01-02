import { PaginateModel, Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

interface IProduct extends Document {
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

interface ProductModel<T extends Document> extends PaginateModel<T> {}

const productCollection = "Product";

const reviewSchema = new Schema({
  name: { type: String, require: true },
  comment: { type: String, require: true },
  rating: { type: String, require: true },
});

const productSchema = new Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  price: { type: String, require: true },
  stock: { type: String, require: true },
  category: { type: String, require: true },
  thumbnail: { type: Array, require: true },
  brand: { type: String, require: true },
  code: { type: String, require: true, unique: true },
  color: { type: Array, require: true },
  reviews: { type: [reviewSchema], require: true },
}).plugin(mongoosePaginate);

export const ProductModel: ProductModel<IProduct> = model<IProduct>(
  productCollection,
  productSchema
) as ProductModel<IProduct>;
