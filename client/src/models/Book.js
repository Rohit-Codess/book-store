/**
 * Book Model - Represents a book entity
 */
export class Book {
  constructor({
    id,
    title,
    author,
    price,
    originalPrice,
    discount,
    image,
    category,
    rating,
    reviews,
    description,
    isbn,
    publisher,
    publishedDate,
    language,
    pages,
    inStock = true,
    isBestseller = false,
    isNewArrival = false,
    isPreOrder = false
  }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.price = price;
    this.originalPrice = originalPrice;
    this.discount = discount;
    this.image = image;
    this.category = category;
    this.rating = rating || 0;
    this.reviews = reviews || 0;
    this.description = description;
    this.isbn = isbn;
    this.publisher = publisher;
    this.publishedDate = publishedDate;
    this.language = language;
    this.pages = pages;
    this.inStock = inStock;
    this.isBestseller = isBestseller;
    this.isNewArrival = isNewArrival;
    this.isPreOrder = isPreOrder;
  }

  // Calculate discount percentage
  getDiscountPercentage() {
    if (this.originalPrice && this.price) {
      return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
    }
    return 0;
  }

  // Check if book is on sale
  isOnSale() {
    return this.originalPrice && this.price < this.originalPrice;
  }

  // Get formatted price
  getFormattedPrice() {
    return `₹${this.price}`;
  }

  // Get formatted original price
  getFormattedOriginalPrice() {
    return this.originalPrice ? `₹${this.originalPrice}` : null;
  }
}

export default Book;
