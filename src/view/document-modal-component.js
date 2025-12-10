import { createElement } from '../framework/render.js';

function createDocumentModalTemplate() {
  return `
    <div id="documentModal" class="modal-overlay">
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <div id="modalBody"></div>
      </div>
    </div>
  `;
}

export default class DocumentModalComponent {
  constructor() {
    this.element = null;
    this.onCloseCallback = null;
  }

  getTemplate() {
    return createDocumentModalTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.initEventListeners();
    }
    return this.element;
  }

  initEventListeners() {
    const closeBtn = this.element.querySelector('.close-modal');
    const modal = this.element;

    closeBtn?.addEventListener('click', () => {
      this.hide();
      if (this.onCloseCallback) {
        this.onCloseCallback();
      }
    });

    modal?.addEventListener('click', (event) => {
      if (event.target === modal) {
        this.hide();
        if (this.onCloseCallback) {
          this.onCloseCallback();
        }
      }
    });
  }

  show(document, categoryMap, statusMap) {
    const modalBody = this.element.querySelector('#modalBody');
    if (!modalBody) return;

    const russianStatus = statusMap[document.status] || document.status;
    const russianCategory = categoryMap[document.category] || document.category;
    const documentText = document.text || 'Текст отсутствует';

    modalBody.innerHTML = `
      <h3>${document.title || 'Без названия'}</h3>
      <div class="modal-document-info">
        <p><strong>Категория:</strong> ${russianCategory}</p>
        <p><strong>Статус:</strong> ${russianStatus}</p>
        <p><strong>Дата отправки:</strong> ${document.date || 'Не указана'}</p>
        <p><strong>Комментарий:</strong> ${document.comment || 'нет комментария'}</p>
      </div>
      <div class="modal-document-text">
        <h4>Текст заявления:</h4>
        <div class="text-content">${documentText}</div>
      </div>
    `;
    
    this.element.style.display = 'flex';
    this.element.style.alignItems = 'center';
    this.element.style.justifyContent = 'center';
  }

  hide() {
    this.element.style.display = 'none';
  }

  setOnClose(callback) {
    this.onCloseCallback = callback;
  }

  removeElement() {
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}