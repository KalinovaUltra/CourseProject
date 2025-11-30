import {createElement} from '../framework/render.js'; 

function createInfoComponentTemplate(userData, isEditing = false) {
    if (isEditing) {
        return `
            <div class="user-details">
                <div class="edit-form">
                    <div class="form-group">
                        <label for="edit-name">ФИО:</label>
                        <input type="text" id="edit-name" class="form-input" value="${userData.name}">
                    </div>
                    <div class="form-group">
                        <label for="edit-group">Группа:</label>
                        <input type="text" id="edit-group" class="form-input" value="${userData.group}">
                    </div>
                    <div class="form-group">
                        <label for="edit-faculty">Факультет:</label>
                        <input type="text" id="edit-faculty" class="form-input" value="${userData.faculty}">
                    </div>
                    <div class="profile-actions">
                        <button type="button" class="btn btn-save">Сохранить</button>
                        <button type="button" class="btn btn-cancel">Отмена</button>
                    </div>
                </div>
            </div>
        `;
    }

    return `
        <div class="user-details">
            <h3>${userData.name}</h3>
            <p>${userData.group}, ${userData.faculty}</p>
            <div class="profile-actions">
                <button type="button" class="btn btn-edit">Изменить данные</button>
            </div>
        </div>
    `;
}

export default class InfoComponent {
  constructor(userData, isEditing = false) {
    this.userData = userData;
    this.isEditing = isEditing;
  }

  getTemplate() {
    return createInfoComponentTemplate(this.userData, this.isEditing);
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