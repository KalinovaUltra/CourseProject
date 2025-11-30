import {createElement} from '../framework/render.js'; 


function createHeaderProfileComponentTemplate() {
    return (
        `<div class="header-content">
            <h1>Личный кабинет</h1>
            <nav class="nav">
                <a href="index.html" class="nav-link">Создать заявку</a>
            </nav>
        </div>`
      );
}


export default class HeaderProfileComponent {
  getTemplate() {
    return createHeaderProfileComponentTemplate();
  }


  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }


    return this.element;
  }


  removeElement() {
    this.element = null;
  }
}