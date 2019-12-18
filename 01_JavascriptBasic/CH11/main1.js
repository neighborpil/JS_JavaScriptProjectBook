function initMap(){

      // 위치 정보 변수
      var my_position = { lat: 35.132005, lng: 129.1153502 }

      // 맵 객체를 생성하고 id='map'에 지도 표시
      var map = new google.maps.Map(document.getElementById('map'),{
          center: my_position,
          scrollwheel: false,
          zoom: 12,
      });

      // 마커 객체 생성
      var marker = new google.maps.Marker({
          map: map,
          position: my_position,
          title: 'Here I am'
      });

      // 정보창 객체 추가
      var infoWindow = new google.maps.InfoWindow({map: map});

      // HTML5 위치 정보 요청
      if(navigator.geolocation){
        // 지오로케이션을 사용 할 수 있는 경우
        navigator.geolocation.getCurrentPosition(function(position){
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Here you are');
          map.setCenter(pos);
        },
        function(){
          // 연결 실패
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else{
        handleLocationError(false, infoWindow, map.getCenter());
      }
}

// 지오 로케이션 오류 처리
function handleLocationError(browserHasGeoLocation, infoWindow, pos){
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeoLocation ?
    '오류: 지오로케이션 연결 실패' : 
    '오류: 브라우저에서 지오로케이션을 지원하지 않음');
}