import {createElement} from '../framework/render.js'; 
import { Documents } from '../mock/doc.js';

function createDocumentItemTemplate(document) {
    return (
       `<div class="document-item">
          <div class="document-info">
            <div class="document-title">${document.title}</div>
            <div class="document-meta">
              <span>Категория: ${document.category}</span><br>
              <span>Комментарий: ${document.comment}</span>
            </div>
          </div>
          <div class="document-status ${document.statusClass}">Статус: ${document.status}</div>
        </div>`
    );
}

function createDocSectionComponentTemplate(documents) {
  const documentsList = documents.map(document => 
    createDocumentItemTemplate(document)
  ).join('');

  return (
    `<div class="documents-section">
      <h3 class="section-title">Мои заявки</h3>
      <div class="documents-list">
        ${documentsList}
      </div>
    </div>`
  );
}

export default class DocSectionComponent {
  constructor(documents = Documents) {
    this.documents = documents;
  }

  getTemplate() {
    return createDocSectionComponentTemplate(this.documents);
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