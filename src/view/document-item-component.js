import {createElement} from '../framework/render.js';

function createDocumentItemTemplate(document) {
    return (
       `<div class="document-item" data-document-id="${document.id}">
          <div class="document-info">
            <div class="document-title">${document.title}</div>
            <div class="document-meta">
              <span>Категория: ${document.category}</span><br>
              <span>Комментарий: ${document.comment || 'нет комментария'}</span>
              ${document.date ? `<br><span>Дата: ${document.date}</span>` : ''}
              ${document.text ? `<br><span class="document-text">Текст: ${document.text.substring(0, 100)}${document.text.length > 100 ? '...' : ''}</span>` : ''}
            </div>
          </div>
          <div class="document-status ${document.statusClass}">Статус: ${document.status}</div>
        </div>`
    );
}

export default class DocumentItemComponent {
  constructor(document) {
    this.document = document;
  }

  getTemplate() {
    return createDocumentItemTemplate(this.document);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}
