// We can install Swiper from NPM
// npm install swiper

// import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';

export function initAboutUsSwiper() {
  // Check if the element exists on the page to avoid console errors
  if (document.querySelector('.about-us-swiper')) {
    return new Swiper(".about-us-swiper", {
        slidesPerView: 1,
            spaceBetween: 30,
            lazy: true,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        pagination: {
            el: "#about .swiper-pagination",
            type: 'bullets',
            dynamicBullets: true,
            clickable: true,
        },
        navigation: {
            nextEl: "#about .swiper-button-next",
            prevEl: "#about .swiper-button-prev",
        },
        breakpoints: {
            768: {
                pagination: {
                    dynamicBullets: false,
                },
            },
        },
    });
  }
}

initAboutUsSwiper();