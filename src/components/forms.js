import { createTodo } from './todos';
import { createProject } from './projects';
import {
  renderProjectList,
  renderProjectSidebar,
  renderTodoFromProject,
} from './views';

const submitProjectForm = element => {
  element.addEventListener('click', e => {
    e.preventDefault();
    const name =
      document.querySelector('#name').value || 'Auto Generated Project';
    // const projectList = document.querySelector('#project');
    // const todos = [];
    // Create new project
    createProject(name);
    renderProjectSidebar();
    /////////////////////// Once a project is submitted, renderprojectsidebar stops populating project properties in the todos section ///////////////////////
  });
  return;
};

const submitTodoForm = element => {
  element.addEventListener('click', e => {
    e.preventDefault();
    const projectId = document.querySelector('#projectId').value;
    const title =
      document.querySelector('#title').value || 'Cupcake ipsum dolor ';
    const description =
      document.querySelector('#description').value ||
      'Macaroon gummi bears cake pie cheesecake oat cake. Cheesecake sweet roll topping jelly-o muffin I love.';
    const dueDate = document.querySelector('#dueDate').value || '01/01/2030';
    const priority = document.querySelector('#priority').value || '1';
    // const projectIndex = project.selectedIndex;
    // Create new todo
    createTodo({
      projectId,
      title,
      description,
      dueDate,
      priority,
    });
  });
};

export { submitProjectForm, submitTodoForm };
