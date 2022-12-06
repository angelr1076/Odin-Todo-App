import { submitProjectForm, submitTodoForm } from './forms';
import { renderProjectSidebar, renderTodoFromProject } from './views';

const handleSubmitProject = () => {
  const submitProjectBtn = document.querySelector('#projectSubmitBtn');
  return submitProjectForm(submitProjectBtn);
};

const handleSubmitTodo = () => {
  const submitTodoBtn = document.querySelector('#todoSubmitBtn');
  submitTodoForm(submitTodoBtn);
};

const handleProjectView = element => {
  element.addEventListener('click', () => {
    renderTodoFromProject(projectId);
  });
};

export { handleSubmitProject, handleSubmitTodo, handleProjectView };
