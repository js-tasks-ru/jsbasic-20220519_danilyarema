import createElement from '../../assets/lib/create-element.js'

export default class ProductCard {
  constructor(product) {
    this.elem = createDOM(product)
  }
}
function createDOM(elemObj){
    let DOM = createElement(`<div class="card">
                                  <div class="card__top">
                                    <img src="/assets/images/products/${elemObj.image}" class="card__image" alt="product">
                                    <span class="card__price">€${elemObj.price.toFixed(2)}</span>
                                  </div>
                               <div class="card__body">
                                <div class="card__title">${elemObj.name}</div>
                                  <button type="button" class="card__button">
                                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                                  </button>
                                </div>
                              </div>`)
    return DOM                          
  }

  // new CustomEvent("product-add"), { // имя события должно быть именно "product-add"
  //   detail: this.product.id, // Уникальный идентификатора товара из объекта товара
  //   bubbles: true // это событие всплывает - это понадобится в дальнейшем
// }


