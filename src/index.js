function component() {
  // Create div with an ID of 'domContent'
  const mainContainer = document.createElement('div'); // MAIN DIV
  mainContainer.setAttribute('id', 'main');
  mainContainer.setAttribute('class', 'main');

  return mainContainer;
}

document.body.appendChild(component());
