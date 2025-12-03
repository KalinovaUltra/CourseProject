export default class ProfilePresenter {
  constructor(userInfoContainer, documentsContainer, app) {
    this.userInfoContainer = userInfoContainer;
    this.documentsContainer = documentsContainer;
    this.app = app;
    this.userData = app.getUserData();
    this.isEditing = false;
    this.documents = [];
  }

  init() {
    this.renderUserInfo();
    this.loadAndRenderDocuments();
  }

  async loadAndRenderDocuments() {
    await this.app.loadDocuments();
    this.documents = this.app.getDocuments(); 
    this.renderDocuments();
  }

  renderUserInfo() {
    this.userInfoContainer.innerHTML = `
      <div class="user-card">
        <h2>Личный кабинет</h2>
        <p><strong>ФИО:</strong> ${this.userData.name}</p>
        <p><strong>Группа:</strong> ${this.userData.group}</p>
        <p><strong>Факультет:</strong> ${this.userData.faculty}</p>
        <button class="btn-edit btn-small">Редактировать данные</button>
      </div>
    `;
    
    this.#initUserInfoListeners();
  }

  renderDocuments() {
    if (this.documents.length === 0) {
      this.documentsContainer.innerHTML = `
        <div class="empty-state">
          <h3>Мои заявки</h3>
          <p>У вас пока нет отправленных заявок</p>
        </div>
      `;
      return;
    }

    const documentsHtml = this.documents.map(document => 
      this.#createDocumentItemTemplate(document)
    ).join('');

    this.documentsContainer.innerHTML = `
      <h3>Мои заявки</h3>
      <div class="documents-list">
        ${documentsHtml}
      </div>
      <div id="documentModal" class="modal-overlay">
        <div class="modal-content">
          <span class="close-modal">&times;</span>
          <div id="modalBody"></div>
        </div>
      </div>
    `;

    this.#initModalListeners();
  }

  #createDocumentItemTemplate(document) {
    const statusMap = {
      'pending': 'На рассмотрении',
      'completed': 'Завершено', 
      //'approved': 'Одобрено',
      'rejected': 'Отклонено'
    };
    
    const categoryMap = {
      'material-help': 'Материальная помощь',
      'profcom': 'Профком',
      'academic': 'Академические вопросы',
      'social': 'Социальные льготы'
    };
    
    const russianStatus = statusMap[document.status] || document.status;
    const russianCategory = categoryMap[document.category] || document.category;
    const statusClass = document.statusClass || 
      (document.status === 'pending' ? 'status-pending' : 
       document.status === 'completed' || document.status === 'approved' ? 'status-approved' :
       document.status === 'rejected' ? 'status-rejected' : 'status-pending');

    return `
      <div class="document-item" data-document-id="${document.id}">
        <div class="document-info">
          <div class="document-title">${document.title}</div>
          <div class="document-meta">
            <span>Категория: ${russianCategory}</span><br>
            <span>Дата: ${document.date || 'Не указана'}</span><br>
            <span>Комментарий: ${document.comment || 'нет комментария'}</span>
          </div>
        </div>
        <div class="document-status ${statusClass}">${russianStatus}</div>
      </div>
    `;
  }

  #initUserInfoListeners() {
    const editBtn = this.userInfoContainer.querySelector('.btn-edit');
    if (editBtn) {
      editBtn.addEventListener('click', () => this.#handleEdit());
    }
  }

  #initModalListeners() {
    const modal = this.documentsContainer.querySelector('#documentModal');
    const modalBody = this.documentsContainer.querySelector('#modalBody');
    const closeBtn = this.documentsContainer.querySelector('.close-modal');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });
    }

    if (modal) {
      modal.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });
    }

    const documentItems = this.documentsContainer.querySelectorAll('.document-item');
    documentItems.forEach((item, index) => {
      item.addEventListener('click', (event) => {
        event.stopPropagation();
        
        const documentId = item.getAttribute('data-document-id');
        const document = this.documents.find(doc => 
          doc.id == documentId || doc.id === documentId
        );
        
        if (document) {
          this.#showDocumentModal(document, modal, modalBody);
        }
      });
    });
  }

  #showDocumentModal(document, modal, modalBody) {
    const statusMap = {
      'pending': 'На рассмотрении',
      'completed': 'Завершено',
      'approved': 'Одобрено', 
      'rejected': 'Отклонено'
    };
    
    const categoryMap = {
      'material-help': 'Материальная помощь',
      'profcom': 'Профком',
      'academic': 'Академические вопросы',
      'social': 'Социальные льготы'
    };
    
    const russianStatus = statusMap[document.status] || document.status;
    const russianCategory = categoryMap[document.category] || document.category;
    
    const documentText = document.text || 'Текст отсутствует';

    modalBody.innerHTML = `
      <h3>${document.title}</h3>
      <div class="modal-document-info">
        <p><strong>Категория:</strong> ${russianCategory}</p>
        <p><strong>Статус:</strong> ${russianStatus}</p>
        <p><strong>Дата отправки:</strong> ${document.date || 'Не указана'}</p>
        <p><strong>Комментарий:</strong> ${document.comment || 'нет комментария'}</p>
      </div>
      <div class="modal-document-text">
        <div class="text-content">${documentText}</div>
      </div>
    `;
    
    // модальное окно
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
  }

  #handleEdit() {
    this.isEditing = true;
    this.userInfoContainer.innerHTML = `
      <div class="user-card edit-mode">
        <h2>Редактирование данных</h2>
        <div class="form-group">
          <label>ФИО:</label>
          <input type="text" id="edit-name" value="${this.userData.name}">
        </div>
        <div class="form-group">
          <label>Группа:</label>
          <input type="text" id="edit-group" value="${this.userData.group}">
        </div>
        <div class="form-group">
          <label>Факультет:</label>
          <input type="text" id="edit-faculty" value="${this.userData.faculty}">
        </div>
        <div class="form-actions">
          <button class="btn-save btn-small">Сохранить</button>
          <button class="btn-cancel btn-small">Отмена</button>
        </div>
      </div>
    `;
    
    const saveBtn = this.userInfoContainer.querySelector('.btn-save');
    const cancelBtn = this.userInfoContainer.querySelector('.btn-cancel');
    
    saveBtn.addEventListener('click', () => this.#handleSave());
    cancelBtn.addEventListener('click', () => this.#handleCancel());
  }

  #handleSave() {
    const nameInput = this.userInfoContainer.querySelector('#edit-name');
    const groupInput = this.userInfoContainer.querySelector('#edit-group');
    const facultyInput = this.userInfoContainer.querySelector('#edit-faculty');

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

  #handleCancel() {
    this.isEditing = false;
    this.renderUserInfo();
  }

  updateDocuments(documents) {
    this.documents = documents;
    this.renderDocuments();
  }
}