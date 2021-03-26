'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabsButton = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const lazyImages = document.querySelectorAll('img[data-src]');
document.querySelector('.footer__copyright').innerHTML = '';

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `We use cookies to improve user experience.<button class='btn btn--close--cookie'>Got it!</button>`;
// document.querySelector('.header').append(message);
document.querySelector('.header').prepend(message);
document.querySelector('.btn').addEventListener('click', function () {
  message.remove();
});

message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.height = '7rem';
// // console.log(getComputedStyle(document.querySelector('.nav__logo')).height);
// const logo = document.querySelector('.nav__logo');
// console.log(logo.src);
// console.log(logo.alt);
// console.log(logo.getAttribute('src'));
// logo.setAttribute('skoda', 'laura');

// console.log(btnScrollTo, section1);
btnScrollTo.addEventListener('click', function (e) {
  const s1cords = section1.getBoundingClientRect();
  console.log(s1cords);
  // console.log(e.target.getBoundingClientRect());
  // console.log(
  //   'current scroll positions (X/Y)',
  //   window.pageXOffset,
  //   pageYOffset
  // );
  // console.log(
  //   'current viewport height/width',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // window.scrollTo(
  //   s1cords.left + window.pageXOffset,
  //   s1cords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1cords.left + window.pageXOffset,
  //   top: s1cords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// // console.log(randomColor);
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   console.log('link');
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget);
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   console.log('links');
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget);
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   console.log('nav');
//   this.style.backgroundColor = randomColor();
//   console.log(e.target, e.currentTarget);
// });

/////////////////////////////////////////////////////////
// navbar links scroll using normal event handling

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//////////////////////////////////////////////////////////////
//navbar links scroll using event delegation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    // console.log(e.target, this, e.currentTarget);
  }
});

// const h1 = document.querySelector('h1');

////////////////////////////////////////////
// traversing downwards(children)

// h1.querySelectorAll('.highlight').forEach(function (el) {
//   el.style.color = 'orangered';
// });
// console.log(h1.children);
// console.log(h1.firstElementChild);
// console.log(h1.lastElementChild);

/////////////////////////////////////////////
// traversing upwards(parent)

// console.log(h1.parentNode);
// console.log(h1.parentElement);
// console.log(h1.closest('.header'));

/////////////////////////////////////////////
// traversing sideways(siblings)

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.parentElement.children);

////////////////////////////////////////////////////////
// implementing the tabs

tabContainer.addEventListener('click', function (e) {
  //for selecting the button even if the span is clicked
  const tab = e.target.closest('.operations__tab');

  //to remove the active class form all the buttons when tabs are clicked
  tabsButton.forEach(t => t.classList.remove('operations__tab--active'));
  //to avoid any errors as when the tab container is clicked , tab is null
  if (!tab) return;
  tab.classList.add('operations__tab--active');

  //to remove the div currently on operation content
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${tab.dataset.tab}`)
    .classList.add('operations__content--active');
});

//////////////////////////////////////
// nav hover effect

const hoverEffect = function (e) {
  const link = e.target;
  if (e.target.classList.contains('nav__link')) {
    link
      .closest('.nav')
      .querySelectorAll('.nav__link')
      .forEach(el => {
        if (el !== link) el.style.opacity = this;
      });

    // this cannot be used becaue link is just one element and not a nodelist

    // link.forEach(el => {
    //   if (el !== link) el.style.opacity = this;
    // });
    link.closest('.nav').querySelector('img').style.opacity = this;

    //this can also be done
    link.parentElement.parentElement.previousElementSibling.style.opacity = this;
  }
};
nav.addEventListener('mouseover', hoverEffect.bind(0.5));
nav.addEventListener('mouseout', hoverEffect.bind(1));

//////////////////////////////////////////////////
// sticky nav(first method) (dont use this method )
// const initialCords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//////////////////////////////////////////////////////
//sticky nav(second method )(use this method)
// const obsOptions = {
//   root: null,
//   threshold: 0,
// };
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});
headerObserver.observe(header);

////////////////////////////////////////////////////////
// revealing sections
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  // unobserving the sections so when page is scrolled up there is no entry which increases performance
  sectionObserver.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

////////////////////////////////////////////
// lazy loading images
// console.log(lazyImages);
const lazyLoad = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
};
const observeImages = new IntersectionObserver(lazyLoad, {
  root: null,
  threshold: 1,
});
lazyImages.forEach(img => observeImages.observe(img));

////////////////////////////////////////////////////////
// slider component

let currentSlide = 0;
const maxSlide = slides.length;
const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};
const goToRight = function () {
  currentSlide++;
  if (currentSlide === maxSlide) currentSlide = 0;
  goToSlide(currentSlide);
};
const goToLeft = function () {
  currentSlide--;
  if (currentSlide < 0) currentSlide = maxSlide - 1;
  goToSlide(currentSlide);
};
goToSlide(0);
btnRight.addEventListener('click', goToRight);
btnLeft.addEventListener('click', goToLeft);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') goToRight();
  if (e.key === 'ArrowLeft') goToLeft();
});

// document.addEventListener('DOMContentLoaded', function () {
//   console.log('The HTML has been fully loaded and parsed');
// });

// window.addEventListener('load', function () {
//   console.log('The whole page has been loaded');
// });

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   e.returnValue = '';
// });
