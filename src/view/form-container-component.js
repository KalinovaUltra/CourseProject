import {createElement} from '../framework/render.js'; 


function createFormContainerComponentTemplate() {
    return (
        `<div class="form-container">
            <h2>Создание новой заявки</h2>
            <form class="request-form" id="requestForm">
                <div class="form-group">
                    <label for="category">Выберите категорию:</label>
                    <select id="category" name="category" class="form-select" required>
                        <option value="">Выберите тип документа</option>
                        <option value="material-help">Материальная помощь</option>
                        <option value="profcom">Профком</option>
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
  getTemplate() {
    return createFormContainerComponentTemplate();
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