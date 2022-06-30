import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.makeDOM(categories);
  }

  makeHTML(categories){ 
    return `<!--Корневой элемент RibbonMenu-->
    <div class="ribbon">
      <!--Кнопка прокрутки влево-->
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
  
      <!--Ссылки на категории-->
      <nav class="ribbon__inner">
      <a href="#" class="ribbon__item ribbon__item_active" data-id="">All</a>
        ${categories.slice(1).map(this.makeCarousel).join('')}
      </nav>
  
      <!--Кнопка прокрутки вправо-->
      <button class="ribbon__arrow ribbon__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>`
  
  }

  makeCarousel(obj){
    return `<a href="#" class="ribbon__item" data-id="${obj.id}">${obj.name}</a>`
  }

  makeDOM(arr){
    const slider = createElement(this.makeHTML(arr))
    const left = slider.querySelector('.ribbon__arrow_left')
    const right = slider.querySelector('.ribbon__arrow_right')
    const ribbonInner = slider.querySelector('.ribbon__inner')

    const tabs = slider.querySelectorAll('.ribbon__item')

    left.classList.remove('ribbon__arrow_visible')
    right.classList.add('ribbon__arrow_visible')

    right.addEventListener('click',(event) => {
      ribbonInner.scrollBy(350,0)
      console.log(ribbonInner.scrollLeft)
    }
    )

    left.addEventListener('click',(event) => {
      ribbonInner.scrollBy(-350,0)
      console.log(ribbonInner.clientWidth)
    }
    )

    ribbonInner.addEventListener('scroll',(event) => {
      this.drawArrows(ribbonInner,left,right)
    })

    for (const tab of tabs){
      tab.addEventListener('click',  (event) => { 
        event.preventDefault();
        slider.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active')
        event.target.classList.add('ribbon__item_active')

        event.target.dispatchEvent(new CustomEvent("ribbon-select",{
        detail : tab.closest('.ribbon__item').dataset.id,
        bubbles : true    
      }))
     })
    }
    return slider
  }

   drawArrows(inner,left,right){
     let scrollWidth = inner.scrollWidth;
     let scrollLeft = inner.scrollLeft;
     let clientWidth = inner.clientWidth;
    
     let scrollRight = scrollWidth - scrollLeft - clientWidth
      console.log(scrollWidth,scrollLeft,clientWidth,scrollRight)
     if (scrollLeft < 1) {
        left.classList.remove('ribbon__arrow_visible')
        right.classList.add('ribbon__arrow_visible')
     }

     if (scrollRight < 1) {
        right.classList.remove('ribbon__arrow_visible')
        left.classList.add('ribbon__arrow_visible')
     }
   }
  }
