// 변수 선언
var $inp = $('form[name=cal]'); // form 객체
var $input = $inp.find('input'); // find : 현재 지정된 선택자의 후손을 찾는 제이쿼리 메서드
var $cls_btn = $('.cls_btn'); // 초기화 버튼
var $result_btn = $('.result_btn'); // 결과 버튼
var $result = $inp.find('input[name=result]'); // 결과창


// 계산기 초기화
function clr(){
    $result.val(0); // val()메서드 : 값을 읽거나 지정
}

// 계산기 입력 처리
function calc(value){
    // 입력이 들어가면 0을 지움
    if($result.val() == 0){
        $result.val('');
    }

    // 입력값을 결과창에 출력
    var val = $result.val() + value;
    $result.val(val);
}

// 계산 결과 처리 함수
function my_result(){
    var calc= eval($result.val());

    // 결과창에 표시
    $result.val(calc);
}

// 이벤트 핸들러 ------------------------------------

// => JS에서는 input요소가 많으므로 반복문을 통해 이벤트 핸들러를 각각 지정하였으나
// 제이쿼리 이벤트 핸들러는 해당 요소에 자동으로 지정

// 이벤트 핸들러1 :숫자 및 사칙 연산 버튼
$('input').click(function(){
    var $input_value = $(this).val();

    // 숫자와 사칙 연산자만 입력 처리
    if($input_value != '=' && $input_value != 'clear'){
        calc($input_value);
    }
});

// 초기화 버튼
$cls_btn.click(function(){
    clr();
})

// 결과 버튼
$('.result_btn').click(function(){
    try{
        my_result();
    }
    catch(err){
        $result.val('입력 오류');
    }
});
