import createElement from '../../assets/lib/create-element.js'

export default class ProductCard {
  constructor(product) {
    this.elem = createDOM(product)
    this.product = product
  }



}
function createDOM(elemObj){
    let DOM = createElement(
      `<div class="card">
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
                              
          DOM.querySelector(".card__button").addEventListener('click',  (event) => { 
             event.target.dispatchEvent(new CustomEvent("product-add",{
             detail : elemObj.id,
             bubbles : true    
           }))
          })
    return DOM                         
  }



