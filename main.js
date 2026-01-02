
const images = [
  "img/1.jpg",
  "img/2.jpg",
  "img/3.jpg",
  "img/4.jpg",
  "img/5.jpg"
];

const contents = [
  "🕋 **Ракурс с Чёрным камнем** — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean facilisis.Ракурс с Чёрным камнем** — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean facilisis.Ракурс с Чёрным камнем** — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean facilisis.Ракурс с Чёрным камнем** — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean facilisisРакурс с Чёрным камнем** — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean facilisisРакурс с Чёрным камнем** — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean facilisis.",
  "🧭 **Северная сторона** — Nulla vitae elit libero, a pharetra augue. Vivamus sagittis lacus vel augue laoreet.",
  "🌅 **Восточная сторона** — Cras mattis consectetur purus sit amet fermentum. Donec sed odio dui.",
  "🔥 **Южная сторона** — Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis interdum.",
  "🌇 **Западная сторона** — Sed posuere consectetur est at lobortis. Curabitur blandit tempus porttitor."
];

let current = 0;
const visual = document.getElementById("visual");
const content = document.getElementById("content");
const text = document.getElementById("text");

function showImage(index, direction = "") {
  visual.classList.remove("swipe-left", "swipe-right");
  if (direction) visual.classList.add(direction);

  setTimeout(() => {
    visual.style.backgroundImage = `url(${images[index]})`;
    visual.classList.remove("swipe-left", "swipe-right");
  }, 300);
}

function showContent(index) {
  setTimeout(() => {
    text.innerHTML = contents[index];
    content.classList.add("active");
  }, 1000);
}

function hideContent() {
  content.classList.remove("active");
}

/* Initialize */
showImage(current);
showContent(current);

/* Swipe logic */
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

    if (dx < 0) { // swipe left → next
      current = (current + 1) % images.length;
      showImage(current, "swipe-left");
    } else { // swipe right → previous
      current = (current - 1 + images.length) % images.length;
      showImage(current, "swipe-right");
    }

    showContent(current);
  }
}, false);
