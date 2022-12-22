const showElement = element => {
  element.classList.toggle('hidden');
  element.classList.toggle('show');
};

const hideElement = element => {
  element.classList.remove('show');
  element.classList.add('hidden');
};

const toggleAddModal = () => {
  const modalElement = document.querySelector('.add-modal');
  if (modalElement.classList.contains('open')) {
    modalElement.classList.remove('open');
    modalElement.classList.add('hidden');
  } else {
    modalElement.classList.remove('hidden');
    modalElement.classList.add('open');
  }
};

const toggleEditModal = () => {
  const modalElement = document.querySelector('.edit-modal');
  if (modalElement.classList.contains('open')) {
    modalElement.classList.remove('open');
    modalElement.classList.add('hidden');
  } else {
    modalElement.classList.remove('hidden');
    modalElement.classList.add('open');
  }
};

// const closeModal = () => {
//   const modalElement = document.querySelector('.add-modal');
//   modalElement.classList.remove('open');
//   modalElement.classList.add('hidden');
// };

// Toggle sidebar list item styling for active/inactive
const toggleActive = e => {
  var elems = document.querySelectorAll('.active');
  [].forEach.call(elems, function (el) {
    el.classList.remove('active');
  });
  e.target.className = 'active';
};

export {
  showElement,
  hideElement,
  toggleAddModal,
  toggleEditModal,
  toggleActive,
};
