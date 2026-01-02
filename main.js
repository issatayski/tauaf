const viewer = document.getElementById('viewer');
const contentPanel = document.getElementById('contentPanel');
const viewTitle = document.getElementById('viewTitle');
const touchArea = document.getElementById('touchArea');

const viewsData = [
    "Ракурс: Черный камень",
    "Ракурс: Северная сторона",
    "Ракурс: Восточная сторона",
    "Ракурс: Южная сторона",
    "Ракурс: Западная сторона"
];

let currentIndex = 0;
let startX = 0;
let startY = 0;
let isAnimating = false;

function changeView(newIndex) {
    if (isAnimating) return;
    isAnimating = true;

    // 1. Прячем панель
    contentPanel.classList.remove('active');

    // 2. Листаем фото (через 200мс для плавности)
    setTimeout(() => {
        currentIndex = newIndex;
        viewer.style.transform = `translateX(-${currentIndex * 100}vw)`;
        
        // 3. Выкатываем панель с новым текстом
        setTimeout(() => {
            viewTitle.innerText = viewsData[currentIndex];
            contentPanel.classList.add('active');
            isAnimating = false;
        }, 600);
    }, 200);
}

// Обработка касаний
touchArea.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
}, false);

touchArea.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;

    let diffX = startX - endX;
    let diffY = startY - endY;

    // Проверяем, что это был горизонтальный свайп, а не вертикальный
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX > 0 && currentIndex < viewsData.length - 1) {
            // Свайп влево -> Вперед
            changeView(currentIndex + 1);
        } else if (diffX < 0 && currentIndex > 0) {
            // Свайп вправо -> Назад
            changeView(currentIndex - 1);
        }
    }
}, false);

// Инициализация при загрузке
window.onload = () => {
    changeView(0);
};

