function timer() {
    // const finishDay = '2020-09-11';
    const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
          monthNames = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(','),
          monthNumber = '01,02,03,04,05,06,07,08,09,10,11,12'.split(','),
          finishDay = `${nextDay.getFullYear()}-${monthNumber[nextDay.getMonth()]}-${nextDay.getDate()}`;

    function getRemainingTime(endtime) {
        const date = new Date();

        let total = Date.parse(endtime) - Date.UTC(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds()
        );

        if (total <= 0) {
            total = 0;
        }

        let days = Math.floor(total / (1000 * 60 * 60 * 24)),
            hours = Math.floor((total / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((total / (1000 * 60)) % 60),
            seconds = Math.floor((total / 1000) % 60);
        
        return { total, days, hours, minutes, seconds };
    }

    function setRemainingTime(selector, endtime) {
        const timer = document.querySelector(selector),
              fieldDay = timer.querySelector('#days'),
              fieldHour = timer.querySelector('#hours'),
              fieldMinute = timer.querySelector('#minutes'),
              fieldSecond = timer.querySelector('#seconds'),
              intervalUpdateTimeID = setInterval(updateTime, 1000);

        function updateTime() {
            const { total, days, hours, minutes, seconds } = getRemainingTime(endtime);

            fieldDay.textContent = days;
            fieldHour.textContent = addZero(hours);
            fieldMinute.textContent = addZero(minutes);
            fieldSecond.textContent = addZero(seconds);

            if (total <= 0) {
                clearInterval(intervalUpdateTimeID);
            }
        }

        updateTime();
    }

    function addZero(number) {
        return number < 10 ? '0' + number : number;
    }

    document.querySelector('.promotion__end').textContent = `${nextDay.getDate()} ${monthNames[nextDay.getMonth()]}`;

    setRemainingTime('.timer', finishDay);
}

module.exports = timer;