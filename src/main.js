import App from './app.js';
import { UserAction } from './const/const.js'; 
import HeaderComponent from './view/header-component.js';
import FormContainerComponent from './view/form-container-component.js';
import DocumentsApiService from './doc-api-service.js';


const END_POINT = "https://69300a1c778bbf9e006f924f.mockapi.io";


const documentsApiService = new DocumentsApiService(END_POINT);


const app = new App(documentsApiService);

const headerComponent = new HeaderComponent(app.getUserData());
const formComponent = new FormContainerComponent(app.getCategories());


formComponent.setSubmitHandler(async (formData) => {
  try {
    const success = await app.submitDocument(formData, formData.category);
    if (success) {
      formComponent.resetForm();
    }
  } catch (error) {
    alert('Ошибка при отправке документа');
  }
});


document.addEventListener('DOMContentLoaded', () => {

  document.querySelector('header.header').appendChild(headerComponent.getElement());
  
  const main = document.querySelector('main.main-content');
  main.appendChild(formComponent.getElement());
});