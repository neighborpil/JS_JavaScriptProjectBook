var wrapper = document.querySelector('.wrapper'),
    page = document.querySelectorAll('.page'),
    indicator = document.getElementById('indicator'),
    indicator_li = indicator.querySelectorAll('li');

var yDeg = 0, // 페이지 전환시 데스크톱 페이지를 회전시키는 각도
    indicator_num = 1, // 현재 표시되는 페이지의 번호
    indicator_length = page.length, // 화면에 표시할 인디케이터의 개수, 페이지의 개수를 통해 알아냄
    w = page[0].offsetWidth, // 현재 페이지의 폭, offsetWitdh 속성으로 해당 요소의 width 값을 구할 수 있다. 
                             // 4면체 구성시 각 면의 길이를 알아야 하고, 페이지의 크기가 변경될 때마다 
                             // 시점 거리를 조절 위하여 동적으로 참조
    page_angle = 0,
    page_vector = 0;

var hammer = new Hammer(wrapper);

function init_page(){
    w = page[0].offsetWidth; // 현제 페이지의 폭 값을 변수로 참조

    // 3D page 4면체 위치 정의
    for(var i=0; i<page.length; i++){
        page[i].style.transform = 'rotateY('+ page_angle + 'deg) translateZ(' + (w/2) + 'px)'; // 90도씩 회전, 화면의 절반만큼 z축 앞으로 표시
        page_angle += 90;
    }

    // page wrapper 정면으로 초기화, 페이지를 회전시키는 회전체는 .wrapper
    // z축 앞으로 빼놨기 때문에 다시 뒤로 넣어줌(translateZ: 양수면 가까워지고, 음수면 멀어진다)
    wrapper.style.transform = 'translateZ(' + (-w/2) + 'px) rotateY(' + yDeg + 'deg)';
}

// 인디케이터 초기화
function init_indicator(){
    // 인디케이터 표시
    for(var i=0; i<indicator_length; i++){
        indicator.innerHTML += '<li>' + (i+1) + '</li>';
    }

    indicator_li = indicator.querySelectorAll('li');
    change_page(indicator_num);
}

// 페이지 전환
function change_page(inum){
    indicator_li[inum-1].setAttribute('class', 'active'); // 현재 페이지의 인디케이터 스타일 activate
    // 매개변수로 전달받은 페이지 번호의 위치로 이동시킬 회전 각도 설정
    // 4방향 90도씩 변경
    // Page번호(inum)   증가식              변경된 각도(yDeg)
    // 1                yDeg=-90*(1 - 1)    0  
    // 2                yDeg=-90*(2 - 1)    -90  
    // 3                yDeg=-90*(3 - 1)    -180  
    // 4                yDeg=-90*(4 - 1)    -270  
    yDeg = -90 * (inum - 1);
    wrapper.style.transform = 'translateZ(' + (-w/2) + 'px) rotateY(' + yDeg  + 'deg)';

    // 인디케이터 표시
    for(var i=0; i<indicator_li.length; i++){
        indicator_li[i].removeAttribute('class');
    }
    indicator_li[inum - 1].setAttribute('class', 'active');
}

// ---------------------
init_page();
init_indicator(); // 페이지 개수만큼 인디케이터 버튼 목록을 추가

// --------------------- 이벤트 리스너
for(var i=0; i<indicator_li.length; i++){
    indicator_li[i].addEventListener('click', function(){
        indicator_num = parseInt(this.innerText);
        change_page(indicator_num);
    });
}

// 터치 제스처 이벤트(hammer.js)
/*
해머 제스쳐 사용법
var 변수명 = new Hammer(요소명);
변수명.on('터치 속성', 콜백 함수);
*/

hammer.on('swipeleft', function(e){
    // 인디케이터(페이지) 이동 범위 내이면
    if(indicator_num < indicator_length)
        page_vector = 1;
    else
        page_vector = 0;

    indicator_num += page_vector;
    change_page(indicator_num);
});

hammer.on('swiperight', function(e){
    if(indicator_num > 1)
        page_vector = -1;   
    else
        page_vector = 0;

    indicator_num += page_vector;
    change_page(indicator_num);
});

// 창 크기 변경시 페이지 초기화
window.onresize = function(){
    this.init_page();
}