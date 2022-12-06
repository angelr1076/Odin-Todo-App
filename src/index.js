import {
  renderProjectSidebar,
  renderTodoFromProject,
} from './components/views';
import {
  handleProjectView,
  handleSubmitProject,
  handleSubmitTodo,
} from './components/eventHandlers';
import './styles/style.css';

function component() {
  const mainContainer = document.createElement('div');
  mainContainer.setAttribute('class', 'main-container', 'id', 'mainContainer');
  const mainContent = document.querySelector('#content');
  mainContainer.appendChild(mainContent);

  return mainContainer;
}

document.body.appendChild(component());

// Show list of Projects in sidebar
renderProjectSidebar();
renderTodoFromProject();
// Once project is submitted, push it to the projects list
handleSubmitProject();
handleSubmitTodo();
