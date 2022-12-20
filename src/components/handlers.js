import { createTodo, updateTodo, removeTodo } from './todos';
import { createProject, saveProjects } from './projects';
import { renderProjectSidebar, initEditTodo, renderTodos } from './views';
import {
  hideElement,
  showElement,
  toggleModal,
  closeModal,
} from './showHideElements';

const todoForm = document.querySelector('#addTodoForm');
const btnOpenModal = document.querySelector('.open-modal');
const btnCloseModal = document.querySelector('.close-modal');

// Add project form - when the submit button is chosen, create project and add to the sidebar
const submitProjectForm = element => {
  element.addEventListener('click', e => {
    e.preventDefault();
    const name =
      document.querySelector('#name').value || 'Auto Generated Project';

    createProject(name);
    saveProjects();
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
    const dueDate = document.querySelector('#dueDate').value || '2030-01-01';

    createTodo({
      projectId,
      title,
      description,
      dueDate,
    });
    saveProjects();

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
    saveProjects();
  });
};

btnOpenModal.addEventListener('click', toggleModal);
btnCloseModal.addEventListener('click', toggleModal);

const showEditTodoForm = (element, todo) => {
  element.addEventListener('click', e => {
    e.preventDefault();
    initEditTodo(todo.id);
    toggleModal();
  });
};

const submitTodoEdit = element => {
  element.addEventListener('click', e => {
    e.preventDefault();

    const titleField = document.querySelector('#editTitle').value;
    const descField = document.querySelector('#editDesc').value;
    const dateField = document.querySelector('#editDate').value;
    const todoId = document.querySelector('#todoId').value;

    const todo = updateTodo(todoId, {
      title: titleField,
      description: descField,
      dueDate: dateField,
    });

    saveProjects();
    // Close modal
    closeModal();

    return todo;
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

const handleEditTodo = () => {
  const submitEditBtn = document.querySelector('#editTodoSubmitBtn');
  return submitTodoEdit(submitEditBtn);
};

export {
  submitProjectForm,
  submitTodoForm,
  handleSubmitProject,
  handleSubmitTodo,
  handleDeleteTodo,
  handleShowEdit,
  showTodoForm,
  handleEditTodo,
};
