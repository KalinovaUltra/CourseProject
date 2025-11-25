
import {createElement} from '../framework/render.js'; 


function createInfoComponentTemplate() {
    return (
        `<div class="user-details">
                    <h3>Иванов Иван</h3>
                    <p>студент, Факультет информационных технологий</p>
                </div>`
      );
}


export default class InfoComponent {
  getTemplate() {
    return createInfoComponentTemplate();
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