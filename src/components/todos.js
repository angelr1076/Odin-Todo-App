import { v4 as uuidv4 } from 'uuid';
import { getProjects } from './projects';
import { filterDefault, renderTodos } from './views';

// Create a new todo
const createTodo = todo => {
  const id = uuidv4();
  const projectId = document.querySelector('#projectId').value;

  const todoProps = {
    id,
    projectId,
    title: todo.title,
    description: todo.description,
    dueDate: todo.dueDate,
  };

  findProject(todoProps);

  console.log('Projects from todos module', getProjects());

  return { todoProps };
};

const removeTodo = id => {
  let projectHeader = document.getElementById('projectHeader');
  const todosList = document.querySelector('#todosList');
  let projectId = projectHeader.dataset.id;
  let projectOnPage = getProjects().find(item => item.id === projectId);

  projectOnPage.todos = projectOnPage.todos.filter(todo => todo.id !== id);
  renderTodos(projectOnPage.todos, todosList);
};

const editTodo = id => {
  console.log(id);
};

const findProject = todo => {
  // Push the todo to the project by selected project index
  getProjects().find(project => {
    if (project.id === todo.projectId) {
      project.todos.push(todo);
      filterDefault(project.name);
    }
    return;
  });
};

export { createTodo, removeTodo, editTodo };
