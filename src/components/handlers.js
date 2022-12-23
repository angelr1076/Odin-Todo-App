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
  hideElement,
} from './showHideElements';

const projectContBtn = document.querySelector('.show-project-cont');
const closeProjModal = document.querySelector('.cancel-project');
const closeAddModal = document.querySelector('#todoCancelBtn');
const closeEditModal = document.querySelector('.cancel-edit');
const listEl = document.querySelector('#projectList');
const homeEl = document.querySelector('#homeList');
const deleteBtn = document.querySelector('#deleteAll');

// Add project form - when the submit button is chosen, create project and add to the sidebar
const submitProjectForm = element => {
  element.addEventListener('click', e => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const form = document.querySelector('#projectForm');
    let projectTitle = document.querySelector('#projWarningMsg');

    if (!name) {
      showElement(projectTitle);
      projectTitle.textContent = 'Please add a Project name.';
      return setTimeout(() => {
        hideElement(projectTitle);
      }, 2000);
    }

    createProject(name);
    saveProjects();
    toggleAddProj();
    renderProjectSidebar();
    form.reset();
  });
  return;
};

// Add todo form - when the submit button is chosen, create todo and hide form
const submitTodoForm = element => {
  element.addEventListener('click', e => {
    e.preventDefault();
    let projectId = document.querySelector('#projectId').value;
    let title = document.querySelector('#title').value;
    let description = document.querySelector('#description').value;
    let dueDate = document.querySelector('#dueDate').value;
    const titleEl = document.querySelector('#title');
    const descEl = document.querySelector('#description');
    const dateEl = document.querySelector('#dueDate');
    let formTitle = document.querySelector('#todoAddMsg');

    if (!title || !description || !dueDate) {
      console.log('not todo');
      showElement(formTitle);
      formTitle.textContent = 'Please add a title, desc. and date.';
      return setTimeout(() => {
        hideElement(formTitle);
      }, 2000);
    }

    createTodo({
      projectId,
      title,
      description,
      dueDate,
    });

    saveProjects();
    hideMessage();
    toggleAddModal();
    // Clear form fields
    titleEl.value = '';
    descEl.value = '';
    dateEl.value = '';
  });
  return;
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

const deleteAll = () => {
  // Clear everything
  localStorage.clear();
  location.reload();
};

projectContBtn.addEventListener('click', toggleAddProj);
closeProjModal.addEventListener('click', toggleAddProj);
closeAddModal.addEventListener('click', toggleAddModal);
closeEditModal.addEventListener('click', toggleEditModal);
listEl.addEventListener('click', toggleActive);
homeEl.addEventListener('click', toggleActive);
deleteBtn.addEventListener('click', deleteAll);

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
