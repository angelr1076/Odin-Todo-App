import { v4 as uuidv4 } from 'uuid';

const projectArray = [];

const renderProjectList = () => {
  const select = document.querySelector('#project');
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

// Create a new project
const createProject = name => {
  const id = uuidv4();
  const todos = [];
  const projectProps = { id, name, todos };

  projectArray.push(projectProps);
  console.log('projects from projects module', { projectArray });
  return projectProps;
};

const defaultProject = createProject('Personal');
const defaultProject2 = createProject('Business');

export { createProject, renderProjectList, projectArray };
