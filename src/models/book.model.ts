import { PaginateModel, Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

interface IBook {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  code: string;
  stock: number;
  category: string;
  status: boolean;
}

interface IBookModel extends PaginateModel<IBook> {}

const bookCollection = "products";

const bookSchema = new Schema({
  title: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 250 },
  price: { type: Number, required: true, min: 0, max: 1000000 },
  thumbnail: { type: String, required: true },
  code: { type: String, required: true, max: 21, unique: true },
  stock: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    max: 50,
    enum: [
      "drama",
      "horror",
      "fiction",
      "non-fiction",
      "design",
      "history",
      "biography",
      "poetry",
      "children",
      "cooking",
      "travel",
      "health",
      "science",
      "art",
      "religion",
      "comics",
      "manga",
      "fantasy",
      "romance",
      "thriller",
      "mystery",
      "young-adult",
      "humor",
      "autobiography",
      "other",
    ],
  },
  status: { type: Boolean, required: true, max: 100 },
});

bookSchema.plugin(paginate);

const bookModel: IBookModel = model<IBook>(
  bookCollection,
  bookSchema
) as IBookModel;

export default bookModel;
