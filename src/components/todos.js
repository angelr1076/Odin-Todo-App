import { v4 as uuidv4 } from 'uuid';
import { getProjects, saveProjects } from './projects';
import { findTodo, checkProjectTodos } from './helpers';
import { filterDefault, renderTodos, renderHomeMenu } from './views';

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
    completed: false,
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
    renderHomeMenu(allTodos, todosList);
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

const toggleCompleted = id => {
  const todo = findTodo(projects, id);
  const todoTitle = document.querySelector(`#todoItem-${id} .todo-title`);

  todo.completed = !todo.completed;

  if (todo.completed) {
    todoTitle.classList.add('todo-completed');
  } else {
    todoTitle.classList.remove('todo-completed');
  }

  saveProjects();
};

export { createTodo, removeTodo, updateTodo, toggleCompleted };
