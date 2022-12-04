import { createTodo } from './todos';
import { createProject, renderProjectList } from './projects';

const submitProjectForm = element => {
  element.addEventListener('click', e => {
    e.preventDefault();
    const name =
      document.querySelector('#name').value || 'Auto Generated Project';
    const projectList = document.querySelector('#project');
    const todos = [];
    // Create new project
    createProject(name, todos);
    // Clear project list prior to adding it to todos
    projectList.innerHTML = '';
    // Add the new project to the todos project list options
    renderProjectList();
  });
};

const submitTodoForm = element => {
  element.addEventListener('click', e => {
    e.preventDefault();
    const title =
      document.querySelector('#title').value || 'Cupcake ipsum dolor ';
    const description =
      document.querySelector('#description').value ||
      'Macaroon gummi bears cake pie cheesecake oat cake. Cheesecake sweet roll topping jelly-o muffin I love.';
    const dueDate = document.querySelector('#dueDate').value || '01/01/2030';
    const priority = document.querySelector('#priority').value || '1';
    const project = document.querySelector('#project');
    const projectIndex = project.selectedIndex;
    // Create new todo
    createTodo({
      title,
      description,
      dueDate,
      priority,
      projectIndex,
    });
  });
};

export { submitProjectForm, submitTodoForm };
