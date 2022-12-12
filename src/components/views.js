import { truncateString } from './helpers';
import { handleDeleteTodo, handleEditTodo } from './handlers';
import { getProjects } from './projects';

const projectHeader = document.querySelector('#projectHeader');

// Render project list in the sidebar
const renderProjectSidebar = () => {
  const projectList = document.querySelector('#projectList');
  projectList.innerHTML = '';

  const renderList = getProjects().forEach(project => {
    const projectsListItem = document.createElement('li');
    projectsListItem.setAttribute('class', 'project-listitem');
    const projectBtn = document.createElement('button');
    projectBtn.setAttribute('data-attribute', `${project.id}`);
    projectBtn.setAttribute('id', 'projectButton');
    projectBtn.setAttribute('class', 'project-button');
    // Add an anchor for each item
    projectBtn.innerHTML = project.name;
    projectsListItem.append(projectBtn);
    projectList.append(projectsListItem);
  });

  renderProjectHeader();
  return renderList;
};

// Render project header and initialize project buttons
const loadDefaultProject = () => {
  const projectName = 'Personal';
  filterDefault(projectName);
};

const filterDefault = projectName => {
  getProjects().filter(project => {
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
  const projectBtn = document.querySelectorAll('button.project-button');
  const todosList = document.querySelector('#todosList');
  const projectIdField = document.querySelector('#projectId');

  initProjectBtn(projectBtn, todosList, projectIdField, projectHeader);
};

// Create a list of buttons for each project and get each project
const initProjectBtn = (projectBtn, list, projectId, header) => {
  projectBtn.forEach(btn => {
    const btnId = btn.getAttribute('data-attribute');
    btn.addEventListener('click', () => {
      // Clear the todos list each time the button is pressed
      list.innerHTML = '';
      // Search for the projectId in the projectArray
      filterProject(btnId, projectId, header);
    });
  });
};

// Filter the project by its ID
const filterProject = (projectBtn, projectId, header) => {
  getProjects().filter(project => {
    if (projectBtn === project.id) {
      // Render the project name in the project name querySelector
      projectHeader.dataset.id = project.id;
      header.textContent = project.name;
      // Pass the project ID to the projectId
      projectId.value = project.id;
      const todos = project.todos;
      renderTodos(todos, todosList);
    }
  });
};

const renderTodos = (todosArray, todosEl) => {
  // Clear the todos list each time the button is pressed
  todosEl.innerHTML = '';

  todosArray.forEach(todo => {
    let li = document.createElement('li');
    // Render the project list in the project ul querySelector
    todosEl.appendChild(li);
    li.setAttribute('class', 'todo-item');
    li.dataset.id = todo.id;
    li.innerHTML = `
                <h3 class="todo-title">${todo.title}</h3> |
                <p class="todo-description" title="${
                  todo.description
                }">Description: ${truncateString(todo.description)}</p> |
                <p class-"todo-duedate">Due: ${todo.dueDate}</p>
                <button id="todoEdit-${
                  todo.id
                }" class="btn todo-edit" data-attribute="${
      todo.id
    }">Edit</button>
                <button id="todoDelete-${
                  todo.id
                }" class="btn todo-delete" data-attribute="${
      todo.id
    }">Delete</button>
              `;
    handleDeleteTodo(todo);
    handleEditTodo(todo);
  });
};

export {
  renderProjectSidebar,
  renderProjectHeader,
  renderTodos,
  loadDefaultProject,
  filterDefault,
};
