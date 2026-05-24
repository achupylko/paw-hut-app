import "css-star-rating/css/star-rating.css";

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import icons from '../img/icons.svg';

const BASE_URL = `https://paw-hut.b.goit.study`;
const ANDROID_URL = `/api/feedbacks`;
const feedbacks = document.querySelector('.feedbacks');
const buttonStories = document.querySelectorAll(".stories-btn");
const loader = document.querySelector('.loader');

function showLoader() {
  loader.classList.remove('loader-hidden');
}
function hideLoader() {
  loader.classList.add('loader-hidden');
}

const storiesSwiper = new Swiper('.stories-swiper', {
  modules: [Navigation, Pagination],
   initialSlide: 0,
 slidesPerGroup: 1,
  slidesPerView: 1,
  spaceBetween: 32,

  navigation: {
    nextEl: '#stories .btn-next',
    prevEl: '#stories .btn-back',
  },

  pagination: {
    el: '#stories .stories-navigation .swiper-pagination',
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 5,
  },
  breakpoints: {
    768: {
       slidesPerGroup: 2,
      slidesPerView: 2,
    },
    1440: {
       slidesPerGroup: 2,
      slidesPerView: 2,
      },
    },
});

showLoader();
fetch(`${BASE_URL}${ANDROID_URL}`)
    .then(response => response.json())
    .then(data => {
        createFeedbackCard(data.feedbacks);
    storiesSwiper.update();
    storiesSwiper.pagination.render();
storiesSwiper.pagination.update();
})
  .catch(error => console.error('Error fetching data:', error))
  .finally(() => {
    hideLoader();
  });

  function renderStars(rate) {
  const rating = Math.round(rate * 2) / 2;

  const full = Math.floor(rating);
  const half = rating % 1 !== 0 ? 1 : 0;
  const empty = 5 - full - half;

  const fullStars = `
    <svg class="star star-filled">
      <use href="${icons}#star-filled"></use>
    </svg>
  `.repeat(full);

  // const halfStar = half ? `
  //   <svg class="star star-half">
  //     <use href="/img/icons.svg#star-half"></use>
  //   </svg>
  // ` : '';
const halfStar = half
    ? `
      <span class="star-half" aria-hidden="true">
        <svg class="star star-outline">
          <use href="${icons}#star-outline"></use>
        </svg>
        <span class="star-half-fill">
          <svg class="star star-filled">
            <use href="${icons}#star-filled"></use>
          </svg>
        </span>
      </span>
    `
    : '';
  const emptyStars = `
    <svg class="star star-outline">
      <use href="${icons}#star-outline"></use>
    </svg>
  `.repeat(empty);

  return fullStars + halfStar + emptyStars;
}
  
function createFeedbackCard(items) {
  const marcupFeedback = items.map(review => `
    <div class="swiper-slide">
      <div class="feedback-card">
        <div class="rating">
          <div class="stars">${renderStars(review.rate)}</div>
        </div>
        <p class="feedback-description">${review.description}</p>
        <p class="feedback-author">${review.author}</p>
      </div>
    </div>
  `).join('');

  feedbacks.innerHTML = marcupFeedback;
}

buttonStories.forEach(btn => {
  btn.addEventListener("click", () => btn.blur());
})
