import {createElement} from '../framework/render.js'; 

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

          <button type="submit" class="btn button-submit">Отправить на подпись</button>
        </div>
      </form>
    </div>`
  );
}

export default class FormContainerComponent {
  constructor(categories) {
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

  setCategoryChangeHandler(callback) {
    if (!this.element) {
      return;
    }

    const categorySelect = this.element.querySelector('#category');
    categorySelect.addEventListener('change', callback);
  }

  setSubmitHandler(callback) {
    if (!this.element) {
      return;
    }

    const form = this.element.querySelector('#requestForm');
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      callback(this.getFormData());
    });
  }

  getFormData() {
    if (!this.element) {
      return null;
    }

    const categorySelect = this.element.querySelector('#category');
    const commentTextarea = this.element.querySelector('#reason');
    const templateInputs = this.element.querySelectorAll('.template-input, .template-textarea');

    const templateData = {};
    templateInputs.forEach(input => {
      templateData[input.id] = input.value;
    });

    return {
      category: categorySelect.value,
      categoryText: categorySelect.options[categorySelect.selectedIndex].text,
      comment: commentTextarea.value,
      templateData: templateData
    };
  }

  resetForm() {
    if (!this.element) {
      return;
    }

    const form = this.element.querySelector('#requestForm');
    form.reset();
    
    const templateArea = this.element.querySelector('#templateArea');
    templateArea.innerHTML = '<div class="template-placeholder"><p>Выберите категорию документа чтобы загрузить шаблон</p></div>';
  }

  updateTemplateArea(content) {
    if (!this.element) {
      return;
    }

    const templateArea = this.element.querySelector('#templateArea');
    templateArea.innerHTML = content;
  }
}