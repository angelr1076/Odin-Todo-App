import { renderProjectSidebar, loadDefaultProject } from './components/views';
import {
  handleSubmitProject,
  handleSubmitTodo,
  handleShowAdd,
  handleEditTodo,
} from './components/handlers';
import './styles/style.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const component = () => {
  const mainContainer = document.createElement('div');
  mainContainer.setAttribute('class', 'main-container', 'id', 'mainContainer');
  const mainContent = document.querySelector('#content');
  mainContainer.appendChild(mainContent);

  return mainContainer;
};

window.addEventListener('load', () => {
  document.body.appendChild(component());
  // Show list of Projects in sidebar
  handleShowAdd();
  handleEditTodo();
  renderProjectSidebar();
  loadDefaultProject();
  handleSubmitProject();
  handleSubmitTodo();
});
