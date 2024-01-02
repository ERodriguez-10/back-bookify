import { PaginateModel, Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

interface IProduct extends Document {
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

interface ProductModel<T extends Document> extends PaginateModel<T> {}

const productCollection = "catalogue";

const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  { _id: false }
);

const productSchema = new Schema({
  name: { type: String, required: true, min: 3, max: 50 },
  description: { type: String, required: true, min: 15, max: 500 },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  category: {
    type: String,
    enum: ["Sports", "Coupes", "SUVs", "Luxury", "Jeep", "Sedans"],
    required: true,
  },
  thumbnail: { type: Array, required: true },
  brand: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  color: { type: Array, required: true },
  reviews: { type: [reviewSchema], required: true },
}).plugin(mongoosePaginate);

export const ProductModel: ProductModel<IProduct> = model<IProduct>(
  productCollection,
  productSchema
) as ProductModel<IProduct>;
