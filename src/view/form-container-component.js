import {createElement} from '../framework/render.js'; 
import { DocTemplates } from '../doc-templates/doc-templates.js';

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
            <option value="">Выберите тип документа</option>
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
    this.element = null;
    this.onSubmitCallback = null;
  }

  getTemplate() {
    return createFormContainerComponentTemplate(this.categories);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.setEventListeners();
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
  setEventListeners() {
    if (!this.element) return;

    const categorySelect = this.element.querySelector('#category');
    const form = this.element.querySelector('#requestForm');
    categorySelect.addEventListener('change', (event) => {
      this.loadTemplate(event.target.value);
    });
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if (this.onSubmitCallback) {
        this.onSubmitCallback(this.getFormData());
      }
    });
  }
  loadTemplate(category) {
    if (!this.element) return;

    const templateArea = this.element.querySelector('#templateArea');
    
    if (category && DocTemplates[category]) {
      templateArea.innerHTML = DocTemplates[category];
    } else {
      templateArea.innerHTML = '<div class="template-placeholder"><p>Выберите категорию документа чтобы загрузить шаблон</p></div>';
    }
  }
  setSubmitHandler(callback) {
    this.onSubmitCallback = callback;
  }

  getFormData() {
    if (!this.element) {
      return null;
    }

    const categorySelect = this.element.querySelector('#category');
    const commentTextarea = this.element.querySelector('#reason');
    const templateInputs = this.element.querySelectorAll('.template-input:not(.student-data), .template-textarea');
    const templateData = {};
    
    templateInputs.forEach(input => {
      if (input.type !== 'hidden' && !input.readOnly) {
        templateData[input.id] = input.value;
      }
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
    const categorySelect = this.element.querySelector('#category');
    categorySelect.selectedIndex = 0;
    this.loadTemplate('');
  }
}