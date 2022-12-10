import { handleDeleteTodo } from './handlers';
import { projectArray } from './projects';
const projects = projectArray;

// Render project list in the sidebar
const renderProjectSidebar = () => {
  const projectList = document.querySelector('#projectList');
  projectList.innerHTML = '';

  const renderList = projectArray.forEach(project => {
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
  const projectHeader = document.querySelector('#projectHeader');
  const todosList = document.querySelector('#todosList');

  projects.filter(project => {
    if (projectName === project.name) {
      // Render the project name in the project name querySelector
      projectHeader.innerHTML = project.name;
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
  const projectHeader = document.querySelector('#projectHeader');

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
  projects.filter(project => {
    if (projectBtn === project.id) {
      // Render the project name in the project name querySelector
      header.innerHTML = project.name;
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
    li.innerHTML = `
                <h3 class="todo-title">${todo.title}</h3> |
                <p class="todo-description" title="${
                  todo.description
                }">Description: ${truncateString(todo.description)}</p> |
                <p class-"todo-duedate">Due: ${todo.dueDate}</p>
                <button id="todoDelete-${
                  todo.id
                }" class="btn todo-delete" data-attribute="${
      todo.id
    }">Delete</button>
              `;
    handleDeleteTodo(todo.id);
  });
};

// Helpers
const truncateString = str => {
  const charCount = 20;
  if (str.length > charCount) {
    return str.slice(0, charCount) + '...';
  } else {
    return str;
  }
};

export {
  renderProjectSidebar,
  renderProjectHeader,
  loadDefaultProject,
  filterDefault,
};
