const images = [
  "img/1.jpg",
  "img/2.jpg",
  "img/3.jpg",
  "img/4.jpg",
  "img/5.jpg"
];

const contents = [
  "🕋 **Ракурс с Чёрным камнем** — Lorem ipsum dolor sit amet...",
  "🧭 **Северная сторона** — Nulla vitae elit libero...",
  "🌅 **Восточная сторона** — Cras mattis consectetur...",
  "🔥 **Южная сторона** — Etiam porta sem malesuada...",
  "🌇 **Западная сторона** — Sed posuere consectetur..."
];

let current = 0;
const visual = document.getElementById("visual");
const content = document.getElementById("content");
const text = document.getElementById("text");

function showImage(index, direction = "") {
  // Сбрасываем переходы, чтобы мгновенно переместить новую картинку в стартовую позицию
  visual.style.transition = 'none';
  visual.classList.remove("swipe-left", "swipe-right");
  
  // Устанавливаем новое изображение
  visual.style.backgroundImage = `url(${images[index]})`;

  if (direction) {
    // Выбираем противоположное направление для "влета"
    // Если свайп влево (dx < 0), картинка должна прилететь справа
    const entryClass = (direction === "swipe-left") ? "swipe-right" : "swipe-left";
    
    visual.classList.add(entryClass);

    // Принудительно обновляем стили (reflow)
    visual.offsetHeight;

    // Включаем анимацию обратно и возвращаем картинку в центр
    visual.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
    visual.classList.remove(entryClass);
  }
}

function showContent(index) {
  // Уменьшил задержку для быстрого появления текста
  setTimeout(() => {
    text.innerHTML = contents[index];
    content.classList.add("active");
  }, 200); 
}

function hideContent() {
  content.classList.remove("active");
}

/* Инициализация */
visual.style.backgroundImage = `url(${images[current]})`;
showContent(current);

/* Логика свайпов */
let startX = 0;
let startY = 0;

document.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
}, false);

document.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - startX;
  const dy = e.changedTouches[0].clientY - startY;

  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
    hideContent();

    if (dx < 0) { // свайп влево → следующая
      current = (current + 1) % images.length;
      showImage(current, "swipe-left");
    } else { // свайп вправо → предыдущая
      current = (current - 1 + images.length) % images.length;
      showImage(current, "swipe-right");
    }

    showContent(current);
  }
}, false);

