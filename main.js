const images = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg"];
const contents = [
  "🕋 Тауапқа бастамас бұрын, Хажар ул-әсуад тұсында жүрекпен:<br>«Уа, Алла! Сені әлмисақтан қабылдадым.<br> Дүниеге келіп, Сенің мейіріміңмен Сені тағы қабылдадым. Ал енді мейірімің мен жомарттығыңның арқасында Сенің үйіңе келдім.<br> Хажар ул-әсуадтың ішінде сақталған уәдем мен жүрегімдегі уәдемді салыстырып, уәдемді жаңартуға келдім.<br> Бисмилләһи Аллаһу әкбар», деп сәлем береді. Сонан соң мына дұғаны оқиды:<br> Аллаһуммә имәнән бикә уә тасдиқан бикитәбикә,Аллаһуммә имәнән бикә уә тасдиқан бикитәбикә, уә уәфә’ән би‘аһдикә, уәттибә‘ан лисуннәти нәбийкә, уә хабибикә Мұхаммәдин с.аллаллаһу ‘алейһи уә сәлләм! уә уәфә’ән би‘аһдикә, уәттибә‘ан лисуннәти нәбийкә, уә хабибикә Мұхаммәдин саллаллаһу ‘алейһи уә сәлләм! ",
  "🧭 **Северная сторона**...",
  "🌅 **Восточная сторона**...",
  "🔥 **Южная сторона**...",
  "🌇 **Западная сторона**..."
];

let current = 1; // Начинаем с 1, так как 0 индекс — это клон последнего слайда
const strip = document.getElementById("visual-strip");
const content = document.getElementById("content");
const text = document.getElementById("text");

function init() {
  // Создаем массив с клонами: [Картинка 5, 1, 2, 3, 4, 5, Картинка 1]
  const list = [images[images.length - 1], ...images, images[0]];
  
  strip.style.width = `${list.length * 100}%`;

  list.forEach(src => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.style.backgroundImage = `url(${src})`;
    strip.appendChild(slide);
  });

  updatePosition(false); // Мгновенный переход к первой настоящей картинке
  showText();
}

function updatePosition(animate = true) {
  if (!animate) strip.style.transition = 'none';
  else strip.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
  
  strip.style.transform = `translateX(${current * -100}vw)`;
}

function showText() {
  // Определяем реальный индекс контента (вычитаем 1 из-за клона)
  let realIndex = current - 1;
  if (current === 0) realIndex = images.length - 1;
  if (current === images.length + 1) realIndex = 0;

  text.innerHTML = contents[realIndex];
  content.classList.add("active");
}

function handleInfiniteLoop() {
  // Если мы на клоне в конце, прыгаем в начало
  if (current === images.length + 1) {
    current = 1;
    updatePosition(false);
  }
  // Если мы на клоне в начале, прыгаем в конец
  if (current === 0) {
    current = images.length;
    updatePosition(false);
  }
}

/* Логика свайпов */
let startX = 0;
let isMoving = false;

document.addEventListener("touchstart", e => {
  if (isMoving) return;
  startX = e.touches[0].clientX;
}, {passive: true});

document.addEventListener("touchend", e => {
  if (isMoving) return;
  const dx = e.changedTouches[0].clientX - startX;

  if (Math.abs(dx) > 50) {
    isMoving = true;
    content.classList.remove("active");

    if (dx < 0) current++; // Свайп влево -> Вперед
    else current--;        // Свайп вправо -> Назад

    updatePosition(true);

    // Ждем окончания анимации, чтобы проверить зацикливание
    setTimeout(() => {
      handleInfiniteLoop();
      showText();
      isMoving = false;
    }, 600); 
  }
}, {passive: true});

init();

