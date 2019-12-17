var $banner = $('#banner'),
    $img = $banner.find('img'),
    $toggle = $('#toggle'),
    $sound_btn = $('#sound_btn');

var $banner_height = $banner.css('height');
var cast = [];

// 풍선 객체 생성 함수
function set_balloon(num){
    var x = Math.floor(Math.random() * (500 - 10) + 10),
        y = Math.floor(Math.random() * (400 - 120) + 120),
        size = Math.floor(Math.random() * (200 - 100) + 100),
        angle = Math.floor(Math.random() * (360 - 0) + 0),
        speed = Math.random() * (2 - 0) + 0;
    
    // 풍선 객체
    cast[num] = {
        x: x,
        y: -y,
        size: size,
        angle: angle,
        speed: speed
    };
}

function ball_init(){
    $img.each(function(i){
        // 풍선 객체들의 속성 초기화
        set_balloon(i);
        $img.eq(i).css('left', '-9999px')
                  .css('top', '-9999px');
    });
}

function animate_balloon(){
    $img.each(function(i){
        // 풍선 속성 변경
        $img.eq(i)
            .css('left', cast[i].x + 'px')
            .css('top', cast[i].y + 'px')
            .css('transform', 'rotate(' + cast[i].angle + 'deg)');
        
        if(cast[i].y < parseInt($banner_height)){
            cast[i].y += 1 + cast[i].speed;
            cast[i].angle += cast[i].speed;
        } else{
            set_balloon(i);
        }
    });
}

function bgm_init(){
    var bgm = new Audio();
    bgm.src = './images/bgm.mp3';
    bgm.loop = true;
    $('body').append(bgm);
}

// main
ball_init();
setInterval(function(){
    animate_balloon();
},  1000/30);
bgm_init();

// event 
$sound_btn.click(function(event){
    var attr = $(this).attr('class');
    var bgm = $('audio');

    if(attr == 'active'){
        $(this).removeAttr('class');
        $(this).attr('src', './images/sound_off.png');
        bgm[0].pause();
    } else{
        $(this).attr('class', 'active');
        $(this).attr('src', './images/sound_on.png');
        bgm[0].play();
    }
    event.stopPropagation();
});

$toggle.click(function(){
    var attr = $banner.attr('class');

    if(attr == 'active'){
        $banner.removeAttr('class');
        $(this).html('배너 열기');
        return false;
    } else{
        $banner.attr('class', 'active');
        $(this).html('배너 닫기');
        return false;
    }
});

$banner.click(function(){
    window.open('https://csslick.github.io/', '_blank');
})