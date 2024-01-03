import { PaginateModel, Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IProductDoc } from "../interfaces/product";

interface ProductModel<T extends Document> extends PaginateModel<T> {}

const productCollection = "catalogue";

const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true, min: 10, max: 500 },
    rating: { type: Number, required: true, min: 1, max: 5 },
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
  createdAt: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: false },
}).plugin(mongoosePaginate);

export const ProductModel: ProductModel<IProductDoc> = model<IProductDoc>(
  productCollection,
  productSchema
) as ProductModel<IProductDoc>;
