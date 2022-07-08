import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';


export default class Main {

  constructor() {
  }

  drawMain(data) {

    let productGrid = new ProductGrid(data);
    document.body.querySelector("[data-products-grid-holder]").innerHTML = "";
    document.body
      .querySelector("[data-products-grid-holder]")
      .append(productGrid.elem);

    let carousel = new Carousel(slides)
    document.body.querySelector('[data-carousel-holder]').append(carousel.elem)

    let ribbonMenu = new RibbonMenu(categories)
    document.body.querySelector('[data-ribbon-holder]').append(ribbonMenu.elem)

    let stepSlider = new StepSlider({steps : 5,value : 3})
    document.body.querySelector('[data-slider-holder]').append(stepSlider.elem)

    let cartIcon = new CartIcon()
    document.body.querySelector('[data-cart-icon-holder]').append(cartIcon.elem)

    let cart = new Cart(cartIcon)

    productGrid.updateFilter({
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      maxSpiciness: stepSlider.value,
      category: ribbonMenu.value,
    });

    let checkboxNuts = document.querySelector("#nuts-checkbox");
    checkboxNuts.addEventListener("change", () => {
      productGrid.updateFilter({
        noNuts: checkboxNuts.checked, // новое значение чекбокса
      });
    });

    let checkboxVegeterian = document.querySelector("#vegeterian-checkbox");
    checkboxVegeterian.addEventListener("change", () => {
      productGrid.updateFilter({
        vegeterianOnly: checkboxVegeterian.checked, // новое значение чекбокса
      });
    });

    document.body.addEventListener("product-add", (event) => {
      cart.addProduct(data.find((p) => p.id === event.detail));
    });

    stepSlider.elem.addEventListener("slider-change", (event) => {
      productGrid.updateFilter({
        maxSpiciness: event.detail, // значение остроты из события 'slider-change'
      });
    });

    ribbonMenu.elem.addEventListener("ribbon-select", (event) => {
      productGrid.updateFilter({
        category: event.detail, // категория из события 'ribbon-select'
      });
    });
  
}

  async render() {  
    let response = await fetch('products.json')
    let data = await response.json()

    this.drawMain(data)
  }
}
