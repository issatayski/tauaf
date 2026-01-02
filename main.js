const images = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg"];
const contents = [
  "🕋 Тауапқа бастамас бұрын, Хажар ул-әсуад тұсында жүрекпен:<br>«Уа, Алла! Сені әлмисақтан қабылдадым.<br> Дүниеге келіп, Сенің мейіріміңмен Сені тағы қабылдадым. Ал енді мейірімің мен жомарттығыңның арқасында Сенің үйіңе келдім.<br> Хажар ул-әсуадтың ішінде сақталған уәдем мен жүрегімдегі уәдемді салыстырып, уәдемді жаңартуға келдім.<br> Бисмилләһи Аллаһу әкбар», деп сәлем береді. Сонан соң мына дұғаны оқиды:<br><br>Аллаһуммә имәнән бикә уә тасдиқан бикитәбикә, уә уәфә’ән би‘аһдикә, уәттибә‘ан лисуннәти нәбийкә, уә хабибикә Мұхаммәдин саллаллаһу ‘алейһи уә сәлләм! ",
  "🧭 Ибраһим мақамы тұсында оқылатын дұға:<br>Аллаһуммә салли ‘алә Мұхаммәдин уә ‘алә әли Мұхаммәд.<br> Кәмә салләйтә ‘аләИбраһимә уә ‘алә әли Ибраһим. Иннәкә хамидум-мәжид!<br>Аллаһуммә бәрик ‘алә Мұхаммәдин уә ‘аләәли Мұхаммәд.<br>Кәмә бәрактә ‘алә Ибраһимә уә ‘алә әли Ибраһим. Иннәкә хамидум-мәжид.",
  "🌅 Рүкні Ирақи мен Шами арасында оқылатын дұға:<br>Сүбханәллаһи уәл-хамду лилләһи уәлә иләһә иллаллаһу уаллаһу әкбар, уә ләхаулә уә лә қууәтә иллә билләһил-‘алиил-‘азим",
  "🔥 Рүкні Шами мен Ямани арасында оқылатын дұға:<br>Лә иләһә иллаллаһу уахдәһу ләшәрикә ләһ. Ләһүл-мүлку уә ләһүл-хамду йухии уә йумит. Уә һуә хаййүл-лә йәмуту биәдиһил-хаир. Уә һуә ‘алә күлли шәй’ин қадир. Аллаһүммә мүнзиләл-китәб, сәри‘ал-хисәб, иһзимил-әхзәб. Аллаһуммәһ-зимһум уәнсурнә ‘аләйһим уә зәлзилһүм. Аллаһүммә иә мужибәл-муттаррин. Уә иә сарихал-мәкрубин. Икшиф ‘аннә һәммәнә уә ғаммәнәуә курбәтәнә. Фә-иннәкә тәра мә нәзәлә бинәуә бил-мү’мининә жәми‘ан. Аллаһуммәс-түр-‘ауратинә уә әмин рау‘атинә. Иә әкрамәл-әкрамин уә иә әрхамар-рахимин.",
  "🌇 Рүкні Ямани мен Хәжар ул-әсуад арасында оқылатын дұға:<br>Раббәнә әтинә фид-дүниә хасәнәтән уә фил-әхирати хасәнәтән уә қинә ‘азәбән-нар.Уә әдхилнәл-жәннәтә ма‘ал-әбрāр, иә ‘азизу иә ғаффар, иә Раббәл-‘аләмин. Аллаһүммә инни әс’әлукә ‘афуә уәл-‘афиәтә уәл-му‘афәтә әддәи’мәтә фид-дини уәд-дуниә уәл-ахирәти уәл-фәузә бил-жәннәти уән-нәжәтә минән-нәр. Бирахмәтикә иә әрхамәр-рахимин! Уә саллаллаһу ‘алә сәийдинә мұхаммәдин уә ‘алә әлиһи уәсахбиһи ажма‘ин."
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

