import { v4 as uuidv4 } from 'uuid';
import { projectArray } from './projects';

let projects = projectArray;

// Create a new todo
const createTodo = todo => {
  const id = uuidv4();

  const todoProps = {
    id,
    title: todo.title,
    description: todo.description,
    dueDate: todo.dueDate,
    priority: todo.priority,
    project: todo.projectIndex,
    projectId: id,
  };

  // Push the todo to the project by selected project index
  projects[todoProps.project].todos.push(todoProps);
  // Add the projectId to the todo
  todoProps.projectId = projects[todoProps.project].id;
  console.log('Projects from todos module', { projectArray });

  return { todoProps };
};

export { createTodo };
