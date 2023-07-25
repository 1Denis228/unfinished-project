let colorThemeHTML = document.querySelector('html');
let buttonColorTheme = document.querySelectorAll('.button-color-theme');
let buttonOpenSettings = document.querySelector('.button-settings');
let wrapperMenuOption = document.querySelector('.wrapper-menu');
let fullScreenButton = document.querySelectorAll('#resize-expand');
let fullScreenClock = document.querySelector('.panel-default');

let optionFontClock = document.querySelector('#font-clock');
let optionFormatTime = document.querySelector('#format-time');
let optionShowDate = document.querySelector('#show-date');
let optionNightMode = document.querySelector('#night-mode');
let panelColors = document.querySelector('.panel-colors');
let btnColor = document.querySelectorAll('.btn-digit-color');
let classForColorClock = document.querySelectorAll('.color-digit')

checkedOptions();

// Функция проверки темы сайта при загрузке страницы
function checkedColorTheme() {
    if (!localStorage.getItem('themeDarkMode')) {
        localStorage.setItem('themeDarkMode', 'true');
        localStorage.setItem('themeColorId','1');
        colorThemeHTML.classList.add('dark-theme');
        optionNightMode.checked = true;
    }
    else if ((localStorage.getItem('themeDarkMode') === 'true')) {
        colorThemeHTML.classList.add('dark-theme');
        optionNightMode.checked = true;
    }
    else (colorThemeHTML.classList.remove('dark-theme') , optionNightMode.checked = false)
}

// Проверка LocalStrorage для коректной загрузки настроек 
function checkedOptions() {

    //Проверка ШРИФТА ДЛЯ ТОЧНОГО ВРЕМЕНИ
    if (localStorage.getItem('themeDigitalFont') === 'true') {
        optionFontClock.checked = true;
        document.querySelector('.panel-time-exact-time').style.fontFamily = "fantasy";
    }   else if (localStorage.getItem('themeDigitalFont') === 'false') {
        optionFontClock.checked = false;
    }   else if(!localStorage.getItem('themeDigitalFont')) {
        optionFontClock.checked = false;
        document.querySelector('.panel-time-exact-time').style.fontFamily = "Black Ops One ,cursive";
    }
    //Проверка ФОРМАТА ВРЕМЕНИ
    if (localStorage.getItem('clock12hour') === 'true') {
        optionFormatTime.checked = true;
    } else if (localStorage.getItem('clock12hour') === 'false') {
        optionFormatTime.checked = false
    } else (optionFormatTime.checked = false );

    //Проверка ОТОБРАЖЕНИЯ ТОЧНОЙ ДАТЫ
    if (localStorage.getItem('clockDateVisible') === 'true') {
        optionShowDate.checked = true;
        document.querySelector('.panel-time-today-date').style.display = "block";
    } else if (localStorage.getItem('clockDateVisible') === 'false') {
        optionShowDate.checked = false ;
        document.querySelector('.panel-time-today-date').style.display = "none";
    } else (optionShowDate.checked = true);

    //Проверка ТЕМЫ САЙТА
    checkedColorTheme();

    //Проверка цвета ЧАСОВ
}

function checkColorInLocalStorage() {

}

// Событие при клике на опцию ВЫБОРА ШРИФТА ДЛЯ ТОЧНОГО ВРЕМЕНИ
optionFontClock.addEventListener('click', () => {
    if (optionFontClock.checked ===  true) {
        localStorage.setItem('themeDigitalFont', 'true');
        document.querySelector('.panel-time-exact-time').style.fontFamily = "fantasy";
    } else if (optionFontClock.checked === false) {
        localStorage.setItem('themeDigitalFont', 'false');
        document.querySelector('.panel-time-exact-time').style.fontFamily = "Black Ops One ,cursive";
    }
});

// Событие при клике на опцию ФОРМАТА ВРЕМЕНИ
optionFormatTime.addEventListener('click', () => {
    if (optionFormatTime.checked === true) {
        localStorage.setItem('clock12hour', 'true');
        getExactTime()
    } else if (optionFormatTime.checked === false) {
        localStorage.setItem('clock12hour', 'false');
        getExactTime()
    }
});

