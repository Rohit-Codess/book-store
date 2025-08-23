/**
 * User Model - Represents a user/customer
 */
export class User {
  constructor({
    id,
    email,
    firstName,
    lastName,
    phone,
    avatar,
    addresses = [],
    wishlist = [],
    cart = [],
    orderHistory = [],
    preferences = {},
    isVerified = false,
    createdAt,
    lastLogin
  }) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.avatar = avatar;
    this.addresses = addresses;
    this.wishlist = wishlist;
    this.cart = cart;
    this.orderHistory = orderHistory;
    this.preferences = preferences;
    this.isVerified = isVerified;
    this.createdAt = createdAt;
    this.lastLogin = lastLogin;
  }

  // Get full name
  getFullName() {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  // Get cart item count
  getCartItemCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  // Get wishlist item count
  getWishlistItemCount() {
    return this.wishlist.length;
  }

  // Check if item is in wishlist
  isInWishlist(bookId) {
    return this.wishlist.some(item => item.bookId === bookId);
  }

  // Check if item is in cart
  isInCart(bookId) {
    return this.cart.some(item => item.bookId === bookId);
  }
}

export default User;
