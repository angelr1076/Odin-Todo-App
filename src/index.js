import { renderProjectSidebar, loadDefaultProject } from './components/views';
import {
  // handleProjectView,
  handleSubmitProject,
  handleSubmitTodo,
  showTodoForm,
} from './components/handlers';
import './styles/style.css';

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
  renderProjectSidebar();
  loadDefaultProject();
  showTodoForm();
  handleSubmitProject();
  handleSubmitTodo();
  // localStorage.clear();
});
