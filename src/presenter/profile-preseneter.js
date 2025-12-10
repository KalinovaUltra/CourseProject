import { render } from '../framework/render.js';
import InfoComponent from '../view/info-component.js';
import DocSectionComponent from '../view/doc-section-component.js';
import EmptyStateComponent from '../view/empty.js';
import DocumentModalComponent from '../view/document-modal-component.js';
import { Categories, StatusMap, StatusClassMap } from '../const/const.js';

export default class ProfilePresenter {
  constructor(userInfoContainer, documentsContainer, app) {
    this.userInfoContainer = userInfoContainer;
    this.documentsContainer = documentsContainer;
    this.app = app;
    this.userData = app.getUserData();
    this.isEditing = false;
    this.documents = [];
    
    this.infoComponent = null;
    this.docSectionComponent = null;
    this.emptyStateComponent = null;
    this.modalComponent = null;
    
    this.categoryMap = this.createCategoryMap();
  }

  init() {
    this.renderUserInfo();
    this.loadAndRenderDocuments();
    this.createModal();
  }

  createCategoryMap() {
    const map = {};
    Categories.forEach(category => {
      map[category.value] = category.text;
    });
    return map;
  }

  createModal() {
    if (!this.modalComponent) {
      this.modalComponent = new DocumentModalComponent();
      document.body.appendChild(this.modalComponent.getElement());
    }
  }

  async loadAndRenderDocuments() {
    await this.app.loadDocuments();
    this.documents = this.app.getDocuments(); 
    this.renderDocuments();
  }

  renderUserInfo() {
    this.userInfoContainer.innerHTML = '';
    this.infoComponent = new InfoComponent(this.userData, this.isEditing);
    render(this.infoComponent, this.userInfoContainer);
    this.initUserInfoListeners();
  }

  renderDocuments() {
    this.documentsContainer.innerHTML = '';
    
    if (this.documents.length === 0) {
      this.emptyStateComponent = new EmptyStateComponent();
      render(this.emptyStateComponent, this.documentsContainer);
      return;
    }

    const formattedDocuments = this.formatDocuments(this.documents);
    this.docSectionComponent = new DocSectionComponent(formattedDocuments);
    render(this.docSectionComponent, this.documentsContainer);
    
    this.initDocumentListeners();
  }

  formatDocuments(documents) {
    return documents.map(doc => ({
      id: doc.id,
      title: doc.title || 'Без названия',
      category: this.categoryMap[doc.category] || doc.category,
      date: doc.date || 'Не указана',
      comment: doc.comment || 'нет комментария',
      status: StatusMap[doc.status] || doc.status || 'Не определен',
      statusClass: StatusClassMap[doc.status] || 'status-pending',
      _hidden: { text: doc.text }
    }));
  }

  initUserInfoListeners() {
    const element = this.infoComponent?.getElement();
    if (!element) return;

    if (this.isEditing) {
      const saveBtn = element.querySelector('.btn-save');
      const cancelBtn = element.querySelector('.btn-cancel');
      
      saveBtn?.addEventListener('click', () => this.handleSave());
      cancelBtn?.addEventListener('click', () => this.handleCancel());
    } else {
      const editBtn = element.querySelector('.btn-edit');
      editBtn?.addEventListener('click', () => this.handleEdit());
    }
  }

  initDocumentListeners() {
  const element = this.docSectionComponent?.getElement();
  if (!element) return;
  if (!this.modalComponent) {
    this.modalComponent = new DocumentModalComponent();
    render(this.modalComponent, this.documentsContainer);
  }
  element.addEventListener('click', (event) => {
    const documentItem = event.target.closest('.document-item');
    if (documentItem) {
      const documentId = documentItem.getAttribute('data-document-id');
      const originalDoc = this.documents.find(doc => doc.id == documentId);
      if (originalDoc && this.modalComponent) {
        this.modalComponent.show(originalDoc, this.categoryMap, StatusMap);
      }
    }
  });
}

  handleEdit() {
    this.isEditing = true;
    this.renderUserInfo();
  }

  handleSave() {
    const element = this.infoComponent?.getElement();
    if (!element) return;
    const nameInput = element.querySelector('#edit-name');
    const groupInput = element.querySelector('#edit-group');
    const facultyInput = element.querySelector('#edit-faculty');
    if (nameInput && groupInput && facultyInput) {
      this.userData = {
        name: nameInput.value,
        group: groupInput.value,
        faculty: facultyInput.value
      };
      alert('Данные изменены! (локально)');
    }
    this.isEditing = false;
    this.renderUserInfo();
  }

  handleCancel() {
    this.isEditing = false;
    this.renderUserInfo();
  }

  updateDocuments(documents) {
    this.documents = documents;
    this.renderDocuments();
  }

  destroy() {
    this.modalComponent?.removeElement();
  }
}