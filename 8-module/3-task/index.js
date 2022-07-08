export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product == null || !product) return

    let cartItem = this.cartItems.find(item => item.product.id == product.id)

    if (cartItem) {
      cartItem.count += 1
    } else {
      this.cartItems.push({product,count:1})
    }

    //console.log(this.cartItems)
    this.onProductUpdate(cartItem)
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(item => item.product.id == productId)

    if (cartItem == null || !cartItem) return

    cartItem.count += amount
    
    if (cartItem.count == 0) {
      this.cartItems = this.cartItems.filter(item => item.product.id !== productId)
    }

    //console.log(this.cartItems)
    this.onProductUpdate(cartItem)
  }

  isEmpty() {
    return this.cartItems.length == 0
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, current) => sum + current.count, 0)
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, current) => sum + (current.count * current.product.price), 0)
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

