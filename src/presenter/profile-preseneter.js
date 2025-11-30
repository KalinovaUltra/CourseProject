import { UserData, Documents as MockDocuments } from '../mock/doc.js';
import DocSectionComponent from '../view/doc-section-component.js';
import InfoComponent from '../view/info-component.js';
import { render } from '../framework/render.js';

export default class ProfilePresenter {
  constructor(userInfoContainer, documentsContainer) {
    this.userInfoContainer = userInfoContainer;
    this.documentsContainer = documentsContainer;
    this.userData = { ...UserData };
    this.isEditing = false;
  }

  init() {
    this.renderUserInfo();
    this.renderDocuments();
  }

  renderUserInfo() {
    const infoComponent = new InfoComponent(this.userData, this.isEditing);
    render(infoComponent, this.userInfoContainer);
    this.#initUserInfoListeners(infoComponent);
  }

  renderDocuments() {
    const docSectionComponent = new DocSectionComponent(MockDocuments);
    render(docSectionComponent, this.documentsContainer);
    this.#initModalListeners(docSectionComponent);
  }

  #initUserInfoListeners(infoComponent) {
    const element = infoComponent.getElement();
    if (!element) return;

    if (this.isEditing) {
      const saveBtn = element.querySelector('.btn-save');
      const cancelBtn = element.querySelector('.btn-cancel');

      saveBtn?.addEventListener('click', () => this.#handleSave(element));
      cancelBtn?.addEventListener('click', () => this.#handleCancel());
    } else {
      const editBtn = element.querySelector('.btn-edit');
      editBtn?.addEventListener('click', () => this.#handleEdit());
    }
  }

  #initModalListeners(docSectionComponent) {
    const element = docSectionComponent.getElement();
    const modal = element.querySelector('#documentModal');
    const modalBody = element.querySelector('#modalBody');
    const closeBtn = element.querySelector('.close-modal');

    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });

    const documentItems = element.querySelectorAll('.document-item');
    documentItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        const document = MockDocuments[index];
        modalBody.innerHTML = `
          <h3>${document.title}</h3>
          <div class="modal-document-info">
            <p><strong>Категория:</strong> ${document.category}</p>
            <p><strong>Статус:</strong> ${document.status}</p>
            <p><strong>Комментарий:</strong> ${document.comment || 'нет комментария'}</p>
            ${document.date ? `<p><strong>Дата:</strong> ${document.date}</p>` : ''}
          </div>
          <div class="modal-document-text">
            <h4>Текст заявления:</h4>
            <div class="text-content">${document.text || 'Текст отсутствует'}</div>
          </div>
        `;
        modal.style.display = 'block';
      });
    });
  }

  #handleEdit() {
    this.isEditing = true;
    this.#rerenderUserInfo();
  }

  #handleSave(element) {
    const nameInput = element.querySelector('#edit-name');
    const groupInput = element.querySelector('#edit-group');
    const facultyInput = element.querySelector('#edit-faculty');

    if (nameInput && groupInput && facultyInput) {
      this.userData = {
        name: nameInput.value,
        group: groupInput.value,
        faculty: facultyInput.value
      };
      alert('Данные изменены!');
    }

    this.isEditing = false;
    this.#rerenderUserInfo();
  }

  #handleCancel() {
    this.userData = { ...UserData };
    this.isEditing = false;
    this.#rerenderUserInfo();
  }

  #rerenderUserInfo() {
    this.userInfoContainer.innerHTML = '';
    this.renderUserInfo();
  }
}