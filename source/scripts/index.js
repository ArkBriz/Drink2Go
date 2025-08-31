// Работа попап меню
const nav = document.querySelector('.nav');
const navToggler = nav.querySelector('.nav__toggler');

nav.classList.remove('nav--no-js');

navToggler.addEventListener('click', () => {
  nav.classList.toggle('nav--closed');
  nav.classList.toggle('nav--open');
});

// Слайдер блока с новинками
const slider = document.querySelector('.offer-slider');
const prevButton = slider.querySelector('.slider-prev');
const nextButton = slider.querySelector('.slider-next');
const photo = slider.querySelector('.offer-slider__image');
const photoSource = slider.querySelector('source');
const coffeName = slider.querySelector('.offer-slider__name');
const description = slider.querySelector('.offer-slider__description');
const oldPrice = slider.querySelector('.offer-slider__price-old del');
const newPrice = slider.querySelector('.offer-slider__price-new');
const pagButtons = slider.querySelectorAll('.offer-slider__pagination-button');

const coffeePhotos = [
  {
    photo1: 'images/flat-white@1x.png',
    photo3: 'images/flat-white@1x.webp',
    photo2: 'images/flat-white@2x.png',
    photo4: 'images/flat-white@2x.webp',
  },
  {
    photo1: 'images/lavender@1x.png',
    photo2: 'images/lavender@2x.png',
    photo3: 'images/lavender@1x.webp',
    photo4: 'images/lavender@2x.webp',
  },
  {
    photo1: 'images/espresso@1x.png',
    photo2: 'images/espresso@2x.png',
    photo3: 'images/espresso@1x.webp',
    photo4: 'images/espresso@2x.webp',
  }
];

const names = [
  'Декаф Флэт Уайт',
  'Лавандовый Латте',
  'Тройной Эспрессо'
];

const descriptions = [
  'Свежесваренный кофе без кофеина из Эфиопии<br> с натуральным фермерским молоком — то, что нужно<br> для расслабления после тяжёлого рабочего дня',
  'Невероятное сочетание перуанской высокогорной арабики с молоком ламы и лавандовым сиропом унесёт вас прямо на вершину Радужных гор',
  'Мощнее укола адреналина, чернее самой тёмной ночи, этот тройной эспрессо из Колумбии покажет вам, что такое настоящая бодрость'
]

const oldPrices = [295, 285, 395];
const newPrices = [225, 265, 375];

let currentIndex = 0;

const getIndex = (index) => {
  const nextIndex = (index + 1) % coffeePhotos.length;
  const prevIndex = (index - 1 + coffeePhotos.length) % coffeePhotos.length;

  return {nextIndex, prevIndex};
};

const changePagButton = (index) => {
  pagButtons.forEach((button) => {
    button.classList.remove('offer-slider__pagination-button--current');
    button.tabIndex = 0;
  });

  pagButtons[index].classList.add('offer-slider__pagination-button--current');
  pagButtons[index].tabIndex = -1;
};

const changeData = (index) => {
  coffeName.textContent = names[index];
  description.innerHTML = descriptions[index];
  oldPrice.textContent = oldPrices[index];
  newPrice.textContent = newPrices[index];

  photo.src = coffeePhotos[index].photo1;
  photo.srcset = `${coffeePhotos[index].photo2} 2x`;
  photoSource.srcset = `${coffeePhotos[index].photo3} 1x, ${coffeePhotos[index].photo4} 2x`;
}

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % coffeePhotos.length;
  const { nextIndex, prevIndex } = getIndex(currentIndex);

  slider.classList.remove(`offer-slider--${prevIndex}`);
  slider.classList.add(`offer-slider--${currentIndex}`);

  changeData(currentIndex);
  changePagButton(currentIndex);
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + coffeePhotos.length) % coffeePhotos.length;
  const { nextIndex, prevIndex } = getIndex(currentIndex);

  slider.classList.remove(`offer-slider--${nextIndex}`);
  slider.classList.add(`offer-slider--${currentIndex}`);

  changeData(currentIndex);
  changePagButton(currentIndex);
});

pagButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    currentIndex = index;
    const { nextIndex, prevIndex } = getIndex(currentIndex);

    slider.classList.remove(`offer-slider--${nextIndex}`);
    slider.classList.remove(`offer-slider--${prevIndex}`);
    slider.classList.add(`offer-slider--${currentIndex}`);

    changeData(currentIndex);
    changePagButton(currentIndex);
  })
});

// Выбор чекбоксов с клавиатуры
const filters = document.querySelector('.catalog__filters');

filters.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter' && evt.target.type === 'checkbox') {
    evt.preventDefault();
    evt.target.checked = !evt.target.checked;
  }
});
