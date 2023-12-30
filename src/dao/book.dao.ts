import bookModel from "../models/book.model";

enum BookCategory {
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
}

interface IBook {
  title?: string;
  description?: string;
  price?: number;
  thumbnail?: string;
  code?: string;
  stock?: number;
  category?: BookCategory;
  status?: boolean;
}

class BookDAO {
  bookModel: typeof bookModel;

  constructor() {
    this.bookModel = bookModel;
  }

  async getBooks(limit?: string, page?: string, sort?: string, query?: string) {
    // Validate filters
    let limitFilter = isNaN(Number(limit)) ? 10 : Number(limit);
    let pageFilter = isNaN(Number(page)) ? 1 : Number(page);

    // If sort is undefined, not any sort. Else order by sort;
    let sortFilter;
    if (!sort) {
      sortFilter = "";
    } else {
      sort === "asc" ? (sortFilter = "asc") : (sortFilter = "desc");
    }

    // Validate query
    let queryFilter = query !== undefined ? query : "";

    // Variable to save results
    let productPaginate;

    // Case where queryFilter and sortFilter are passed
    if (queryFilter && sortFilter) {
      productPaginate = await this.bookModel.paginate(
        { category: query },
        { limit: limitFilter, page: pageFilter, sort: { price: sortFilter } }
      );
    }

    // Case where only sortFilter are passed
    if (!queryFilter && sortFilter) {
      productPaginate = await this.bookModel.paginate(
        {},
        { limit: limitFilter, page: pageFilter, sort: { price: sortFilter } }
      );
    }

    // Case where only queryFilter are passed
    if (queryFilter && !sortFilter) {
      productPaginate = await this.bookModel.paginate(
        { category: query },
        { limit: limitFilter, page: pageFilter }
      );
    }

    // Case where no queryFilter or sortFilter are passed
    if (!queryFilter && !sortFilter) {
      productPaginate = await this.bookModel.paginate(
        {},
        { limit: limitFilter, page: pageFilter }
      );
    }

    let nextLink;
    let prevLink;

    if (!productPaginate) throw new Error("Paginate has failed!");

    if (productPaginate.hasNextPage) {
      let nextPageNumber = pageFilter + 1;
      nextLink = `http://localhost:8080/api/books?limit=${limitFilter}&page=${nextPageNumber}`;
    }

    if (productPaginate.hasNextPage) {
      let prevPageNumber = pageFilter - 1;
      prevLink = `http://localhost:8080/api/books?limit=${limitFilter}&page=${prevPageNumber}`;
    }

    let responseObject = {
      status: productPaginate.totalDocs > 0 ? "success" : "error",
      payload: productPaginate.docs,
      totalDocs: productPaginate.totalDocs,
      totalPages: productPaginate.totalPages,
      prevPage: productPaginate.prevPage,
      nextPage: productPaginate.nextPage,
      page: productPaginate.page,
      hasPrevPage: productPaginate.hasPrevPage,
      hasNextPage: productPaginate.hasNextPage,
      prevLink: productPaginate.hasPrevPage ? prevLink : null,
      nextLink: productPaginate.hasNextPage ? nextLink : null,
    };

    return responseObject;
  }

  async getBookById(id: string) {
    const productSelected = await this.bookModel.findById(id).lean();
    if (productSelected !== null) {
      return productSelected;
    } else {
      throw new Error("Product not found");
    }
  }

  async addBook(product: IBook) {
    try {
      const productCreated = await this.bookModel.create(product);
      return productCreated;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }

  async updateBook(id: string, product: IBook) {
    return await this.bookModel.updateOne({ _id: id }, product);
  }

  async deleteBook(id: string) {
    return await this.bookModel.deleteOne({ _id: id });
  }
}

export default BookDAO;
