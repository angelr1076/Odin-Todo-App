import './styles/style.css';

function component() {
  const mainContainer = document.createElement('div');
  mainContainer.setAttribute('class', 'main-container', 'id', 'mainContainer');
  const mainContent = document.querySelector('#content');
  mainContainer.appendChild(mainContent);

  return mainContainer;
}

document.body.appendChild(component());
