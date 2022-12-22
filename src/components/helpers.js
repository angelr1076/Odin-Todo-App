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

const findTodo = (projects, todoId) => {
  const projectId = projectHeader.dataset.id;
  let projectOnPage = projects.find(project => project.id === projectId);
  const todoToEdit = projectOnPage.todos.find(todo => todo.id === todoId);
  return todoToEdit;
};

const checkProjectTodos = (arr, project) => {
  if (arr.length === 0) {
    message.textContent = `There are no todos for '${project.name}'`;
    projectHeader.textContent = '';
  }
};

const hideMessage = () => {
  return (message.textContent = '');
};

export {
  truncateString,
  setAttributes,
  findTodo,
  checkProjectTodos,
  hideMessage,
};
