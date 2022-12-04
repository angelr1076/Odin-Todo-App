const showElement = element => {
  element.classList.remove('hidden');
  element.classList.add('show');
};

const hideElement = element => {
  element.classList.remove('show');
  element.classList.add('hidden');
};

export { showElement, hideElement };
