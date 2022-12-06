import { projectArray } from './projects';

// Render project list in a dropdown selector
const renderProjectList = () => {
  const select = document.querySelector('#projects');
  const values = projectArray.map(item => item);

  for (let item of values) {
    let option = document.createElement('option');
    option.value = item.name;
    option.setAttribute('id', item.id);
    option.setAttribute('class', item.name);
    option.innerHTML = item.name;
    select.appendChild(option);
  }

  return renderProjectList;
};

// Render project list in the sidebar
const renderProjectSidebar = () => {
  const projectList = document.querySelector('#projectList');
  projectList.innerHTML = '';

  const renderList = projectArray.forEach(project => {
    const projectsListItem = document.createElement('li');
    projectsListItem.setAttribute('class', 'project-listitem');
    const projectBtn = document.createElement('button');
    projectBtn.setAttribute('data-attribute', `${project.id}`);
    projectBtn.setAttribute('class', 'project-button');
    // Add an anchor for each item
    projectBtn.innerHTML = project.name;
    projectsListItem.append(projectBtn);
    projectList.append(projectsListItem);
    console.log(projectList, projectArray);
  });

  return renderList;
};

// Render todos when selecting project from sidebar list
const renderTodoFromProject = () => {
  const projects = projectArray;
  // Grab the project name querySelector
  const projectHeader = document.querySelector('#projectHeader');
  const projectIdField = document.querySelector('#projectId');
  // Grab the project ul querySelector
  const todosList = document.querySelector('#todosList');

  // Grab the project button clicked
  const projectBtn = document.querySelectorAll('button.project-button');
  projectBtn.forEach(btn => {
    const btnId = btn.getAttribute('data-attribute');
    btn.addEventListener('click', () => {
      // Search for the projectId in the projectArray
      projects.filter(project => {
        if (btnId === project.id) {
          // Render the project name in the project name querySelector
          projectHeader.innerHTML = project.name;
          // Pass the project ID to the projectIdField
          projectIdField.value = project.id;

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
      });
    });
  });
};

export { renderProjectList, renderProjectSidebar, renderTodoFromProject };
