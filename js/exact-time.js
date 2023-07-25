let exactTimeInner = document.querySelectorAll('.panel-time-exact-time');
let formatTimeInner = document.querySelector('.format-am-pm');
let todayDateInner = document.querySelectorAll('.panel-time-today-date');

getExactTime();
getTodayDate();

function getExactTime() {
    const todayTime = new Date();

    let exactHours = todayTime.getHours().toString().padStart(2,0);
    let exactMinutes = todayTime.getMinutes().toString().padStart(2,0);
    let exactSeconds = todayTime.getSeconds().toString().padStart(2,0);

    for (let i = 0 ; i < exactTimeInner.length ; i++) {
        if (localStorage.getItem('clock12hour') === 'false' || !localStorage.getItem('clock12hour')) {
            exactTimeInner[i].innerHTML = `${exactHours}:${exactMinutes}:${exactSeconds}`;
            formatTimeInner.style.display = "none";
        } else if (localStorage.getItem('clock12hour') === 'true') {
            if (exactHours >= 12) {
                let prepand = (exactHours >= 12) ? "PM" : "AM" ;
                exactHours = (exactHours >= 12) ? exactHours -12 : exactHours ;
                if (exactHours === 12) {
                    exactHours = '00';
                } 
                exactTimeInner[i].innerHTML = `${exactHours}:${exactMinutes}:${exactSeconds}`;
                formatTimeInner.innerHTML = `${prepand}`;
                formatTimeInner.style.display = "block";
            } else if ( exactHours < 12) {
                let prepand = (exactHours >= 12) ? "PM" : "AM" ;
                exactHours = (exactHours >= 12) ? exactHours -12 : exactHours ;
                if (exactHours === 12) {
                    exactHours = '00';
                } 
                exactTimeInner[i].innerHTML = `${exactHours}:${exactMinutes}:${exactSeconds}`;
                formatTimeInner.innerHTML = `${prepand}`;
                formatTimeInner.style.display = "block";
            }
        }
    }
}

setInterval(getExactTime,1000);

function getTodayDate() {

    const TodayDate = new Date();
    
    let todayYear = TodayDate.getFullYear();        //Создаём переменную с текущим годом
    let numberTodayMonth = TodayDate.getMonth();    //Создаём переменную с текущим месяцем в числовом значении
    let nameTodayMonth = '' ;                       //Создаём переменную с текущим месяцем в строчечном значении
    let todayDayMonth = TodayDate.getDate();        //Создаём переменную с текущим днём месяца
    let numberTodayDayWeek = TodayDate.getDay();    //Создаём переменную с текучим числом недели (нумерация с 0-воскресенье)
    let nameTodayDayWeek = '' ;

    switch (numberTodayMonth) {
        case 0:
            nameTodayMonth = 'Января'
            break;
        case 1:
            nameTodayMonth = 'Февраля'
            break;
        case 2:
            nameTodayMonth = 'Марта'
            break;
        case 3:
            nameTodayMonth = 'Апреля'
            break;
        case 4:
            nameTodayMonth = 'Мая'
            break;
        case 5:
            nameTodayMonth = 'Июня'
            break;
        case 6:
            nameTodayMonth = 'Июля'
            break;
        case 7:
            nameTodayMonth = 'Августа'
            break;
        case 8:
            nameTodayMonth = 'Сентября'
            break;
        case 9:
            nameTodayMonth = 'Октября'
            break;
        case 10:
            nameTodayMonth = 'Ноября'
            break;
        case 11:
            nameTodayMonth = 'Декабря'
            break;
    }

    switch (numberTodayDayWeek) {
        case 0:
            nameTodayDayWeek = 'Воскресенье'
            break;
        case 1:
            nameTodayDayWeek = 'Понедельник'
            break;
        case 2:
            nameTodayDayWeek = 'Вторник'
            break;
        case 3:
            nameTodayDayWeek = 'Среда'
            break;
        case 4:
            nameTodayDayWeek = 'Четверг'
            break;
        case 5:
            nameTodayDayWeek = 'Пятница'
            break;
        case 6:
            nameTodayDayWeek = 'Субота'
            break;
    }

    for (let i = 0 ; i < todayDateInner.length; i++) {
        if (!localStorage.getItem('clockDateVisible')) {
            todayDateInner[i].innerHTML = `${nameTodayDayWeek} , ${todayDayMonth} ${nameTodayMonth} ${todayYear}`;
        }
    }
}