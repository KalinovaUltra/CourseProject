import HeaderProfileComponent from './view/header-profile-component.js';
import { render } from './framework/render.js';
import InfoComponent from './view/info-component.js';
import DocSectionComponent from './view/doc-section-component.js';

const HeaderProfile = document.querySelector('.header');
render(new HeaderProfileComponent(), HeaderProfile);

const Info = document.querySelector('.user-info');
render(new InfoComponent(), Info);

const Doc=document.querySelector('.documents-section');
render(new DocSectionComponent(), Doc);