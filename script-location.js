$(document).ready(function() {
    let map; // 在全局變量中存儲地圖

    $('#findLocation').click(function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });

    function showPosition(position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // 調用 initMap 函數來顯示地圖
        initMap(lat, lng);
    }

    window.initMap = function(lat, lng) {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: lat, lng: lng },
            zoom: 15
        });

        new google.maps.Marker({
            position: { lat: lat, lng: lng },
            map: map,
            title: "You are here"
        });
    }

    function showError(error) {
        let message = "";
        switch (error.code) {
            case error.PERMISSION_DENIED:
                message = "User denied the request for Geolocation.";
                break;
            case error.POSITION_UNAVAILABLE:
                message = "Location information is unavailable.";
                break;
            case error.TIMEOUT:
                message = "The request to get user location timed out.";
                break;
            case error.UNKNOWN_ERROR:
                message = "An unknown error occurred.";
                break;
        }
        alert(message);
    }

    // 熱門國家按鈕的點擊事件
    $('.country').click(function() {
        const lat = parseFloat($(this).data('lat'));
        const lng = parseFloat($(this).data('lng'));

        // 如果地圖已經初始化，將地圖移動到選定的國家
        if (map) {
            map.setCenter({ lat: lat, lng: lng });
            map.setZoom(5);

            new google.maps.Marker({
                position: { lat: lat, lng: lng },
                map: map,
                title: $(this).text()
            });
        } else {
            // 如果地圖尚未初始化，直接初始化地圖到指定位置
            initMap(lat, lng);
        }
    });
});
