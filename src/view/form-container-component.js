import {createElement} from '../framework/render.js'; 
import { Categories } from '../mock/doc.js';

function createFormContainerComponentTemplate(categories) {
  const options = categories.map(category => 
    `<option value="${category.value}">${category.text}</option>`
  ).join('');

  return (
    `<div class="form-container">
      <h2>Создание новой заявки</h2>
      <form class="request-form" id="requestForm">
        <div class="form-group">
          <label for="category">Выберите категорию:</label>
          <select id="category" name="category" class="form-select" required>
            ${options}
          </select>
        </div>
        <div class="form-group dynamic-fields">
          <label for="comment">Комментарий</label>
          <textarea id="reason" class="form-textarea" placeholder="Опишите причину обращения"></textarea>
        </div>

        <div class="template-area" id="templateArea">
          <div class="template-placeholder">
            <p>Выберите категорию документа чтобы загрузить шаблон</p>
          </div>
        </div>

        <div class="form-actions">
          <button type="save" class="btn button-save">Сохранить на компьютер</button>
          <button type="submit" class="btn button-submit">Отправить на подпись</button>
        </div>
      </form>
    </div>`
  );
}

export default class FormContainerComponent {
  constructor(categories = Categories) {
    this.categories = categories;
  }

  getTemplate() {
    return createFormContainerComponentTemplate(this.categories);
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