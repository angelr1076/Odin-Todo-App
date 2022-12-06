import { v4 as uuidv4 } from 'uuid';
import { projectArray } from './projects';
import { renderTodoFromProject } from './views';

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
    priority: todo.priority,
  };

  // Push the todo to the project by selected project index
  projects.find(project => {
    if (project.id === todoProps.projectId) {
      project.todos.push(todoProps);
    }
    return;
  });

  renderTodoFromProject();
  console.log('Projects from todos module', { projectArray });

  return { todoProps };
};

export { createTodo };
