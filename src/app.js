import { UserAction, UserData, Categories } from './const/const.js';

export default class App {
  constructor(documentsApiService) {
    this.documentsApiService = documentsApiService;
    this.documents = [];
    this.listeners = [];
  }

  addListener(callback) {
    this.listeners.push(callback);
  }

  _notify(event, data) {
    this.listeners.forEach(callback => callback(event, data));
  }

  async loadDocuments() {
    try {
      let docs = await this.documentsApiService.getDocuments();
      docs.sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : new Date(a.id || 0);
        const dateB = b.createdAt ? new Date(b.createdAt) : new Date(b.id || 0);
        return dateB - dateA;
      });
      
      this.documents = docs;
      this._notify(UserAction.UPDATE_DOCS, this.documents);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    }
  }

  async submitDocument(formData, category) {
  try {
    let formattedText = '';
    let formDate = new Date().toLocaleDateString('ru-RU'); 
    
    if (formData.templateData && Object.keys(formData.templateData).length > 0) {
      const data = formData.templateData;
      if (data.date) {
        formDate = data.date;
      }
      formattedText = `ДАННЫЕ СТУДЕНТА:\n`;
      formattedText += `ФИО: ${data.name || UserData.name}\n`;
      formattedText += `Группа: ${data.group || UserData.group}\n`;
      formattedText += `Факультет: ${data.faculty || UserData.faculty}\n`;
      formattedText += `Дата подачи: ${formDate}\n\n`; 
      formattedText += `ТЕКСТ ЗАЯВЛЕНИЯ:\n`;
      const textFields = ['reason', 'purpose', 'issue', 'social-reason'];
      for (const field of textFields) {
        if (data[field]) {
          formattedText += data[field];
          break;
        }
      }
    }

    const document = {
      title: this._getDocumentTitle(category),
      category: category,
      comment: formData.comment || '',
      date: formDate, 
      text: formattedText,
      status: 'На рассмотрении',
      statusClass: 'status-pending',
      createdAt: new Date().toISOString()
    };

    console.log('Отправляю документ на сервер:', document);
    const savedDoc = await this.documentsApiService.sendDocument(document);
    console.log('Сервер ответил:', savedDoc);


    this.documents.unshift(savedDoc);
    

    this._notify(UserAction.ADD_DOC, savedDoc);
    this._notify(UserAction.UPDATE_DOCS, this.documents);
    
    alert('Документ отправлен на рассмотрение!');
    return true;
    
  } catch (error) {
    console.error('Ошибка при отправке документа:', error);
    alert('Ошибка при отправке документа');
    return false;
  }
}

  _getDocumentTitle(category) {
    const titles = {
      'material-help': 'Заявление на материальную помощь',
      'profcom': 'Заявление о вступлении в профсоюз',
      'academic': 'Академическое заявление',
      'social': 'Заявление на социальные льготы'
    };
    return titles[category] || 'Заявление';
  }

  getUserData() {
    return UserData;
  }

  getCategories() {
    return Categories;
  }

  getDocuments() {

    return [...this.documents].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(a.id || 0);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(b.id || 0);
      return dateB - dateA;
    });
  }
}