import {createElement} from '../framework/render.js';
import DocumentItemComponent from './document-item-component.js';

function createDocSectionComponentTemplate() {
  return `
    <div class="documents-section">
      <h3 class="section-title">Мои заявки</h3>
      <div class="documents-list"></div>
    </div>
  `;
}

export default class DocSectionComponent {
  constructor(documents = [], onDocumentClick = null) {
    this.documents = documents;
    this.onDocumentClick = onDocumentClick; 
    this.documentItemComponents = [];
  }

  getTemplate() {
    return createDocSectionComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.renderDocumentItems();
      this.setupClickHandlers();
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

    this.documentItemComponents.forEach(component => component.removeElement());
    this.documentItemComponents = [];

    this.documents.forEach(document => {
      const documentItemComponent = new DocumentItemComponent(document);
      const documentElement = documentItemComponent.getElement();
      documentsList.appendChild(documentElement);
      this.documentItemComponents.push(documentItemComponent);
    });
  }

  setupClickHandlers() {
    const documentsList = this.element.querySelector('.documents-list');
    
    documentsList.addEventListener('click', (event) => {
      const documentItem = event.target.closest('.document-item');
      if (!documentItem) return;
      
      const documentId = documentItem.getAttribute('data-document-id');
      const document = this.documents.find(doc => doc.id == documentId);
      
      if (document && this.onDocumentClick) {
        this.onDocumentClick(document);
      }
    });
  }

  updateDocuments(newDocuments) {
    this.documents = newDocuments;
    if (this.element) {
      this.renderDocumentItems();
    }
  }

  removeElement() {
    this.documentItemComponents.forEach(component => component.removeElement());
    this.documentItemComponents = [];
    
    if (this.element) {
      this.element.remove();
      this.element = null;
    }
  }
}