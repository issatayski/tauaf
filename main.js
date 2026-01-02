const slides = document.querySelectorAll('.slide');
const content = document.querySelector('.content');
const titleEl = document.getElementById('content-title');
const textEl = document.getElementById('content-text');

const contents = [
  {
    title: 'Чёрный камень',
    text: 'Описание действий и дуа у Чёрного камня. Рыбный текст для примера.'
  },
  {
    title: 'Северная сторона',
    text: 'Информация для северной стороны Каабы. Рыбный текст.'
  },
  {
    title: 'Восточная сторона',
    text: 'Описание восточной стороны Каабы и соответствующих дуа.'
  },
  {
    title: 'Южная сторона',
    text: 'Религиозный контент, связанный с южной стороной.'
  },
  {
    title: 'Западная сторона',
    text: 'Заключительный ракурс. Текст-заглушка для демонстрации.'
  }
];

let currentIndex = 0;
let startX = 0;

/* Показ контента */
function showContent() {
  titleEl.textContent = contents[currentIndex].title;
  textEl.textContent = contents[currentIndex].text;
  content.classList.add('visible');
}

/* Скрыть контент */
function hideContent() {
  content.classList.remove('visible');
}

/* Переключение слайдов */
function changeSlide(direction) {
  const nextIndex = currentIndex + direction;
  if (nextIndex < 0 || nextIndex >= slides.length) return;

  hideContent();

  const current = slides[currentIndex];
  const next = slides[nextIndex];

  current.classList.remove('active');
  next.classList.add('active');

  currentIndex = nextIndex;

  setTimeout(showContent, 350);
}

/* Touch events */
document.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

document.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) {
    diff > 0 ? changeSlide(1) : changeSlide(-1);
  }
});

/* Первый показ контента */
setTimeout(showContent, 600);
