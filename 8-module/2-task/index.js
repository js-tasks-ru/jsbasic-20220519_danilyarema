import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.template = `<div class="products-grid">
                        <div class="products-grid__inner">
                        <!--ВОТ ТУТ БУДУТ КАРТОЧКИ ТОВАРОВ-->
                        </div>
                    </div>`
    this.elem = this.render(this.products);
    this.legacyFilters = {};
  }

  render(products) {
    let innerPush = createElement(this.template)
    const place = innerPush.querySelector('.products-grid__inner')

    for (let product of products) {
      product = new ProductCard(product)
      place.append(product.elem)
    }

    return innerPush
  }

  updateFilter(filters) {
    this.filters = Object.assign(this.filters,filters)
    //console.log(this.filters)
    this.elem.innerHTML = ''

    let innerPush = createElement(this.template)
    const place = innerPush.querySelector('.products-grid__inner')
    

    for (let product of this.products) {

      if (product.nuts !== null && this.filters.noNuts !== null && product.nuts == true && this.filters.noNuts == true ||
          product.vegeterian !== null && this.filters.vegeterianOnly !== null && !product.vegeterian && this.filters.vegeterianOnly == true ||
          product.spiciness !== null && this.filters.spiciness !== null && product.spiciness > this.filters.maxSpiciness ||
          product.category !== null && this.filters.category !== null && product.category !== this.filters.category && this.filters.category !== '' && this.filters.category !== undefined) 
          {
            //console.log(product.category !== filters.category, filters.category !== null, product.category !== null)
            continue
            
    }
    else 
    {
      product = new ProductCard(product)
      place.append(product.elem)
      //console.log('1')
    }
  }
  document.body.querySelector('.products-grid').append(place)
  //console.log(document.body.querySelectorAll('.card').length)
  //console.log(filters)
}
}