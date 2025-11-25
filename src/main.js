import FormContainerComponent from './view/form-container-component.js';
import HeaderComponent from './view/header-component.js';
import NotificationComponent from './view/notification-component.js';
import TemplatePlaceholderComponent from './view/template-placeholder-container.js';
import { render } from './framework/render.js';

const Header = document.querySelector('.header');
render(new HeaderComponent(), Header);

const Form = document.querySelector('.main-content');
render(new FormContainerComponent(), Form);

const Notification = document.querySelector('.notification');
render(new NotificationComponent(), Notification);

