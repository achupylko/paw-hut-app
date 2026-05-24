import axios from 'axios';
import * as basicLightbox from 'basiclightbox';
//import 'basiclightbox/dist/basicLightbox.min.css';

const orderForm = document.querySelector('.order-form');
const orderBackdrop = document.querySelector('.order-modal-overlay');
const orderCloseBtn = document.querySelector('.order-close-btn');
const orderSubmitBtn = document.querySelector('.order-submit-btn');

const ERRORS = {
  BAD_REQUEST: 'Bad request (invalid request params)',
  PET_NOT_FOUND: 'Pet not found',
  SERVER: 'Server error',
};

export function openOrderModal(animalId) {
  // Add animal id to order form data set
  orderForm.dataset.animalId = animalId;

  // Show modal order window
  orderBackdrop.classList.add('is-open');

  // Add listener to close button
  orderCloseBtn.addEventListener('click', closeOrderModal);

  // Add listener to order submit button
  orderForm.addEventListener('submit', onOrderSubmit);

  // Add listener to backdrop
  orderBackdrop.addEventListener('click', handleBackdropClick);

  // Add listener for Esc key
  document.addEventListener('keydown', handleEscKeydown);
}

function closeOrderModal() {
  // Hide modal order window
  orderBackdrop.classList.remove('is-open');

  // Remove listener from close button
  orderCloseBtn.removeEventListener('click', closeOrderModal);

  // Remove listener to order submit button
  orderForm.removeEventListener('submit', onOrderSubmit);

  // Remove listener from backdrop
  orderBackdrop.removeEventListener('click', handleBackdropClick);

  // Remove listener from Esc key
  document.removeEventListener('keydown', handleEscKeydown);

  // Remove animal id from order form data set
  delete orderForm.dataset.animalId;

  // Clear order form
  orderForm.reset();
}

function handleBackdropClick(event) {
  if (event.target === orderBackdrop) {
    closeOrderModal();
  }
}

function handleEscKeydown(event) {
  if (event.key === 'Escape' && orderBackdrop.classList.contains('is-open')) {
    closeOrderModal();
  }
}

async function onOrderSubmit(event) {
  event.preventDefault();
  orderSubmitBtn.disabled = true;

  const { name, phone, comment } = event.currentTarget.elements;
  const animalId = event.currentTarget.dataset.animalId;

  const formData = {
    name: name.value.trim(),
    phone: phone.value,
    animalId: animalId,
  };

  if (comment.value.trim()) {
    formData.comment = comment.value.trim();
  }

  // Validate form
  const validationError = validateOrderData(formData);

  if (validationError) {
    showToast(createErrorTemplate(validationError.message), 3000);
    orderSubmitBtn.disabled = false;
    return;
  }

  try {
    const response = await axios.post(
      'https://paw-hut.b.goit.study/api/orders',
      formData
    );

    const orderData = response.data;

    closeOrderModal();

    showToast(createSuccessTemplate(orderData), 5000);
  } catch (error) {
    if (error.response?.status === 404) {
      showToast(createErrorTemplate(ERRORS.PET_NOT_FOUND), 3000);
    } else if (error.response?.status === 400) {
      showToast(createErrorTemplate(ERRORS.BAD_REQUEST), 3000);
    } else {
      showToast(createErrorTemplate(ERRORS.SERVER), 3000);
    }
  } finally {
    orderSubmitBtn.disabled = false;
  }
}

function validateOrderData({ name, phone, animalId, comment }) {
  const nameValid = name && name.length <= 32;

  const phonePattern = /^[0-9]{12}$/;
  const phoneValid = phonePattern.test(phone);

  const commentValid = !comment || comment.length <= 500;

  const animalIdPattern = /^[a-f0-9]{24}$/i;
  const animalIdValid = animalIdPattern.test(animalId);

  if (!nameValid || !phoneValid || !commentValid || !animalIdValid) {
    return {
      status: 400,
      message: ERRORS.BAD_REQUEST,
    };
  }

  return null;
}

function showToast(message, timeout = 3000) {
  const instance = basicLightbox.create(
    `
    <div class="toast">
      ${message}
    </div>
    `,
    {
      className: 'toast-container',
    }
  );

  instance.show();

  setTimeout(() => {
    instance.close();
  }, timeout);
}

function createSuccessTemplate(order) {
  return `

     <h3 class="toast-title">Замовлення створено ✅</h3>

      <p><strong>№ замовлення:</strong> ${order.orderNum}</p>
      <p><strong>Клієнт:</strong> ${order.name}</p>
      <p><strong>Тварина:</strong> ${order.animalName} (${order.species})</p>

      <p class="order-toast-phone">📞 ${order.phone}</p>
  `;
}

function createErrorTemplate(message) {
  return ` 
      <h3 class="toast-title">Сталася помилка ❌</h3>      
      <p><strong>${message}</strong></p>
      <p><small>Спробуйте ще раз або перевірте введені дані.</small></p>
  `;
}
