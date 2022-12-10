const showElement = element => {
  element.classList.toggle('hidden');
  element.classList.toggle('show');
};

const hideElement = element => {
  element.classList.remove('show');
  element.classList.add('hidden');
};

export { showElement, hideElement };
