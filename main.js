const viewer = document.getElementById('viewer');
const contentPanel = document.getElementById('contentPanel');
const viewTitle = document.getElementById('viewTitle');
const touchArea = document.getElementById('touchArea');

const viewsData = [
    "1. Черный камень",
    "2. Северная сторона",
    "3. Восточная сторона",
    "4. Южная сторона",
    "5. Западная сторона"
];

let currentIndex = 0;
let startX = 0;
let isAnimating = false;

function changeView(direction) {
    if (isAnimating) return;
    isAnimating = true;

    // 1. Прячем контент
    contentPanel.classList.remove('active');

    // 2. Рассчитываем новый индекс (круговая логика)
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % viewsData.length;
    } else if (direction === 'prev') {
        currentIndex = (currentIndex - 1 + viewsData.length) % viewsData.length;
    }
    // Если просто инициализация (без направления), currentIndex остается 0

    // 3. Листаем фон
    setTimeout(() => {
        viewer.style.transform = `translateX(-${currentIndex * 100}vw)`;
        
        // 4. Показываем контент с задержкой, чтобы пользователь увидел смену ракурса
        setTimeout(() => {
            viewTitle.innerText = viewsData[currentIndex];
            contentPanel.classList.add('active');
            
            // Разблокируем анимацию чуть позже окончания выезда панели
            setTimeout(() => { isAnimating = false; }, 1200);
        }, 400); 
    }, 100);
}

// Слушатели событий
touchArea.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
}, {passive: true});

touchArea.addEventListener('touchend', (e) => {
    if (isAnimating) return;
    let endX = e.changedTouches[0].clientX;
    let diffX = startX - endX;

    if (Math.abs(diffX) > 60) {
        if (diffX > 0) {
            changeView('next');
        } else {
            changeView('prev');
        }
    }
}, {passive: true});

// Для теста на ПК (мышкой)
touchArea.addEventListener('mousedown', (e) => { startX = e.clientX; });
touchArea.addEventListener('mouseup', (e) => {
    let diffX = startX - e.clientX;
    if (Math.abs(diffX) > 60) {
        changeView(diffX > 0 ? 'next' : 'prev');
    }
});

// Стартовый запуск
window.onload = () => {
    changeView('init');
};

