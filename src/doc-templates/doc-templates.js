import { UserData } from "../mock/doc.js";

export const DocTemplates = {
  'material-help': `
    <div class="template-content">
      <h3>Заявление на материальную помощь</h3>
      
      <!-- Данные студента (можно редактировать) -->
      <div class="student-data-section">
        <h4>Данные студента:</h4>
        <div class="template-field">
          <label>ФИО:</label>
          <input type="text" class="template-input" id="name" value="${UserData.name}">
        </div>
        <div class="template-field">
          <label>Номер группы:</label>
          <input type="text" class="template-input" id="group" value="${UserData.group}">
        </div>
        <div class="template-field">
          <label>Факультет:</label>
          <input type="text" class="template-input" id="faculty" value="${UserData.faculty}">
        </div>
        <div class="template-field">
          <label>Дата подачи:</label>
          <input type="text" class="template-input" id="date" value="${new Date().toLocaleDateString('ru-RU')}">
        </div>
      </div>
      
      <!-- Текст заявления -->
      <div class="document-text-section">
        <h4>Текст заявления:</h4>
        <div class="template-field">
          <label>Причина обращения:</label>
          <textarea class="template-textarea" id="reason" placeholder="Опишите причину обращения...">Прошу предоставить мне материальную помощь в связи с тяжелым финансовым положением.</textarea>
        </div>
      </div>
    </div>
  `,
  
  'profcom': `
    <div class="template-content">
      <h3>Заявление о вступлении в профсоюз</h3>
      
      <!-- Данные студента -->
      <div class="student-data-section">
        <h4>Данные студента:</h4>
        <div class="template-field">
          <label>ФИО полностью:</label>
          <input type="text" class="template-input" id="name" value="${UserData.name}">
        </div>
        <div class="template-field">
          <label>Номер группы:</label>
          <input type="text" class="template-input" id="group" value="${UserData.group}">
        </div>
        <div class="template-field">
          <label>Факультет:</label>
          <input type="text" class="template-input" id="faculty" value="${UserData.faculty}">
        </div>
        <div class="template-field">
          <label>Дата подачи:</label>
          <input type="text" class="template-input" id="date" value="${new Date().toLocaleDateString('ru-RU')}">
        </div>
      </div>
      
      <!-- Текст заявления -->
      <div class="document-text-section">
        <h4>Текст заявления:</h4>
        <div class="template-field">
          <label>Текст заявления:</label>
          <textarea class="template-textarea" id="purpose" style="height: 180px;">
Настоящим прошу принять меня в члены Профсоюза работников государственных учреждений и общественного обслуживания Российской Федерации.

Обязуюсь:
- соблюдать Устав Профсоюза;
- выполнять решения выборных органов Профсоюза;
- регулярно уплачивать членские взносы;
- принимать активное участие в деятельности Профсоюзной организации.

С Положением о персональных данных ознакомлен(а) и согласен(на).
          </textarea>
        </div>
      </div>
    </div>
  `,
  
  'academic': `
    <div class="template-content">
      <h3>Академическое заявление</h3>
      
      <!-- Данные студента -->
      <div class="student-data-section">
        <h4>Данные студента:</h4>
        <div class="template-field">
          <label>ФИО:</label>
          <input type="text" class="template-input" id="name" value="${UserData.name}">
        </div>
        <div class="template-field">
          <label>Номер группы:</label>
          <input type="text" class="template-input" id="group" value="${UserData.group}">
        </div>
        <div class="template-field">
          <label>Факультет:</label>
          <input type="text" class="template-input" id="faculty" value="${UserData.faculty}">
        </div>
        <div class="template-field">
          <label>Дата подачи:</label>
          <input type="text" class="template-input" id="date" value="${new Date().toLocaleDateString('ru-RU')}">
        </div>
      </div>
      
      <!-- Текст заявления -->
      <div class="document-text-section">
        <h4>Текст заявления:</h4>
        <div class="template-field">
          <label>Суть вопроса:</label>
          <textarea class="template-textarea" id="issue">Прошу рассмотреть вопрос об академическом отпуске/пересдаче экзамена/другой академический вопрос.</textarea>
        </div>
      </div>
    </div>
  `,
  
  'social': `
    <div class="template-content">
      <h3>Заявление на социальные льготы</h3>
      
      <!-- Данные студента -->
      <div class="student-data-section">
        <h4>Данные студента:</h4>
        <div class="template-field">
          <label>ФИО:</label>
          <input type="text" class="template-input" id="name" value="${UserData.name}">
        </div>
        <div class="template-field">
          <label>Номер группы:</label>
          <input type="text" class="template-input" id="group" value="${UserData.group}">
        </div>
        <div class="template-field">
          <label>Факультет:</label>
          <input type="text" class="template-input" id="faculty" value="${UserData.faculty}">
        </div>
        <div class="template-field">
          <label>Дата подачи:</label>
          <input type="text" class="template-input" id="date" value="${new Date().toLocaleDateString('ru-RU')}">
        </div>
      </div>
      
      <!-- Текст заявления -->
      <div class="document-text-section">
        <h4>Текст заявления:</h4>
        <div class="template-field">
          <label>Причина обращения:</label>
          <textarea class="template-textarea" id="social-reason">Прошу предоставить мне социальные льготы в соответствии с действующим законодательством.</textarea>
        </div>
      </div>
    </div>
  `
};