import createElement from '../../assets/lib/create-element.js';

export default class Modal {

  constructor() { 
  }

  open(){
    this.tempest = this.createHTML()
    this.elem = createElement(this.tempest)
    console.log(this.elem)
    const element = this.elem.querySelector('.modal__body');
    const buttonClose = this.elem.querySelector('.modal__close')

    document.body.classList.add(`is-modal-open`)

    while (element.firstChild) {
      element.removeChild(element.firstChild);
    } //удаление всего в body

    element.append(this.modalBody) 

    buttonClose.addEventListener('click', (event) => this.close())


    let handlerESC = function(event){
      if (event.code == 'Escape') {
        console.log('buttonevent')

        document.body.classList.remove(`is-modal-open`)
        const element = document.body.querySelector('.modal')
        while (element.firstChild) {
          element.removeChild(element.firstChild);
        } //удаление всего в modal
        document.body.removeChild(element)

        document.body.removeEventListener('keydown', handlerESC)
      }
    }

    document.body.addEventListener('keydown', handlerESC) 
    
    return document.body.append(this.elem)
  }

  close() {
    document.body.classList.remove(`is-modal-open`)
    const element = document.body.querySelector('.modal')
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    } //удаление всего в modal
    document.body.removeChild(element)
  }

  setTitle(modalTitle){
    return this.modalTitle = modalTitle
  }

  setBody(node){
    return this.modalBody = node
  }

  createHTML(){
    console.log(this.modalBody)
    return `<div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
          ${this.modalTitle}
        </h3>
      </div>

      <div class="modal__body">
      </div>
    </div>

  </div>`
  }
  
 

}
