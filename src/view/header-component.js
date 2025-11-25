import {createElement} from '../framework/render.js'; 


function createHeaderComponentTemplate() {
    return (
        `<div class="header-content">
            <h1>Система документооборота для студентов</h1>
            <nav class="nav">
                <a href="/profile" class="nav-link">Личный кабинет</a>
            </nav>
        </div>`
      );
}


export default class HeaderComponent {
  getTemplate() {
    return createHeaderComponentTemplate();
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