import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
 
  constructor(slides) {
    this.elem = this.setUpStatic(slides);
   // this.elem.addEventListener('click',(event) => this.elem.offsetWidth)
  }

  makeCarousel(user) {
    return `
    <div class="carousel__slide" data-id="${user.id}">
      <img src="/assets/images/carousel/${user.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${user.price.toFixed(2)}</span>
        <div class="carousel__title">${user.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
    `
  }

  makeHTML(users){
    return `
    <div class="carousel">
    <!--Кнопки переключения-->
    <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>

    <div class="carousel__inner">
          ${users.map(this.makeCarousel).join('')}
          </div>
  </div>`
  }

  setUpStatic(slides){
    const slider = createElement(this.makeHTML(slides));

    const buttons = slider.querySelectorAll("button")

    const right = slider.querySelector('.carousel__arrow_right')
    const left = slider.querySelector('.carousel__arrow_left')
    const inner = slider.querySelector('.carousel__inner')
    const maxlen = slider.querySelectorAll('.carousel__slide').length

    let pos = 0 //счётчик

    switch(pos){
      case 0: left.style.display = 'none';
      right.style.display = '';
      break;
  
      case (maxlen - 1): left.style.display = '';
      right.style.display = 'none';
      break;
  
      default:left.style.display = '';
      right.style.display = '';
    };


  right.addEventListener('click',(event) => {
    if (pos <= (maxlen - 2)) {
      pos = pos + 1
    } 
    
    let translateDist =  this.offsetWidth * pos
    inner.style.transform = 'translateX(-' + translateDist + 'px)'  
    console.log(pos, this.offsetWidth)
   switch(pos){
        case 0: left.style.display = 'none';
        right.style.display = '';
        break;
    
        case (maxlen - 1): left.style.display = '';
        right.style.display = 'none';
        break;
    
        default:left.style.display = '';
        right.style.display = '';
      };
  })

  left.addEventListener('click', (event) => {
    if (pos >= 1 ) {
      pos = pos - 1
    } 
    
    let translateDist =  this.offsetWidth * pos
    inner.style.transform = 'translateX(-' + translateDist + 'px)' 
    console.log(pos, this.offsetWidth)

    switch(pos){
      case 0: left.style.display = 'none';
      right.style.display = '';
      break;
  
      case (maxlen - 1): left.style.display = '';
      right.style.display = 'none';
      break;
  
      default:left.style.display = '';
      right.style.display = '';
    };
  })

    for (const button of buttons){
      button.addEventListener('click',  (event) => { 
        console.log(button)
        event.target.dispatchEvent(new CustomEvent("product-add",{
        detail : button.closest('.carousel__slide').dataset,//.id,
        bubbles : true    
      }))
     })
    }
  return slider; 
    
}

  get offsetWidth() {
    return this.elem.offsetWidth
  };
}
