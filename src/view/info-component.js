import {createElement} from '../framework/render.js'; 
import { UserData } from '../mock/doc.js';

function createInfoComponentTemplate(userData) {
    return (
        `<div class="user-details">
            <h3>${userData.name}</h3>
            <p>${userData.group}, ${userData.faculty}</p>
        </div>`
    );
}

export default class InfoComponent {
  constructor(userData = UserData) {
    this.userData = userData;
  }

  getTemplate() {
    return createInfoComponentTemplate(this.userData);
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