import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  modal;
  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    
    this.addEventListeners();
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

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let model = new Modal();
    let body = document.createElement('div')
    model.setTitle('Your order')
    
    body.classList.add('cart__body')

    for (let items of this.cartItems) {
      body.append((this.renderProduct(items.product,items.count)))
    }

    body.append(this.renderOrderForm())

    model.setBody(body)

    model.open();

    const buttonMinus = document.body.querySelectorAll(`.cart-counter__button_minus`)
    const plusButtons = document.body.querySelectorAll(`.cart-counter__button_plus`)

    document.body.querySelector('.cart-form').addEventListener('submit', (event) => {
      event.preventDefault();
      this.onSubmit(event);
    })

    for (let button of buttonMinus) {
      button.addEventListener('click',(event) => {
        this.updateProductCount(event.target.closest('.cart-product').dataset.productId, -1)
        if (this.getTotalCount() == 0) model.close()
      })
    }

    for (let button of plusButtons) {
      button.addEventListener('click',(event) => {
        this.updateProductCount(event.target.closest('.cart-product').dataset.productId, 1)
      })
    }
    
    model = this.modal
  
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);
    const isModalOpen = document.body.classList.contains('is-modal-open')

    if (!isModalOpen) return
     
    let productId = cartItem.product.id; // Уникальный идентификатора товара (для примера)
    let modalBody = document.body.querySelector('.cart__body')

    // Элемент, который хранит количество товаров с таким productId в корзине
    let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);

    // Элемент с общей стоимостью всех единиц этого товара
    let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`); 

    // Элемент с суммарной стоимостью всех товаров
    let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

    productCount.innerHTML = cartItem.count

    productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;

    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
    }
  

  onSubmit(event) {
    event.preventDefault()
    document.querySelector("button[type = submit]").classList.add("is-loading");

    fetch("https://httpbin.org/post", {
      method: "POST",
      body: new FormData(document.querySelector(".cart-form")),
    })
      .then(() => {
        this.modal.setTitle("Success!");

        this.cartItems = this.cartItems.filter((x) => x.length < 0);

        this.modal.elem.querySelector(".modal__body").innerHTML = `
          <div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>
        `;
      })
      .catch((e) => {});
  

  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  };
}

