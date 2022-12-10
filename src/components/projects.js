import { v4 as uuidv4 } from 'uuid';

const projectArray = [];

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

export { createProject, projectArray };