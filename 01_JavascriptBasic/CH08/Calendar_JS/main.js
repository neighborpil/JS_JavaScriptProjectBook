function calendar(new_year, new_month) {
    var d = new Date(new_year, new_month - 1, 1),
        d_length = 32 - new Date(new_year, new_month - 1, 32).getDate(),
        year = d.getFullYear(),
        month = d.getMonth(),
        date = d.getDate(),
        day = d.getDay();

    // caption영역 날짜 표시 객체
    var caption_year = document.querySelector('.year'),
        caption_month = document.querySelector('.month');
    var start_day = document.querySelectorAll('tr td');

    // 테이블 초기화
    for (var i = 0; i < start_day.length; i++) {
        start_day[i].innerHTML = '&nbsp;';
    }

    // 한달치 날자를 테이블에 시작 요일부터 순서대로 표시
    for (var i = day; i < day + d_length; i++) {
        start_day[i].innerHTML = date;
        date++;
    }

    // 캡션 날자 표시
    caption_year.innerHTML = year;
    caption_month.innerHTML = month + 1;
}

// 익명함수 정의해 함수를 즉시 처리하기
(function () {
    var prev = document.getElementById('prev'),
        next = document.getElementById('next'),
        year = new Date().getFullYear(),
        month = new Date().getMonth() + 1;

    calendar(year, month);

    // 이전 달, 다음 달 버튼 클릭 이벤트 핸들러
    prev.onclick = function(){
        calendar(year, --month);
    }

    next.onclick = function(){
        calendar(year, month++);
    }
})();