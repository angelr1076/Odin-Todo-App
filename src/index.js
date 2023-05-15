import {
  renderHomeSidebar,
  renderProjectSidebar,
  loadDefaultProject,
  showDeleteAll,
} from './components/views';
import {
  handleSubmitProject,
  handleSubmitTodo,
  handleHomeBtnLoad,
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
  // Load views
  renderHomeSidebar();
  renderProjectSidebar();
  handleShowAdd();
  handleEditTodo();
  loadDefaultProject();
  handleSubmitProject();
  handleSubmitTodo();
  handleHomeBtnLoad();
  showDeleteAll();
});
