const showElement = element => {
  element.classList.toggle('hidden');
  element.classList.toggle('show');
};

const hideElement = element => {
  element.classList.remove('show');
  element.classList.add('hidden');
};

const toggleModal = () => {
  const modalElement = document.querySelector('.edit-modal');
  modalElement.classList.toggle('hidden');
  modalElement.classList.toggle('open');
};

const closeModal = () => {
  const modalElement = document.querySelector('.edit-modal');
  modalElement.classList.remove('open');
  modalElement.classList.add('hidden');
};

export { showElement, hideElement, toggleModal, closeModal };
