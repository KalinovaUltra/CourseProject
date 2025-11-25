
import {createElement} from '../framework/render.js'; 


function createDocSectionComponentTemplate() {
    return (
        `<div><h3 class="section-title">Мои заявки</h3>
                
                <div class="documents-list">
                    <!-- Пример заявки 1 -->
                    <div class="document-item">
                        <div class="document-info">
                            <div class="document-title">Заявление на материальную помощь</div>
                            <div class="document-meta">
                                <span>Категория: Материальная помощь</span>
                            </div>
                        </div>
                        <div class="document-status status-completed">Статус: Завершено</div>
                    </div>
                    
                    <!-- Пример заявки 2 -->
                    <div class="document-item">
                        <div class="document-info">
                            <div class="document-title">Заявление на материальную помощь</div>
                            <div class="document-meta">
                                <span>Категория: Материальная помощь</span>
                            </div>
                        </div>
                        <div class="document-status status-completed">Статус: Завершено</div>
                    </div>
                    
                    <!-- Пример заявки 3 -->
                    <div class="document-item">
                        <div class="document-info">
                            <div class="document-title">Заявление на материальную помощь</div>
                            <div class="document-meta">
                                <span>Категория: Материальная помощь</span>
                            </div>
                        </div>
                        <div class="document-status status-completed">Статус: Завершено</div>
                    </div>
                    
                    <!-- Пример заявки 4 -->
                    <div class="document-item">
                        <div class="document-info">
                            <div class="document-title">Заявление на материальную помощь</div>
                            <div class="document-meta">
                                <span>Категория: Материальная помощь</span>
                            </div>
                        </div>
                        <div class="document-status status-completed">Статус: Завершено</div>
                    </div>
                </div></div>
                `
      );
}


export default class DocSectionComponent {
  getTemplate() {
    return createDocSectionComponentTemplate();
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