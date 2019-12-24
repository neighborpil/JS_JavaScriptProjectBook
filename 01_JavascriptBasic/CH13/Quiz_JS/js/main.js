// Mozilla, Opera, Webkit 
if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", function () {
        document.removeEventListener("DOMContentLoaded", arguments.callee, false);
        domReady();
    }, false);
}
// Internet Explorer
else if (document.attachEvent) {
    document.attachEvent("onreadystatechange", function () {
        if (document.readyState === "complete") {
            document.detachEvent("onreadystatechange", arguments.callee);
            domReady();
        }
    });
}

// 돔이 모두 로드 되었을 때
function domReady() {

    // 문제 데이터
    var questions = [
        new Question('다음 중 최초의 상용 웹 브라우저는?', ['모자이크', '인터넷익스플로러', '구글 크롬', '넷스케이프 네비게이터'], '넷스케이프 네비게이터'),
        new Question('웹 문서에서 스타일을 작성하는 언어는?', ['HTML', 'jQuery', 'CSS', 'XML'], 'CSS'),
        new Question('명령어 기반의 인터페이스를 의미하는 용어는?', ['GUI', 'CLI', 'HUD', 'SI'], 'CLI'),
        new Question('CSS 속성 중 글자의 굵기를 변경하는 속성은?', ['font-size', 'font-style', 'font-weight', 'font-variant'], 'font-weight')
    ];

    // 퀴즈 객체 생성
    var quiz = new Quiz(questions);

    var buttons = document.querySelectorAll('.btn');

    // 입력 및 정답 확인 함수 이벤트리스너 지정
    for(var i=0; i<buttons.length; i++){
        checkAnswer(buttons[i], quiz);
    }

    update_quiz(quiz);

}

// 문제 객체(생성자 함수)
function Question(text, choice, answer) {
    this.text = text; // 질문 텍스트
    this.choice = choice; // 선택할 답들이 정의되는 영역(배열)
    this.answer = answer; // 정답 정보
}

// 퀴즈 정보 객체
function Quiz(questions) {
    this.score = 0; // 점수
    this.questions = questions; // 문제 데이터
    this.questionIndex = 0; // 진행중인 질문
}

// 정답 확인 메서드
Quiz.prototype = {
    correctAnswer: function(answer){
        return answer == this.questions[this.questionIndex].answer;
    }
}

// 문제 진행 정보 표시
function progress(quiz){
    var progress = document.getElementById('progress');
    progress.innerHTML = '문제 ' + (quiz.questionIndex + 1) + ' / ' + quiz.questions.length;
}

// 문제 출제 함수
function update_quiz(quiz){
    var question = document.getElementById('question');
    var idx = quiz.questionIndex + 1;
    var choice = document.querySelectorAll('.btn');

    // 문제 출력
    question.innerHTML = '문제 ' + idx + ') ' + quiz.questions[quiz.questionIndex].text;

    // 선택 항목 출력
    for(var i=0; i<quiz.questions.length; i++){
        choice[i].innerHTML = quiz.questions[quiz.questionIndex].choice[i];
    }

    // 진행 정보 표시
    progress(quiz);
}

// 입력 및 정답 확인 함수
function checkAnswer(button, quiz){
    // 선택 버튼 이벤트 리스너
    button.addEventListener('click', function(){
        var answer = button.innerText;

        if(quiz.correctAnswer(answer)){
            alert('정답입니다');
            quiz.score++;
        } else{
            alert('틀렸습니다');
        }

        // 다음 문제로 진행 및 결과 처리
        if(quiz.questionIndex < quiz.questions.length - 1){
            quiz.questionIndex++;
            update_quiz(quiz);
        } else{
            // 결과 화면
            result(quiz);
        }
    });
}

function result(quiz){

    var quiz_div = document.getElementById('quiz'); // 퀴즈 박스 컨테이너

    // 백분율 점수 환산
    var per = parseInt((quiz.score * 100) / quiz.questions.length);

    // 표시할 텍스트 정보와 변수
    var txt = '<h1>결과</h1>' + 
              '<h2 id="score">당신의 점수: ' + quiz.score + '/' +
              quiz.questions.length + '<br><br>' + per + '점</h2>';

    // 점수별 결과 텍스트 출력
    if(per < 60){
        txt += '<h2 style="color:red">더 분발하세요</h2>';
    } else if(per >= 60 && per < 80){
        txt += '<h2 style="color:red">무난하네</h2>';
    } else if(per >= 80){
        txt += '<h2 style="color:red">잘했어</h2>';
    }

    quiz_div.innerHTML = txt; // 결과 텍스트 출력
}
