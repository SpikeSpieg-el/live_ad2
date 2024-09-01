
// Переменная для хранения количества алмазов
let diamonds = 0;

// Получаем элементы по id
const diamondCounter = document.getElementById('diamondCounter');
const showAdButton = document.getElementById('showAdButton');
vkBridge.send("VKWebAppInit", {})
.then(() => {
    console.log('VK Bridge инициализирован');
})
.catch((error) => {
    console.error('Ошибка инициализации VK Bridge:', error);
});

vkBridge.send('VKWebAppShowBannerAd', {
    banner_location: 'top'
    })
   .then((data) => { 
      if (data.result) {
        // Баннерная реклама отобразилась
      }
    })
    .catch((error) => {
      // Ошибка
      console.log(error);
    });

// Функция для обновления счётчика алмазов на экране
function updateDiamondCounter() {
    diamondCounter.textContent = diamonds;
}

// Функция для показа рекламы и добавления алмазов
function showAd() {
    vkBridge.send('VKWebAppShowNativeAds', {
        ad_format: 'interstitial'
    })
    .then((data) => { 
        if (data.result) {
            // Если реклама была показана, добавить 20 алмазов
            diamonds += 20;
            updateDiamondCounter();
            alert('Реклама была показана. Вы получили 20 алмазов!');
            // Отключаем кнопку на 30 секунд
            disableButtonTemporarily();
        } else {
            console.log('Реклама не была показана');
            alert('Реклама не была показана');
        }
    })
    .catch((error) => { 
        console.log('Произошла ошибка: ', error);
        alert('Произошла ошибка: ' + error.message);
    });
}

// Функция для временного отключения кнопки
function disableButtonTemporarily() {
    showAdButton.disabled = true;
    setTimeout(() => {
        showAdButton.disabled = false;
    }, 30000); // 30 секунд
}

// Функция для добавления 1 алмаза каждую минуту
function addDiamondPassively() {
    diamonds += 1;
    updateDiamondCounter();
}

// Запускаем пассивное добавление алмазов каждую минуту
setInterval(addDiamondPassively, 60000); // 60000 мс = 1 минута

// Добавляем обработчик события для кнопки
showAdButton.addEventListener('click', showAd);
