import HeaderProfileComponent from './view/header-profile-component.js';
import { render } from './framework/render.js';
import ProfilePresenter from './presenter/profile-preseneter.js';

// Рендерим хедер
const HeaderProfile = document.querySelector('.header');
if (HeaderProfile) {
  render(new HeaderProfileComponent(), HeaderProfile);
}

// Используем ProfilePresenter, но передаем ему существующие контейнеры
const userInfoContainer = document.querySelector('.user-info');
const documentsContainer = document.querySelector('.documents-section');

if (userInfoContainer && documentsContainer) {
  const profilePresenter = new ProfilePresenter(userInfoContainer, documentsContainer);
  profilePresenter.init();
}