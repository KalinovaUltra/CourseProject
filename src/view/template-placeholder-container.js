import {createElement} from '../framework/render.js'; 


function createTemplatePlaceholderComponentTemplate() {
    return (
        `<div class="template-area" id="templateArea">
                    <div class="template-placeholder">
                        <p>Выберите категорию документа чтобы загрузить шаблон</p>
                    </div>
                </div>`
      );
}


export default class TemplatePlaceholderComponent {
  getTemplate() {
    return createTemplatePlaceholderComponentTemplate();
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