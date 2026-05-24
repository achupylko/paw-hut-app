import axios from "axios";

const BASE_URL = 'https://paw-hut.b.goit.study/api';


let page = 1;
let currentCategoryId = ''; 
let allAnimals = [];

const petTypeList = document.querySelector('.our-pets__types-list');
const loadMoreBtn = document.querySelector('.pet-list__btn');
const petsList = document.querySelector('.pets-list');
const loaderBackdrop = document.querySelector('.loader-backdrop');


function showLoader() {
    loaderBackdrop.classList.remove('is-hidden');
}

function hideLoader() {
    loaderBackdrop.classList.add('is-hidden');
}


function getCurrentLimit() {
    return window.innerWidth >= 1280 ? 9 : 8;
}


function scrollToNewCards() {
    const limit = getCurrentLimit();
    const allCards = document.querySelectorAll('.pet-card');
    
    const targetCard = allCards[allCards.length - limit]; 

    if (targetCard) {
        const elementPosition = targetCard.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: elementPosition - 20, 
            behavior: 'smooth'
        });
    }
}


async function init() {
    showLoader();
    try {
        await renderCategories();
        await loadAnimals('', 1); 
    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Failed to initialize app' });
    } finally {
        hideLoader();
    }
}


async function renderCategories() {
    try {
        const { data } = await axios.get(`${BASE_URL}/categories`);
        
        let markup = `<li><button class="pets-type__btn is-active" data-id="">Всі</button></li>`;
        markup += data.map(cat => 
            `<li><button class="pets-type__btn" data-id="${cat._id}">${cat.name}</button></li>`
        ).join('');
        
        petTypeList.innerHTML = markup;
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Could not load categories',
            position: 'topRight'
        });
    }
}


async function loadAnimals(id = '', currentPage = 1) {
    const limit = getCurrentLimit();
    const params = {
        page: currentPage,
        limit: limit,
        ...(id && { categoryId: id })
    };

    showLoader();

    try {
        const { data } = await axios.get(`${BASE_URL}/animals`, { params });
        const animals = data.animals;
        if (currentPage === 1) {
            petsList.innerHTML = ''; 
            allAnimals = animals; 
        } else {
            allAnimals = [...allAnimals, ...animals]; 
        }

        renderCards(animals);

        if (animals.length < limit || animals.length === 0) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }

    } catch (error) {
        iziToast.error({ title: 'Error', message: 'Failed to load animals' });
    } finally {
        setTimeout(hideLoader, 300);
    }
}



function renderCards(animals) {
    const markup = animals.map(animal => {
        const tagsMarkup = animal.categories.map(cat => `<li class="pet-tag">${cat.name}</li>`).join('');

        return `
        <li class="pet-card" data-id="${animal._id}">
            <div class="pet-card__image-wrapper">
                <img src="${animal.image}" alt="${animal.name}" class="pet-card__img" loading="lazy">
            </div>
            
            <div class="pet-card__content">
                <span class="pet-card__category">${animal.species}</span>
                <h3 class="pet-card__name">${animal.name}</h3>
                
                <ul class="pet-card__tag-list">${tagsMarkup}</ul>

                <div class="pet-card__info">
                    <span class="pet-info__item">${animal.age}</span>
                    <span class="pet-info__item">${animal.gender}</span>
                </div>

                <p class="pet-card__description">${animal.shortDescription}</p>

                <button type="button" class="pet-card__btn">Дізнатись більше</button>
            </div>
        </li>`;
    }).join('');

    petsList.insertAdjacentHTML('beforeend', markup);
}


petTypeList.addEventListener('click', (e) => {
    if (e.target.nodeName !== 'BUTTON') return;
    
    page = 1;
    currentCategoryId = e.target.dataset.id || '';

    document.querySelectorAll('.pets-type__btn').forEach(btn => btn.classList.remove('is-active'));
    e.target.classList.add('is-active');
    
    loadAnimals(currentCategoryId, page);
});


loadMoreBtn.addEventListener('click', () => {
    page += 1
    loadAnimals(currentCategoryId, page);
});

init();

import { openPetModal } from './modal-pet.js';

petsList.addEventListener('click', (e) => { 
    if (!e.target.classList.contains('pet-card__btn')) return;

    const card = e.target.closest('.pet-card');
    const animalId = card.dataset.id;

    const selectedPetData = allAnimals.find(animal => animal._id === animalId);

    if (selectedPetData) {
        openPetModal(selectedPetData);
    }
});