import createElement from "../../assets/lib/create-element.js"

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.template = createElement(`<!--Корневой элемент слайдера-->
    <div class="slider">
  
      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: 0%;">
        <span class="slider__value">0</span>
      </div>
  
      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: 0%;"></div>
  
      <!--Шаги слайдера-->
      <div class="slider__steps">
      <span data-id="0" class="slider__step-active"></span>
      </div>
    </div>`)
    this.steps = steps
    this.value = value
    this.elem = this.render()
  }

  render() {
    const stepsPlace = this.template.querySelector('.slider__steps')
    let sliderStep = ``

      for(let i = 1; i < this.steps; i++) {
        sliderStep = sliderStep + `<span data-id='${i}'></span>`
      }
    
    stepsPlace.insertAdjacentHTML('beforeend',sliderStep)
    //console.log(stepsPlace.innerHTML)
    
    this.template.addEventListener('click',(event) => {
      let thumb = this.elem.querySelector('.slider__thumb');
      let progress = this.elem.querySelector('.slider__progress');
      let sliderValue = this.elem.querySelector('.slider__value');

      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;

      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let valuePercents = value / segments * 100;

      if (value != sliderValue.textContent) {
        this.elem.dispatchEvent(new CustomEvent('slider-change', {
          detail: value,
          bubbles: true
        }))
        this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active')
        stepsPlace.children[value].classList.add('slider__step-active')
      }

      
      let leftPercents = valuePercents; // Значение в процентах от 0 до 100

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
      sliderValue.textContent = value;

    })

    return this.template
  }
  
  
}
