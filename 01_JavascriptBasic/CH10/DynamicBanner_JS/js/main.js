var banner = document.getElementById('banner'),
    img = banner.getElementsByTagName('img'),
    toggle = document.getElementById('toggle'),
    sound_btn = document.getElementById('sound_btn');

var banner_height = getComputedStyle(banner).height;
var cast = []; //풍선 스프라이트 객체를 정의할 배열

/*
#스타일 값 구하기
자바스크립트에서 css 속성 변경은 element.style 사용
반대로 속성 값을 읽을 때에는 인라인 스타일 속성만 읽는 것이 가능(태그 내에서 작성된 스타일만)
태그 밖에서 작성된 CSS 속성(style 또는 link)는 전역객체(window)인 getComputedStyle()메서드를 사용해야 함
*/

function set_balloon(num){
    // 풍선의 속성 값을 랜덤으로 생성
    var x = Math.floor(Math.random() * (500 - 10) + 10), // 10에서 500 사이의 값
        y = Math.floor(Math.random() * (400 - 120) + 120),
        size = Math.floor(Math.random() * (200 - 100) + 100),
        angle = Math.floor(Math.random() * (360 - 0) + 0),
        speed = Math.random() * (2 - 0) + 0;

    // 풍선 객체
    cast[num] = {
        x: x,
        y: -y, //풍선의 y 좌표(배너 상단에서 떨어지므로 마이너스 값)
        size: size,
        angle: angle,
        speed: speed // 떨어지는 속도
    }
}