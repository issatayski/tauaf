const viewer = document.getElementById('viewer');
const contentPanel = document.getElementById('contentPanel');
const viewTitle = document.getElementById('viewTitle');

const data = [
    { title: "Черный камень (Аль-Хаджар аль-Асвад)", desc: "Начальная точка Тавафа. Повернитесь лицом к камню и начните обход." },
    { title: "Северная сторона (Рукн аль-Ираки)", desc: "Сторона, обращенная в сторону Ирака. Здесь находится Хиджр Исмаил." },
    { title: "Восточная сторона", desc: "Вид на архитектурные особенности восточной стены и проход к Сафа и Марва." },
    { title: "Южная сторона (Рукн аль-Ямани)", desc: "Йеменский угол. Сунна — коснуться его рукой, если это возможно." },
    { title: "Западная сторона (Рукн аш-Шами)", desc: "Сирийский угол. Завершение обхода стороны Хиджр Исмаил." }
];

let currentIndex = 0;
let startX = 0;
let isAnimating = false;

// Инициализация
function updateUI() {
    // 1. Скрываем панель перед сменой
    contentPanel.classList.remove('visible');
    
    // 2. Сдвигаем фон
    viewer.style.transform = `translateX(-${currentIndex * 100}vw)`;

    // 3. После завершения анимации фона показываем новый контент
    setTimeout(() => {
        viewTitle.innerText = data[currentIndex].title;
        contentPanel.classList.add('visible');
        isAnimating = false;
    }, 800); // Задержка чуть больше, чем CSS transition
}

// Обработка свайпов
document.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
}, { passive: true });

document.addEventListener('touchend', e => {
    if (isAnimating) return;

    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) { // Порог свайпа
        if (diff > 0 && currentIndex < data.length - 1) {
            // Свайп влево -> Следующий ракурс
            currentIndex++;
            isAnimating = true;
            updateUI();
        } else if (diff < 0 && currentIndex > 0) {
            // Свайп вправо -> Предыдущий ракурс
            currentIndex--;
            isAnimating = true;
            updateUI();
        }
    }
}, { passive: true });

// Первый запуск
window.onload = () => {
    updateUI();
};

