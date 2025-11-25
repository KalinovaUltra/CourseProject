import {createElement} from '../framework/render.js'; 


function createNotificationComponentTemplate() {
    return (
        `<span id="notificationText"></span>`
      );
}


export default class NotificationComponent {
  getTemplate() {
    return createNotificationComponentTemplate();
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