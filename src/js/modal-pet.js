import { openOrderModal } from './modal-application.js';

const backdrop = document.querySelector('.modal-pet-backdrop');
const modalImage = document.querySelector('.modal-pet-image');
const modalSpecies = document.querySelector('.modal-pet-species');
const modalName = document.querySelector('.modal-pet-name');
const modalAge = document.querySelector('.modal-pet-age');
const modalGender = document.querySelector('.modal-pet-gender');
const modalDesc = document.querySelector('.modal-pet-desc');
const modalHealth = document.querySelector('.modal-pet-health');
const modalBehavior = document.querySelector('.modal-pet-behavior');


let currentAnimalId = null;

backdrop.addEventListener('click', onBackdropClick);
document.addEventListener('keydown', onEscKeyPress);

export function openPetModal(animalData) {
  fillModalWithData(animalData);
  backdrop.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
}

 function closePetModal() {
  backdrop.classList.add('is-hidden');
  document.body.style.overflow = '';
}

function onBackdropClick(event) {
  if (backdrop.classList.contains('is-hidden')) return;

  if (
    event.target === backdrop ||
    event.target.closest('.modal-pet-close-btn')
  ) {
    closePetModal();
    return;
  }

  if (event.target.closest('.modal-pet-adopt-btn')) {
    onAdoptClick();
  }
}

function onEscKeyPress(event) {
  if (backdrop.classList.contains('is-hidden')) return;

  if (event.key === 'Escape') {
    closePetModal();
  }
}



function onAdoptClick() {

  const animalId = currentAnimalId;
    closePetModal();
    openOrderModal(animalId);
  
}

function fillModalWithData(data) {
  currentAnimalId = data._id;
  modalImage.src = data.image;
  modalImage.alt = data.name;
  modalSpecies.textContent = data.species;
  modalName.textContent = data.name;
  modalAge.textContent = data.age;
  modalGender.textContent = data.gender;
  modalDesc.textContent = data.description;
  modalHealth.textContent = data.healthStatus;
  modalBehavior.textContent = data.behavior;
}
