import parseISO from 'date-fns/parseISO';
import isToday from 'date-fns/isToday';

// Truncate the todo description on the todo list page
const truncateString = str => {
  const charCount = 20;
  if (str.length > charCount) {
    return str.slice(0, charCount) + '...';
  } else {
    return str;
  }
};

// Sets multiple attributes on an element
const setAttributes = (element, attributes) => {
  Object.keys(attributes).forEach(attr =>
    element.setAttribute(attr, attributes[attr]),
  );
};

// Populates the todo modal title, desc and dueDate properties in edit mode
const findTodo = (projects, todoId) => {
  const projectId = projectHeader.dataset.id;
  // find todo for the 'All' Home view
  if (projectId === 'all') {
    let todoToEdit;
    projects.forEach(project =>
      project.todos.find(todo => {
        if (todo.id === todoId) {
          todoToEdit = todo;
        }
      }),
    );
    return todoToEdit;
  } else {
    let projectOnPage = projects.find(project => project.id === projectId);
    const todoToEdit = projectOnPage.todos.find(todo => todo.id === todoId);
    return todoToEdit;
  }
};

const checkProjectTodos = (arr, project) => {
  if (arr.length === 0 && project !== 'all') {
    message.textContent = `There are no todos for ${project.name}.`;
    projectHeader.textContent = '';
  } else if ((arr.length === 0 && project === 'all') || arr[0] === undefined) {
    message.textContent = `No todos found.`;
    projectHeader.textContent = '';
  }
};

const todoIsToday = todoArr => {
  let filteredTodos = [];
  todoArr.map(todo => {
    let todoString = JSON.stringify(todo);
    let todoArray = JSON.parse(todoString);
    todoArray.map(item => {
      if (isToday(parseISO(item.dueDate))) {
        filteredTodos.push(item);
      }
    });
  });
  return filteredTodos;
};

const capitalize = word => {
  return word[0].toUpperCase() + word.substring(1);
};

const hideMessage = () => {
  return (message.textContent = '');
};

export {
  truncateString,
  setAttributes,
  findTodo,
  checkProjectTodos,
  todoIsToday,
  capitalize,
  hideMessage,
};
