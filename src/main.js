import FormContainerComponent from './view/form-container-component.js';
import HeaderComponent from './view/header-component.js';
import NotificationComponent from './view/notification-component.js';
import TemplatePlaceholderComponent from './view/template-placeholder-container.js';
import { render } from './framework/render.js';

const Header = document.querySelector('.header');
if (Header) {
  render(new HeaderComponent(), Header);
}

const Notification = document.querySelector('.notification');
if (Notification) {
  render(new NotificationComponent(), Notification);
}


import DocPresenter from './presenter/doc-presenter.js';

const container = document.querySelector('.main-content');
if (container) {
  const docPresenter = new DocPresenter(container);
  docPresenter.init();
}