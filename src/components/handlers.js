import { createTodo, updateTodo, removeTodo } from './todos';
import { createProject, saveProjects } from './projects';
import { renderProjectSidebar, initEditTodo } from './views';
import { checkProjectTodos, hideMessage } from './helpers';
import {
  toggleAddProj,
  toggleAddModal,
  toggleEditModal,
  toggleActive,
  showElement,
} from './showHideElements';

const projectContBtn = document.querySelector('.show-project-cont');
const closeProjModal = document.querySelector('.cancel-project');
const closeAddModal = document.querySelector('#todoCancelBtn');
const closeEditModal = document.querySelector('.cancel-edit');
const openSidebar = document.querySelector('#openSidebar');
const closeSidebar = document.querySelector('#closeSidebar');
const listEl = document.querySelector('#projectList');
const homeEl = document.querySelector('#homeList');

// Add project form - when the submit button is chosen, create project and add to the sidebar
const submitProjectForm = element => {
  element.addEventListener('click', e => {
    e.preventDefault();
    const name = document.querySelector('#name').value || 'Work';

    createProject(name);
    saveProjects();
    toggleAddProj();
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
    hideMessage();
    toggleAddModal();
  });
};

// Show the add todo modal
const showTodoForm = element => {
  element.addEventListener('click', () => {
    toggleAddModal();
  });
};

// Show the edit todo modal
const showEditTodoForm = (element, todo) => {
  element.addEventListener('click', e => {
    initEditTodo(todo.id);
    toggleEditModal();
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

const submitTodoEdit = element => {
  element.addEventListener('click', e => {
    e.preventDefault();

    const titleField = document.querySelector('#editTitle').value;
    const descField = document.querySelector('#editDesc').value;
    const dateField = document.querySelector('#editDate').value;
    const todoId = document.querySelector('#todoId').value;

    updateTodo(todoId, {
      title: titleField,
      description: descField,
      dueDate: dateField,
    });

    saveProjects();
    // Close modal
    toggleEditModal();
  });
};

const toggleSidebar = () => {
  const hiddenSidebar = document.querySelector('.sidebar-container');
  hiddenSidebar.classList.toggle('hidden');
};

projectContBtn.addEventListener('click', toggleAddProj);
closeProjModal.addEventListener('click', toggleAddProj);
closeAddModal.addEventListener('click', toggleAddModal);
closeEditModal.addEventListener('click', toggleEditModal);
listEl.addEventListener('click', toggleActive);
homeEl.addEventListener('click', toggleActive);
openSidebar.addEventListener('click', toggleSidebar);
closeSidebar.addEventListener('click', toggleSidebar);

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

const handleShowAdd = () => {
  const addOpenModalBtn = document.querySelector('.open-add-modal');
  return showTodoForm(addOpenModalBtn);
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
  handleShowAdd,
  handleShowEdit,
  showTodoForm,
  handleEditTodo,
};
