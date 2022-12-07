import { projectArray } from './projects';
const projects = projectArray;
import { handleProjectView } from './eventHandlers';

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
    console.log(projectArray);
  });

  console.log('renderProjectSidebar fired');
  renderProjectHeader();
  return renderList;
};

// Render project header and initialize project buttons
const renderProjectHeader = () => {
  // Grab the project name querySelector
  const projectHeader = document.querySelector('#projectHeader');
  const projectIdField = document.querySelector('#projectId');
  // Grab the project ul querySelector
  const todosList = document.querySelector('#todosList');

  // Grab the project button clicked
  const projectBtn = document.querySelectorAll('button.project-button');
  initProjectBtn(projectBtn, todosList, projectIdField, projectHeader);
  console.log('renderProjectHeader fired');
};

// Create a list of buttons for each project
const initProjectBtn = (projectBtn, list, projectId, header) => {
  projectBtn.forEach(btn => {
    const btnId = btn.getAttribute('data-attribute');
    btn.addEventListener('click', () => {
      list.innerHTML = '';
      // Search for the projectId in the projectArray
      filterProject(btnId, projectId, header);
      console.log('initProjectBtn fired');
    });
  });
};

// Filter the project by its ID
const filterProject = (projectBtn, projectId, header) => {
  console.log('filterProject fired');

  projects.filter(project => {
    if (projectBtn === project.id) {
      // Render the project name in the project name querySelector
      header.innerHTML = project.name;
      // Pass the project ID to the projectId
      projectId.value = project.id;

      const todos = project.todos;
      todos.forEach(todo => {
        let li = document.createElement('li');
        // Render the project list in the project ul querySelector
        todosList.appendChild(li);
        li.setAttribute('class', 'todo-item');
        li.innerHTML = `
        <h3>Title: ${todo.title}</h3> |
        <p>Description: ${todo.description}</p> |
        <p>Priority: ${todo.priority}</p> |
        <p>Due: ${todo.dueDate}</p>
        `;
      });
    }
    return;
  });
};

export { renderProjectSidebar, renderProjectHeader };
