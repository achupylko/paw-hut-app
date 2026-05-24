import{A as z,S as C,a as $,b as H,N as G,P as K}from"./assets/vendor-DY2JEt63.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();new z(".accordion-container",{elementClass:"ac",triggerClass:"ac-trigger",panelClass:"ac-panel",openMultiple:!1,collapse:!0,duration:300,showIcon:!0});function Q(){if(document.querySelector(".about-us-swiper"))return new C(".about-us-swiper",{slidesPerView:1,spaceBetween:30,lazy:!0,keyboard:{enabled:!0,onlyInViewport:!0},pagination:{el:"#about .swiper-pagination",type:"bullets",dynamicBullets:!0,clickable:!0},navigation:{nextEl:"#about .swiper-button-next",prevEl:"#about .swiper-button-prev"},breakpoints:{768:{pagination:{dynamicBullets:!1}}}})}Q();const m=document.querySelector("[data-menu]"),W=document.querySelector("[data-menu-open]"),J=document.querySelector("[data-menu-close]"),X=document.querySelectorAll(".mobile-nav a"),L=()=>{m.classList.remove("is-open"),document.body.style.overflow=""};W.addEventListener("click",()=>{m.classList.add("is-open"),document.body.style.overflow="hidden"});J.addEventListener("click",L);X.forEach(e=>{e.addEventListener("click",L)});document.addEventListener("keydown",e=>{e.key==="Escape"&&m.classList.contains("is-open")&&L()});m.addEventListener("click",e=>{e.target===m&&L()});const p=document.querySelector(".order-form"),c=document.querySelector(".order-modal-overlay"),A=document.querySelector(".order-close-btn"),S=document.querySelector(".order-submit-btn"),h={BAD_REQUEST:"Bad request (invalid request params)",PET_NOT_FOUND:"Pet not found",SERVER:"Server error"};function Y(e){p.dataset.animalId=e,c.classList.add("is-open"),A.addEventListener("click",f),p.addEventListener("submit",O),c.addEventListener("click",I),document.addEventListener("keydown",M)}function f(){c.classList.remove("is-open"),A.removeEventListener("click",f),p.removeEventListener("submit",O),c.removeEventListener("click",I),document.removeEventListener("keydown",M),delete p.dataset.animalId,p.reset()}function I(e){e.target===c&&f()}function M(e){e.key==="Escape"&&c.classList.contains("is-open")&&f()}async function O(e){var i,E;e.preventDefault(),S.disabled=!0;const{name:n,phone:t,comment:a}=e.currentTarget.elements,s=e.currentTarget.dataset.animalId,o={name:n.value.trim(),phone:t.value,animalId:s};a.value.trim()&&(o.comment=a.value.trim());const r=Z(o);if(r){u(g(r.message),3e3),S.disabled=!1;return}try{const j=(await $.post("https://paw-hut.b.goit.study/api/orders",o)).data;f(),u(ee(j),5e3)}catch(d){((i=d.response)==null?void 0:i.status)===404?u(g(h.PET_NOT_FOUND),3e3):((E=d.response)==null?void 0:E.status)===400?u(g(h.BAD_REQUEST),3e3):u(g(h.SERVER),3e3)}finally{S.disabled=!1}}function Z({name:e,phone:n,animalId:t,comment:a}){const s=e&&e.length<=32,r=/^[0-9]{12}$/.test(n),i=!a||a.length<=500,d=/^[a-f0-9]{24}$/i.test(t);return!s||!r||!i||!d?{status:400,message:h.BAD_REQUEST}:null}function u(e,n=3e3){const t=H.create(`
    <div class="toast">
      ${e}
    </div>
    `,{className:"toast-container"});t.show(),setTimeout(()=>{t.close()},n)}function ee(e){return`

     <h3 class="toast-title">Замовлення створено ✅</h3>

      <p><strong>№ замовлення:</strong> ${e.orderNum}</p>
      <p><strong>Клієнт:</strong> ${e.name}</p>
      <p><strong>Тварина:</strong> ${e.animalName} (${e.species})</p>

      <p class="order-toast-phone">📞 ${e.phone}</p>
  `}function g(e){return` 
      <h3 class="toast-title">Сталася помилка ❌</h3>      
      <p><strong>${e}</strong></p>
      <p><small>Спробуйте ще раз або перевірте введені дані.</small></p>
  `}const l=document.querySelector(".modal-pet-backdrop"),P=document.querySelector(".modal-pet-image"),te=document.querySelector(".modal-pet-species"),se=document.querySelector(".modal-pet-name"),ne=document.querySelector(".modal-pet-age"),oe=document.querySelector(".modal-pet-gender"),ae=document.querySelector(".modal-pet-desc"),re=document.querySelector(".modal-pet-health"),ie=document.querySelector(".modal-pet-behavior");let D=null;l.addEventListener("click",le);document.addEventListener("keydown",de);function ce(e){pe(e),l.classList.remove("is-hidden"),document.body.style.overflow="hidden"}function q(){l.classList.add("is-hidden"),document.body.style.overflow=""}function le(e){if(!l.classList.contains("is-hidden")){if(e.target===l||e.target.closest(".modal-pet-close-btn")){q();return}e.target.closest(".modal-pet-adopt-btn")&&ue()}}function de(e){l.classList.contains("is-hidden")||e.key==="Escape"&&q()}function ue(){const e=D;q(),Y(e)}function pe(e){D=e._id,P.src=e.image,P.alt=e.name,te.textContent=e.species,se.textContent=e.name,ne.textContent=e.age,oe.textContent=e.gender,ae.textContent=e.description,re.textContent=e.healthStatus,ie.textContent=e.behavior}const N="https://paw-hut.b.goit.study/api";let b=1,k="",v=[];const R=document.querySelector(".our-pets__types-list"),w=document.querySelector(".pet-list__btn"),B=document.querySelector(".pets-list"),x=document.querySelector(".loader-backdrop");function V(){x.classList.remove("is-hidden")}function U(){x.classList.add("is-hidden")}function me(){return window.innerWidth>=1280?9:8}async function fe(){V();try{await ge(),await T("",1)}catch{iziToast.error({title:"Error",message:"Failed to initialize app"})}finally{U()}}async function ge(){try{const{data:e}=await $.get(`${N}/categories`);let n='<li><button class="pets-type__btn is-active" data-id="">Всі</button></li>';n+=e.map(t=>`<li><button class="pets-type__btn" data-id="${t._id}">${t.name}</button></li>`).join(""),R.innerHTML=n}catch{iziToast.error({title:"Error",message:"Could not load categories",position:"topRight"})}}async function T(e="",n=1){const t=me(),a={page:n,limit:t,...e&&{categoryId:e}};V();try{const{data:s}=await $.get(`${N}/animals`,{params:a}),o=s.animals;n===1?(B.innerHTML="",v=o):v=[...v,...o],ye(o),o.length<t||o.length===0?w.style.display="none":w.style.display="block"}catch{iziToast.error({title:"Error",message:"Failed to load animals"})}finally{setTimeout(U,300)}}function ye(e){const n=e.map(t=>{const a=t.categories.map(s=>`<li class="pet-tag">${s.name}</li>`).join("");return`
        <li class="pet-card" data-id="${t._id}">
            <div class="pet-card__image-wrapper">
                <img src="${t.image}" alt="${t.name}" class="pet-card__img" loading="lazy">
            </div>
            
            <div class="pet-card__content">
                <span class="pet-card__category">${t.species}</span>
                <h3 class="pet-card__name">${t.name}</h3>
                
                <ul class="pet-card__tag-list">${a}</ul>

                <div class="pet-card__info">
                    <span class="pet-info__item">${t.age}</span>
                    <span class="pet-info__item">${t.gender}</span>
                </div>

                <p class="pet-card__description">${t.shortDescription}</p>

                <button type="button" class="pet-card__btn">Дізнатись більше</button>
            </div>
        </li>`}).join("");B.insertAdjacentHTML("beforeend",n)}R.addEventListener("click",e=>{e.target.nodeName==="BUTTON"&&(b=1,k=e.target.dataset.id||"",document.querySelectorAll(".pets-type__btn").forEach(n=>n.classList.remove("is-active")),e.target.classList.add("is-active"),T(k,b))});w.addEventListener("click",()=>{b+=1,T(k,b)});fe();B.addEventListener("click",e=>{if(!e.target.classList.contains("pet-card__btn"))return;const t=e.target.closest(".pet-card").dataset.id,a=v.find(s=>s._id===t);a&&ce(a)});const y="/js-project-7/assets/icons-B4Da7FRa.svg",he="https://paw-hut.b.goit.study",ve="/api/feedbacks",be=document.querySelector(".feedbacks"),Le=document.querySelectorAll(".stories-btn"),F=document.querySelector(".loader");function Ee(){F.classList.remove("loader-hidden")}function Se(){F.classList.add("loader-hidden")}const _=new C(".stories-swiper",{modules:[G,K],initialSlide:0,slidesPerGroup:1,slidesPerView:1,spaceBetween:32,navigation:{nextEl:"#stories .btn-next",prevEl:"#stories .btn-back"},pagination:{el:"#stories .stories-navigation .swiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:5},breakpoints:{768:{slidesPerGroup:2,slidesPerView:2},1440:{slidesPerGroup:2,slidesPerView:2}}});Ee();fetch(`${he}${ve}`).then(e=>e.json()).then(e=>{ke(e.feedbacks),_.update(),_.pagination.render(),_.pagination.update()}).catch(e=>console.error("Error fetching data:",e)).finally(()=>{Se()});function _e(e){const n=Math.round(e*2)/2,t=Math.floor(n),a=n%1!==0?1:0,s=5-t-a,o=`
    <svg class="star star-filled">
      <use href="${y}#star-filled"></use>
    </svg>
  `.repeat(t),r=a?`
      <span class="star-half" aria-hidden="true">
        <svg class="star star-outline">
          <use href="${y}#star-outline"></use>
        </svg>
        <span class="star-half-fill">
          <svg class="star star-filled">
            <use href="${y}#star-filled"></use>
          </svg>
        </span>
      </span>
    `:"",i=`
    <svg class="star star-outline">
      <use href="${y}#star-outline"></use>
    </svg>
  `.repeat(s);return o+r+i}function ke(e){const n=e.map(t=>`
    <div class="swiper-slide">
      <div class="feedback-card">
        <div class="rating">
          <div class="stars">${_e(t.rate)}</div>
        </div>
        <p class="feedback-description">${t.description}</p>
        <p class="feedback-author">${t.author}</p>
      </div>
    </div>
  `).join("");be.innerHTML=n}Le.forEach(e=>{e.addEventListener("click",()=>e.blur())});
//# sourceMappingURL=index.js.map
