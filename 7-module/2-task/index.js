import createElement from '../../assets/lib/create-element.js';

export default class Modal {

  constructor() { 
    this.template = createElement(`<div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>
  
    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>
  
        <h3 class="modal__title">
        </h3>
      </div>
  
      <div class="modal__body">
      </div>
    </div>
  
  </div>`)
  }

  open(){
    const buttonClose = this.template.querySelector('.modal__close')
    document.body.classList.add(`is-modal-open`)
    buttonClose.addEventListener('click', (event) => this.close())

    let handlerESC = function(event){
      if (event.code == 'Escape') {

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
    return document.body.append(this.template)
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
    this.template.querySelector('.modal__title').innerHTML = `\n ${modalTitle} \n`
    if (document.body.classList.contains('is-modal-open')) {
      document.body.querySelector('.modal__title').innerHTML = `\n ${modalTitle} \n`
    }
    //console.log(this.template.querySelector('.modal__title').innerHTML)
  }

  setBody(node){
    const element = this.template.querySelector('.modal__body');

    while (element.firstChild) {
      element.removeChild(element.firstChild);
    } //удаление всего в body

    element.append(node)

    if (document.body.classList.contains('is-modal-open')) {
      document.body.querySelector('.modal__body').append.node
    }
  }

}
