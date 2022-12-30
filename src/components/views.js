import { handleDeleteTodo, handleShowEdit } from './handlers';
import {
  findTodo,
  checkProjectTodos,
  todoIsToday,
  capitalize,
  hideMessage,
} from './helpers';
import { getProjects, loadProjects } from './projects';
import { hideElement, showElement } from './showHideElements';
import parseISO from 'date-fns/parseISO';
import isToday from 'date-fns/isToday';

const projectHeader = document.querySelector('#projectHeader');
const allTodosBtn = document.querySelector('#allTodosBtn');
const daysTodosBtn = document.querySelector('#daysTodosBtn');
const addTodoButton = document.querySelector('#openAddModal');
const projects = getProjects();

// Render project list in the sidebar
const renderProjectSidebar = () => {
  const projectList = document.querySelector('#projectList');
  projectList.innerHTML = '';

  const renderList = projects.forEach(project => {
    const projectsListItem = document.createElement('li');
    // Add an anchor for each item
    const projectsAnchor = document.createElement('a');
    projectsAnchor.setAttribute('id', 'projectButton');
    projectsAnchor.setAttribute('class', 'home-button btn');
    projectsAnchor.setAttribute('data-attribute', `${project.id}`);
    projectsAnchor.innerHTML = project.name;
    projectsListItem.append(projectsAnchor);
    projectList.append(projectsListItem);
    // Set the Personal project button as active by default
    document.querySelector('#projectButton').classList.add('active');
  });

  loadProjects();
  renderProjectHeader();
  return renderList;
};

// Render project header and initialize project buttons
const loadDefaultProject = () => {
  const projectName = 'Personal';
  filterDefault(projectName);
};

const filterDefault = projectName => {
  projects.filter(project => {
    if (projectName === project.name) {
      const todosList = document.querySelector('#todosList');
      projectHeader.dataset.id = project.id;
      // Render the project name in the project name querySelector
      projectHeader.textContent = project.name;
      // Pass the project ID to the projectId
      projectId.value = project.id;
      const todos = project.todos;
      renderTodos(todos, todosList);
    }
  });
};

// Render project header and initialize project buttons
const renderProjectHeader = () => {
  const projectBtn = document.querySelectorAll('a#projectButton');
  const todosList = document.querySelector('#todosList');
  const projectIdField = document.querySelector('#projectId');

  loadProjects();
  initProjectBtn(projectBtn, todosList, projectIdField, projectHeader);
};

// Create a list of buttons for each project and get each project
const initProjectBtn = (projectBtn, list, projectId, header) => {
  projectBtn.forEach(btn => {
    const btnId = btn.getAttribute('data-attribute');
    btn.addEventListener('click', () => {
      // Clear the todos list each time the button is pressed
      list.innerHTML = '';

      filterProject(btnId, projectId, header);
    });
  });
};

const renderHomeMenu = (todos, todosEl) => {
  let headerName = projectHeader.dataset.id;
  // Clear the todos list each time the button is pressed
  todosEl.innerHTML = '';

  if (headerName === 'all' && todos) {
    console.log(todos);
    todos.forEach(todo => {
      if (todo) {
        todo.forEach(item => {
          const mainDiv = document.createElement('div');
          // Render the project list in the project ul querySelector
          todosEl.appendChild(mainDiv);

          mainDiv.setAttribute('id', `todoItem-${item.id}`);
          mainDiv.setAttribute('class', 'todo-item');
          mainDiv.innerHTML = todoEl(item);

          const deleteBtn = mainDiv.querySelector('i[name="deleteButton"]');
          deleteBtn.classList.add('hidden');

          handleDeleteTodo(item);
          handleShowEdit(item);
        });
      }
    });
  } else if (headerName === 'today' && todos) {
    let todayTodos = todoIsToday(todos);

    if (todayTodos) {
      todayTodos.forEach(todo => {
        const mainDiv = document.createElement('div');
        // Render the project list in the project ul querySelector
        todosEl.appendChild(mainDiv);

        mainDiv.setAttribute('id', `todoItem-${todo.id}`);
        mainDiv.setAttribute('class', 'todo-item');
        mainDiv.innerHTML = todoEl(todo);

        const deleteBtn = mainDiv.querySelector('i[name="deleteButton"]');
        deleteBtn.classList.add('hidden');

        handleDeleteTodo(todo);
        handleShowEdit(todo);
      });
    }
  }
};

