import { v4 as uuidv4 } from 'uuid';

const projects = [];

// Create a new project
const createProject = name => {
  const id = uuidv4();
  const todos = [];

  const projectProps = { id, name, todos };

  getProjects().push(projectProps);
  console.log('projects from projects module', getProjects());
  return projectProps;
};

const getProjects = () => projects;

const defaultProject = createProject('Personal');
const defaultProject2 = createProject('Business');

export { createProject, getProjects };
