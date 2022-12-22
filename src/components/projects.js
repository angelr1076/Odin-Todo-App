import { v4 as uuidv4 } from 'uuid';
import { warningMsg } from './views';

let projects = [];

const loadProjects = () => {
  const projectsJSON = localStorage.getItem('projects');

  try {
    return projectsJSON
      ? JSON.parse(projectsJSON)
      : [
          {
            id: uuidv4(),
            name: 'Personal',
            todos: [],
          },
        ];
  } catch (e) {
    return [];
  }
};

// Save the project(s) to localStorage
const saveProjects = () => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

// Create a new project
const createProject = name => {
  const duplicateProject = projects.find(project => project.name === name);

  if (!duplicateProject) {
    const id = uuidv4();
    const todos = [];

    const projectProps = { id, name, todos };
    projects.push(projectProps);
    saveProjects();
  } else {
    warningMsg(name);
  }
};

const getProjects = () => projects;

projects = loadProjects();

export { createProject, getProjects, saveProjects, loadProjects };
