import { Categories } from '../mock/doc.js';
import { DocTemplates } from '../doc-templates/doc-templates.js';
import FormContainerComponent from '../view/form-container-component.js';

export default class DocPresenter {
  constructor(container) {
    this.container = container;
    this.formComponent = new FormContainerComponent(Categories);
    this.currentTemplate = null;
  }

  init() {
    this.renderForm();
    this.#initEventListeners();
  }

  renderForm() {
    const formElement = this.formComponent.getElement();
    this.container.appendChild(formElement);
  }

  #initEventListeners() {
    this.formComponent.setCategoryChangeHandler((event) => {
      this.#handleCategoryChange(event.target.value);
    });

    this.formComponent.setSubmitHandler((formData) => {
      this.#handleFormSubmit(formData);
    });
  }

  #handleCategoryChange(selectedCategory) {
    if (selectedCategory && DocTemplates[selectedCategory]) {
      this.formComponent.updateTemplateArea(DocTemplates[selectedCategory]);
      this.currentTemplate = selectedCategory;
    } else {
      this.formComponent.updateTemplateArea(
        '<div class="template-placeholder"><p>Выберите категорию документа чтобы загрузить шаблон</p></div>'
      );
      this.currentTemplate = null;
    }
  }

  #handleFormSubmit(formData) {
    if (!formData.category) {
      alert('Пожалуйста, выберите категорию документа');
      return;
    }
    this.formComponent.resetForm();
    this.currentTemplate = null;

    alert('Заявка успешно отправлена на подпись! Переходим в профиль');
    
    //  переход на профиль
    setTimeout(() => {
    window.location.href = 'profile.html';
    }, 1000);
  }

  destroy() {
    this.formComponent.removeElement();
  }
}