// Rebuild the filterAll function to handle All, Today and Week buttons
const filterAll = btnName => {
  const todosList = document.querySelector('#todosList');
  const button = btnName.target.name;
  // separate header assignment into its own function based on the button name attribute
  if (button === 'all') {
    let header = projectHeader;
    header.dataset.id = button;
    todosList.innerHTML = '';
    header.innerHTML = `${capitalize(button)} Todos`;
    hideMessage();
    hideElement(addTodoButton);
  } else if (button === 'today') {
    let header = projectHeader;
    header.dataset.id = button;
    todosList.innerHTML = '';
    header.innerHTML = capitalize(button);
    hideMessage();
    hideElement(addTodoButton);
  } else if (button === 'week') {
    // Do something...
  }

  const todos = projects.map(project => {
    const todoList = project.todos;
    if (todoList.length > 0) {
      return todoList;
    }
  });

  checkProjectTodos(todos, button);
  renderHomeMenu(todos, todosList);
};

// Click handler for the 'All' button
allTodosBtn.addEventListener('click', filterAll);
// Click handler for the 'Today' button
daysTodosBtn.addEventListener('click', filterAll);

// Filter the project by its ID
const filterProject = (projectBtn, projectId, header) => {
  const message = document.querySelector('#message');
  message.textContent = '';
  showElement(addTodoButton);

  // console.log({ projectBtn, projectId, header });
  projects.filter(project => {
    if (projectBtn === project.id) {
      // Render the project name in the project name querySelector
      header.dataset.id = project.id;
      header.textContent = project.name;

      projectId.value = project.id;
      const todos = project.todos;
      checkProjectTodos(todos, project);
      renderTodos(todos, todosList);
    }
  });
};

const todoEl = todo => {
  const todoHTML = `
    <div id="todoContainer" class="todo-container">
      <div class="todo-container__left>
        <h3 class="todo-title">${todo.title}</h3>
      </div>
      <div class="todo-container__right">  
        <span class="todo-duedate">${todo.dueDate}</span>
        <i id="todoEdit-${todo.id}" class="bi bi-pencil-square todo-edit" data-attribute="${todo.id}"></i>
        <i id="todoDelete-${todo.id}" class="bi bi-trash todo-delete" name="deleteButton" data-attribute="${todo.id}"></i>
      </div>
    </div>`;

  return todoHTML;
};

const renderTodos = (todosArray, todosEl) => {
  // Clear the todos list each time the button is pressed
  todosEl.innerHTML = '';

  todosArray.forEach(todo => {
    const mainDiv = document.createElement('div');
    // Render the project list in the project ul querySelector
    todosEl.appendChild(mainDiv);

    mainDiv.setAttribute('id', `todoItem-${todo.id}`);
    mainDiv.setAttribute('class', 'todo-item');
    mainDiv.innerHTML = todoEl(todo);

    handleDeleteTodo(todo);
    handleShowEdit(todo);
  });
};

// Show values for the current todo being edited on the edit form
const initEditTodo = todoId => {
  let todoIdField = document.querySelector('#todoId');
  let titleField = document.querySelector('#editTitle');
  let descField = document.querySelector('#editDesc');
  let dateField = document.querySelector('#editDate');

  todoIdField.value = todoId;
  titleField.value = findTodo(projects, todoId).title;
  descField.value = findTodo(projects, todoId).description;
  dateField.value = findTodo(projects, todoId).dueDate;
};

const warningMsg = projectName => {
  const warningMsg = document.querySelector('#message');
  warningMsg.textContent = `The project name '${projectName}' already exists.`;
  setTimeout(() => {
    warningMsg.textContent = '';
  }, 2500);
};

export {
  renderProjectSidebar,
  renderProjectHeader,
  renderTodos,
  renderHomeMenu,
  loadDefaultProject,
  filterDefault,
  initEditTodo,
  warningMsg,
};
