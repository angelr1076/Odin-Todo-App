import { v4 as uuidv4 } from 'uuid';
import { getProjects, saveProjects } from './projects';
import { findTodo, checkProjectTodos } from './helpers';
import { filterDefault, renderTodos, renderAll } from './views';

const projects = getProjects();
let allTodos = projects.map(project => project.todos);

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

  pushTodo(todoProps);
  saveProjects();

  return { todoProps };
};

const removeTodo = id => {
  let projectHeader = document.getElementById('projectHeader');
  const todosList = document.querySelector('#todosList');
  let projectId = projectHeader.dataset.id;
  let projectOnPage = projects.find(item => item.id === projectId);

  if (projectOnPage) {
    projectOnPage.todos = projectOnPage.todos.filter(todo => todo.id !== id);
    saveProjects();
    checkProjectTodos(projectOnPage.todos, projectOnPage);
    renderTodos(projectOnPage.todos, todosList);
  }
};

const updateTodo = (id, updates) => {
  const todo = findTodo(projects, id);
  let projectHeader = document.getElementById('projectHeader');
  const todosList = document.querySelector('#todosList');
  let projectId = projectHeader.dataset.id;
  let projectOnPage = projects.find(project => project.id === projectId);

  if (typeof updates.title === 'string') {
    todo.title = updates.title;
  }
  if (typeof updates.description === 'string') {
    todo.description = updates.description;
  }
  if (typeof updates.dueDate === 'string') {
    todo.dueDate = updates.dueDate;
  }

  saveProjects();

  if (projectOnPage) {
    renderTodos(projectOnPage.todos, todosList);
  } else {
    renderAll(allTodos, todosList);
  }

  return todo;
};

const pushTodo = todo => {
  // Push the todo to the project by selected project index
  projects.find(project => {
    if (project.id === todo.projectId) {
      project.todos.push(todo);
      filterDefault(project.name);
    }
    return;
  });
};

export { createTodo, removeTodo, updateTodo };
