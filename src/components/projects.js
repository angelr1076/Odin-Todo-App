import { v4 as uuidv4 } from 'uuid';

let projects = [];

const loadProjects = () => {
  const projectsJSON = localStorage.getItem('projects');

  try {
    return projectsJSON ? JSON.parse(projectsJSON) : [];
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
  const id = uuidv4();
  const todos = [];

  const projectProps = { id, name, todos };

  projects.push(projectProps);
  saveProjects();
  return projectProps;
};

const getProjects = () => projects;

// const defaultProject = createProject('Personal');
// const defaultProject2 = createProject('Work');

projects = loadProjects();

export { createProject, getProjects, saveProjects, loadProjects };
