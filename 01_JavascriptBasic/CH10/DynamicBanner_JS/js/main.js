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
    };
}

// 풍선 객체 초기화 함수
function ball_init(){
    for(var i=0; i<img.length; i++){
        set_balloon(i);
        img[i].style.left = '-9999px';
        img[i].style.top = '-9999px';
    }
}

// 풍선 애니메이션 함수
function animate_balloon(){
    for(var i=0; i<img.length; i++){
        // 풍선 속성 변경
        img[i].style.left = cast[i].x + 'px';
        img[i].style.top = cast[i].y + 'px';
        img[i].style.transform = 'rotate(' + cast[i].angle + 'deg)';

        // 풍선이 화면 안에 있으면
        if(cast[i].y < parseInt(banner_height)){
            cast[i].y += 1 + cast[i].speed;
            cast[i].angle += cast[i].speed;
        } else{
            set_balloon(i);
        }
    }
}

function bgm_init(){
    var bgm = new Audio();
    bgm.src = './images/bgm.mp3';
    bgm.loop = true;
    document.body.appendChild(bgm);
}

// 메인

ball_init();
setInterval(function(){
    animate_balloon();
}, 1000/30); // 1/30  초마다 함수를 호출, 초당 30 프레임
bgm_init();

// 이벤트 핸들러

// 사운드 버튼 이벤트 핸들러
sound_btn.onclick = function(){
    var attr = sound_btn.getAttribute('class');
    var bgm = document.getElementsByTagName('audio');

    if(attr == 'active'){
        // 사운드 off
        sound_btn.removeAttribute('class');
        sound_btn.setAttribute('src', './images/sound_off.png');
        bgm[0].pause(); // 정지
    } else{
        sound_btn.setAttribute('class', 'active');
        sound_btn.setAttribute('src', './images/sound_on.png');
        bgm[0].play();
    }
    event.stopPropagation(); // 이벤트 버블링 차단
}

// 배너 열기/닫기 버튼 이벤트 핸들러
toggle.onclick = function(){
    var attr = banner.getAttribute('class');

    if(attr == 'active'){
        // 배너 닫기
        banner.removeAttribute('class');
        toggle.innerHTML = '배너 열기';
        return false; // 버튼 객체가 <a>요소이기 때문에 클릭 시 문서가 이동되는 기본 이벤트 방지 위해
    } else{
        banner.setAttribute('class', 'active');
        toggle.innerHTML = '배너 닫기'; 
        return false; 
    }
}

// 배너 링크 처리
banner.onclick = function(){
    window.open('https://csslick.github.io/', '_blank');
}