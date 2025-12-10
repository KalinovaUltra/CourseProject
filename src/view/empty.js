import { createElement } from '../framework/render.js';

function createEmptyStateTemplate() {
  return `
    <div class="empty-state">
      <h3>Мои заявки</h3>
      <p>У вас пока нет отправленных заявок</p>
    </div>
  `;
}

export default class EmptyStateComponent {
  constructor() {
    this.element = null;
  }

  getTemplate() {
    return createEmptyStateTemplate();
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