// Событие при клике на опцию ПОКАЗЫВАНИЯ СЕГОДНЯШНЕЙ ДАТЫ
optionShowDate.addEventListener('click', () => {
    if (optionShowDate.checked === true) {
        localStorage.setItem('clockDateVisible', 'true');
        document.querySelector('.panel-time-today-date').style.display = "block";
    } else if (optionShowDate.checked === false) {
        localStorage.setItem('clockDateVisible', 'false');
        document.querySelector('.panel-time-today-date').style.display = "none";
    }
});

// Событие при клике на опцию СМЕНЫ ТЕМЫ НА САЙТЕ
optionNightMode.addEventListener('click', () => {
    if (localStorage.getItem('themeDarkMode') === 'true') {
        localStorage.setItem('themeDarkMode', 'false');
        optionNightMode.checked = false;
        checkedColorTheme();
    } else if (localStorage.getItem('themeDarkMode') === 'false') {
        localStorage.setItem('themeDarkMode', 'true') ;
        optionNightMode.checked = true;
        checkedColorTheme();
    }
});

// Собитие при выбора цвета в ПАНЕЛИ ЦВЕТОВ

for (let i = 0 ; i < btnColor.length; i++) {
    panelColors.addEventListener('click' , (e) => {
        for( let i = 0 ; i < btnColor.length ; i++) {
            if (e.composedPath().includes(btnColor[i]) === true) {
                for ( let i = 0 ; i < btnColor.length ; i++) {
                    btnColor[i].classList.remove('icon-style-active');
                }
                btnColor[i].classList.add('icon-style-active');
                let color = btnColor[i].style.color;
                let fullTargetButtonID = btnColor[i].id;
                let shortTargetButtonID = fullTargetButtonID.replace("digit-color-", "");
                localStorage.setItem('themeColorId', shortTargetButtonID) 
                console.log(shortTargetButtonID);
                for ( let i = 0; i < classForColorClock.length; i++) {
                    classForColorClock[i].style.color = `${color}`;
                }
            }
        }
    });
}

//Вывод елемента в ПОЛНОЭКРАННЫЙ РЕЖИМ
for (let i = 0; i < fullScreenButton.length ; i++) {
    fullScreenButton[i].addEventListener('click', () => {
        if (!document.fullscreenElement) {
            fullScreenClock.requestFullscreen();
        }   else {
                if (document.fullscreenEnabled) {
                    document.exitFullscreen();
                }
        }
    });
}

// Функция смены темы на сайте при клике на иконку
for (let i = 0; i < buttonColorTheme.length ; i++) {
    buttonColorTheme[i].addEventListener('click', () => {
        if (localStorage.getItem('themeDarkMode') === 'true') {
            localStorage.setItem('themeDarkMode', 'false');
            localStorage.setItem('themeColorId','0');
            colorThemeHTML.classList.remove('dark-theme');
            checkColorClock()
        }
        else {
            localStorage.setItem('themeDarkMode', 'true');
            localStorage.setItem('themeColorId','1');
            colorThemeHTML.classList.add('dark-theme');
            checkColorClock()
        }
    })
}

function checkColorClock() {
    if (localStorage.getItem('themeColorId') === '1' ) {
        let element = document.querySelector('#digit-color-1');
        element.classList.add('icon-style-active')
        let color = element.style.color;
        for( let i = 0 ; i < classForColorClock.length; i++) {
            classForColorClock[i].style.color = `${color}`;
        }
    } else if (localStorage.getItem('themeColorId') === '0') {
        let element = document.querySelector('#digit-color-0');
        element.classList.add('icon-style-active')
        let color = element.style.color;
        for( let i = 0 ; i < classForColorClock.length; i++) {
            classForColorClock[i].style.color = `${color}`;
        }
    }
}

// Событие для запуска/скрытия МЕНЮ ФУНКЦИЙ
document.addEventListener('click', (e) => {
    if ( wrapperMenuOption.matches('.active-menu-option') === false ) {
        const click = e.composedPath().includes(buttonOpenSettings);
        if ( click ) {
            wrapperMenuOption.classList.add('active-menu-option');
        } 
    } else if (wrapperMenuOption.matches('.active-menu-option') === true ) {
        const click = e.composedPath().includes(wrapperMenuOption);
        if ( !click ) {
            wrapperMenuOption.classList.remove('active-menu-option');
        }
    }
})  
