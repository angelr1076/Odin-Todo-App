import { submitProjectForm, submitTodoForm } from './forms';
import { renderProjectSidebar } from './views';
import { renderTodoFromProject } from './views';

const handleSubmitProject = () => {
  const submitProjectBtn = document.querySelector('#projectSubmitBtn');
  return submitProjectForm(submitProjectBtn);
};

const handleSubmitTodo = () => {
  const submitTodoBtn = document.querySelector('#todoSubmitBtn');
  return submitTodoForm(submitTodoBtn);
};

const handleProjectView = element => {
  // element.addEventListener('click', () => renderTodoFromProject(projectId));
  element.addEventListener('click', () => console.log(element));
};

export { handleSubmitProject, handleSubmitTodo, handleProjectView };
