import App from './app.js';
import { UserAction } from './const/const.js'; 
import HeaderProfileComponent from './view/header-profile-component.js';
import ProfilePresenter from './presenter/profile-preseneter.js';
import DocumentsApiService from './doc-api-service.js';
import { render } from './framework/render.js';


const END_POINT = "https://69300a1c778bbf9e006f924f.mockapi.io";


const documentsApiService = new DocumentsApiService(END_POINT);


const app = new App(documentsApiService);


const headerContainer = document.querySelector('.header');
if (headerContainer) {
  render(new HeaderProfileComponent(), headerContainer);
}


const userInfoContainer = document.querySelector('.user-info');
const documentsContainer = document.querySelector('.documents-section');

let profilePresenter;

if (userInfoContainer && documentsContainer) {
  profilePresenter = new ProfilePresenter(
    userInfoContainer, 
    documentsContainer,
    app
  );
  profilePresenter.init();
}


app.addListener((event, payload) => {
  if (event === UserAction.UPDATE_DOCS && profilePresenter) {
    profilePresenter.updateDocuments(payload);
  }
});