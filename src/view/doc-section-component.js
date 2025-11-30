import {createElement} from '../framework/render.js';
import DocumentItemComponent from './document-item-component.js';

function createDocSectionComponentTemplate() {
  return `
    <div class="documents-section">
      <h3 class="section-title">Мои заявки</h3>
      <div class="documents-list"></div>
      <div class="modal-overlay" id="documentModal" style="display: none;">
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <div id="modalBody"></div>
        </div>
      </div>
    </div>
  `;
}

export default class DocSectionComponent {
  constructor(documents = []) {
    this.documents = documents;
    this.documentItemComponents = [];
  }

  getTemplate() {
    return createDocSectionComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.renderDocumentItems();
    }
    return this.element;
  }

  renderDocumentItems() {
    const documentsList = this.element.querySelector('.documents-list');
    
    if (this.documents.length === 0) {
      documentsList.innerHTML = `
        <div class="empty-state">
          <p>У вас пока нет отправленных заявок</p>
        </div>
      `;
      return;
    }

    this.documents.forEach(document => {
      const documentItemComponent = new DocumentItemComponent(document);
      const documentElement = documentItemComponent.getElement();
      documentsList.appendChild(documentElement);
      this.documentItemComponents.push(documentItemComponent);
    });
  }

  removeElement() {
    this.documentItemComponents.forEach(component => {
      component.removeElement();
    });
    this.documentItemComponents = [];
    
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}