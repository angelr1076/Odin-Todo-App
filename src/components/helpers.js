import { todoEl } from './views';
import { handleDeleteTodo, handleShowEdit } from './handlers';
import parseISO from 'date-fns/parseISO';
import isToday from 'date-fns/isToday';
import isThisWeek from 'date-fns/isThisWeek';

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
  if (projectId === 'all' || projectId === 'today' || projectId === 'week') {
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
    if (todoString) {
      let todoArray = JSON.parse(todoString);
      todoArray.map(item => {
        if (isToday(parseISO(item.dueDate))) {
          filteredTodos.push(item);
        }
      });
    }
  });
  return filteredTodos;
};

const todoIsWeek = todoArr => {
  let filteredTodos = [];
  todoArr.map(todo => {
    let todoString = JSON.stringify(todo);
    if (todoString) {
      let todoArray = JSON.parse(todoString);
      todoArray.map(item => {
        if (isThisWeek(parseISO(item.dueDate))) {
          filteredTodos.push(item);
        }
      });
    }
  });
  return filteredTodos;
};

// params for header, todosArr, el,
const parseTodosView = (header, todosArr, el) => {
  if (header === 'all' && todosArr) {
    todosArr.forEach(todo => {
      if (todo) {
        todo.forEach(item => {
          const mainDiv = document.createElement('div');
          // Render the project list in the project ul querySelector
          el.appendChild(mainDiv);

          mainDiv.setAttribute('id', `todoItem-${item.id}`);
          mainDiv.setAttribute('class', 'todo-item');
          mainDiv.innerHTML = todoEl(item);

          const deleteBtn = mainDiv.querySelector('i[name="deleteButton"]');
          deleteBtn.classList.add('hidden');

          handleDeleteTodo(item);
          handleShowEdit(item);
        });
      }
    });
  } else if (header === 'today' && todosArr) {
    let todayTodos = todoIsToday(todosArr);

    if (todayTodos) {
      todayTodos.forEach(todo => {
        const mainDiv = document.createElement('div');
        // Render the project list in the project ul querySelector
        el.appendChild(mainDiv);

        mainDiv.setAttribute('id', `todoItem-${todo.id}`);
        mainDiv.setAttribute('class', 'todo-item');
        mainDiv.innerHTML = todoEl(todo);

        const deleteBtn = mainDiv.querySelector('i[name="deleteButton"]');
        deleteBtn.classList.add('hidden');

        handleDeleteTodo(todo);
        handleShowEdit(todo);
      });
    }
  } else if (header === 'week' && todosArr) {
    let thisWeekTodos = todoIsWeek(todosArr);

    if (thisWeekTodos) {
      thisWeekTodos.forEach(todo => {
        const mainDiv = document.createElement('div');
        // Render the project list in the project ul querySelector
        el.appendChild(mainDiv);

        mainDiv.setAttribute('id', `todoItem-${todo.id}`);
        mainDiv.setAttribute('class', 'todo-item');
        mainDiv.innerHTML = todoEl(todo);

        const deleteBtn = mainDiv.querySelector('i[name="deleteButton"]');
        deleteBtn.classList.add('hidden');

        handleDeleteTodo(todo);
        handleShowEdit(todo);
      });
    }
  }
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
  todoIsWeek,
  parseTodosView,
  capitalize,
  hideMessage,
};
