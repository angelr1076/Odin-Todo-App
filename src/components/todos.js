import { v4 as uuidv4 } from 'uuid';
import { projectArray } from './projects';
import { filterDefault } from './views';

let projects = projectArray;

// Create a new todo
const createTodo = todo => {
  const id = uuidv4();
  const projectId = document.querySelector('#projectId').value;

  const todoProps = {
    id,
    projectId,
    title: todo.title,
    description: todo.description,
    dueDate: todo.dueDate,
  };

  findProject(todoProps);

  console.log('Projects from todos module', { projectArray });

  return { todoProps };
};

const findProject = props => {
  // Push the todo to the project by selected project index
  projects.find(project => {
    if (project.id === props.projectId) {
      project.todos.push(props);
      filterDefault(project.name);
    }
    return;
  });
};

export { createTodo };
