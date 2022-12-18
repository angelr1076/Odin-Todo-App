import { createTodo, editTodo, removeTodo } from './todos';
import { createProject } from './projects';
import { renderProjectSidebar } from './views';
import { hideElement, showElement } from './showHideElements';
import { setAttributes } from './helpers';
import { format, compareAsc, add } from 'date-fns';

const todoForm = document.querySelector('#addTodoForm');

const btnOpenModal = document.querySelector('.open-modal');
const btnCloseModal = document.querySelector('.close-modal');
const modalElement = document.querySelector('.edit-modal');

// Add project form - when the submit button is chosen, create project and add to the sidebar
const submitProjectForm = element => {
  element.addEventListener('click', e => {
    e.preventDefault();
    const name =
      document.querySelector('#name').value || 'Auto Generated Project';

    createProject(name);
    renderProjectSidebar();
  });
  return;
};

// Add todo form - when the submit button is chosen, create todo and hide form
const submitTodoForm = element => {
  element.addEventListener('click', e => {
    e.preventDefault();
    const projectId = document.querySelector('#projectId').value;
    const title =
      document.querySelector('#title').value || 'Cupcake ipsum dolor ';
    const description =
      document.querySelector('#description').value ||
      'Macaroon gummi bears cake pie cheesecake oat cake. Cheesecake sweet roll topping jelly-o muffin I love.';
    const dueDate = document.querySelector('#dueDate').value || '01/01/2030';

    createTodo({
      projectId,
      title,
      description,
      dueDate,
    });
    hideElement(todoForm);
  });
};

// Show and hide the add todo form and toggle the show/hide when the + todo button is clicked
const showTodoForm = () => {
  const todoBtn = document.querySelector('#addTodo');
  const cancelBtn = document.querySelector('#todoCancelBtn');
  todoBtn.addEventListener(
    'click',
    () =>
      (todoForm.style.visibility = 'visible' ? showElement(todoForm) : null),
  );
  cancelBtn.addEventListener('click', e => {
    e.preventDefault();
    hideElement(todoForm);
  });
};

const submitTodoDelete = element => {
  const todoId = element.getAttribute('data-attribute');
  element.addEventListener('click', e => {
    e.preventDefault();
    removeTodo(todoId);
  });
};

const addClass = () => {
  modalElement.classList.remove('hidden');
  modalElement.classList.add('open');
};

const removeClass = () => {
  modalElement.classList.remove('open');
};

btnOpenModal.addEventListener('click', addClass);
btnCloseModal.addEventListener('click', removeClass);

const showEditTodoForm = (element, todo) => {
  element.addEventListener('click', e => {
    e.preventDefault();
    editTodo(todo);
    addClass();
  });
};

const handleSubmitProject = () => {
  const submitProjectBtn = document.querySelector('#projectSubmitBtn');
  return submitProjectForm(submitProjectBtn);
};

const handleSubmitTodo = () => {
  const submitTodoBtn = document.querySelector('#todoSubmitBtn');
  return submitTodoForm(submitTodoBtn);
};

const handleDeleteTodo = todo => {
  const removeTodoBtn = document.querySelector(`#todoDelete-${todo.id}`);
  return submitTodoDelete(removeTodoBtn);
};

const handleShowEdit = todo => {
  const editTodoBtn = document.querySelector(`#todoEdit-${todo.id}`);
  return showEditTodoForm(editTodoBtn, todo);
};

export {
  submitProjectForm,
  submitTodoForm,
  handleSubmitProject,
  handleSubmitTodo,
  handleDeleteTodo,
  handleShowEdit,
  showTodoForm,
};
