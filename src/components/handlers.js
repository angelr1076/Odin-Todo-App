import { createTodo, removeTodo } from './todos';
import { createProject } from './projects';
import { renderProjectSidebar } from './views';
import { hideElement, showElement } from './showHideElements';
import { format, compareAsc, add } from 'date-fns';

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
  });
};

const showTodoForm = () => {
  const todoBtn = document.querySelector('#addTodo');
  const cancelBtn = document.querySelector('#todoCancelBtn');
  const todoForm = document.querySelector('#todoFormCont');
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

const handleSubmitProject = () => {
  const submitProjectBtn = document.querySelector('#projectSubmitBtn');
  return submitProjectForm(submitProjectBtn);
};

const handleSubmitTodo = () => {
  const submitTodoBtn = document.querySelector('#todoSubmitBtn');
  return submitTodoForm(submitTodoBtn);
};

const handleDeleteTodo = id => {
  const removeTodoBtn = document.querySelector(`#todoDelete-${id}`);
  return submitTodoDelete(removeTodoBtn);
};

export {
  submitProjectForm,
  submitTodoForm,
  handleSubmitProject,
  handleSubmitTodo,
  handleDeleteTodo,
  showTodoForm,
};
