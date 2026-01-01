let current = 1;
const total = 5;

const views = document.querySelectorAll('.view');
const contents = document.querySelectorAll('.content-item');

let startX = 0;
let endX = 0;

const viewer = document.getElementById('viewer');

viewer.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

viewer.addEventListener('touchend', e => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const diff = startX - endX;

  if (Math.abs(diff) < 50) return;

  if (diff > 0) {
    next();
  } else {
    prev();
  }
}

function next() {
  current++;
  if (current > total) current = 1;
  update();
}

function prev() {
  current--;
  if (current < 1) current = total;
  update();
}

function update() {
  views.forEach(v => v.classList.remove('active'));
  contents.forEach(c => c.classList.remove('active'));

  document.querySelector(`.view[data-view="${current}"]`).classList.add('active');
  document.querySelector(`.content-item[data-content="${current}"]`).classList.add('active');
}
