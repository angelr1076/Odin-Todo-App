import { createTodo, updateTodo, removeTodo } from './todos';
import { createProject } from './projects';
import {
  filterAll,
  renderProjectSidebar,
  initEditTodo,
  showDeleteAll,
} from './views';
import { hideMessage } from './helpers';
import {
  toggleAddProj,
  toggleAddModal,
  toggleEditModal,
  toggleDeleteModal,
  toggleActive,
  showElement,
} from './showHideElements';

const closeProjModal = document.querySelector('.cancel-project');
const closeAddModal = document.querySelector('#todoCancelBtn');
const closeEditModal = document.querySelector('.cancel-edit');
const closeDeleteModal = document.querySelector('.cancel-delete');
const addTodoBtn = document.querySelector('#openAddModal');
const openSidebar = document.querySelector('#openSidebar');
const closeSidebar = document.querySelector('#closeSidebar');
const addProjBtn = document.querySelector('#plusProject');
const listEl = document.querySelector('#projectList');
const homeEl = document.querySelector('#homeList');
const deleteBtn = document.querySelector('#deleteAll');
const deleteConfirmBtn = document.querySelector('#deleteTodoSubmitBtn');

// Button titles
openSidebar.title = 'Toggle Sidebar View';
closeSidebar.title = 'Close Sidebar';
addProjBtn.title = 'Add Project';
addTodoBtn.title = 'Add Todo';

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
    // saveProjects();
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

    hideMessage();
    toggleAddModal();
    showDeleteAll();
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
    showDeleteAll();
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

    // Close modal
    toggleEditModal();
  });
};

// Delete all projects and todos
const deleteAll = () => {
  localStorage.clear();
  location.reload();
  submitTodoDelete();
};

const toggleSidebar = () => {
  const hiddenSidebar = document.querySelector('.sidebar-container');
  hiddenSidebar.classList.toggle('hidden');
};

addProjBtn.addEventListener('click', toggleAddProj);
closeProjModal.addEventListener('click', toggleAddProj);
closeAddModal.addEventListener('click', toggleAddModal);
closeEditModal.addEventListener('click', toggleEditModal);
closeDeleteModal.addEventListener('click', toggleDeleteModal);
listEl.addEventListener('click', toggleActive);
homeEl.addEventListener('click', toggleActive);
deleteBtn.addEventListener('click', toggleDeleteModal);
openSidebar.addEventListener('click', toggleSidebar);
closeSidebar.addEventListener('click', toggleSidebar);
deleteConfirmBtn.addEventListener('click', deleteAll);

const handleHomeBtnLoad = () => {
  const allTodosBtn = document.getElementById('allTodosBtn');
  const daysTodosBtn = document.querySelector('#daysTodosBtn');
  const weekTodosBtn = document.querySelector('#weekTodosBtn');
  // Click handler for the 'All' button
  allTodosBtn.addEventListener('click', filterAll);
  // Click handler for the 'Today' button
  daysTodosBtn.addEventListener('click', filterAll);
  // Click handler for the 'Week' button
  weekTodosBtn.addEventListener('click', filterAll);
};

const handleSubmitProject = () => {
  const submitProjectBtn = document.querySelector('#projectSubmitBtn');
  return submitProjectForm(submitProjectBtn);
};

const handleSubmitTodo = () => {
  const submitTodoBtn = document.querySelector('#todoSubmitBtn');
  return submitTodoForm(submitTodoBtn);
};

const handleShowAdd = () => {
  const addOpenModalBtn = document.querySelector('.open-add-modal');
  return showTodoForm(addOpenModalBtn);
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
  handleHomeBtnLoad,
  handleSubmitProject,
  handleSubmitTodo,
  handleDeleteTodo,
  handleShowAdd,
  handleShowEdit,
  showTodoForm,
  handleEditTodo,
};
