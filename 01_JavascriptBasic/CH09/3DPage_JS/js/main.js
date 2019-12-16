var wrapper = docuemnt.querySelector('.wrapper'),
    page = document.querySelector('.page'),
    indicator = document.getElementById('indicator'),
    indicator_li = indicator.querySelectorAll('li');

var yDeg = 0, // 페이지 전환시 데스크톱 페이지를 회전시키는 각도
    indicator_num = 1, // 현재 표시되는 페이지의 번호
    indicator_length = page.length, // 화면에 표시할 인디케이터의 개수, 페이지의 개수를 통해 알아냄
    w = page[0].offsetWidth, // 현재 페이지의 폭, offsetWitdh 속성으로 해당 요소의 width 값을 구할 수 있다. 
                             // 4면체 구성시 각 면의 길이를 알아야 하고, 페이지의 크기가 변경될 때마다 
                             // 시점 거리를 조절 위하여 동적으로 참조
    page_angle = 0;

function init_page(){
    w = page[0].offsetWidth;

    // 3D page 4면체 위치 정의
    for(var i=0; i<page.length; i++){
        page[i].style.transform = 'rotateY('+ page_angle + 'deg) translateZ(' + (w/2) + 'px)';
        page_angle += 90;
    }

    // page wrapper 정면으로 초기화
    wrapper.style.transform = 'translateZ(' + (-w/2) + 'px) rotateY(' + yDeg + 'deg)';
}