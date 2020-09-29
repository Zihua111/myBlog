
!(function () {

    var $time = $("#time");
    // 初始时间，月/日/年 时:分:秒
    var X = new Date("09/13/2020 0:0:00");
    var M = 24 * 60 * 60 * 1000;
    function runtime() {
        var Y = new Date();
        var T = (Y.getTime() - X.getTime());
        var a = T / M;
        var A = Math.floor(a);
        var b = (a - A) * 24;
        var B = Math.floor(b);
        var c = (b - B) * 60;
        var C = Math.floor((b - B) * 60);
        var D = Math.floor((c - C) * 60);

        switch (true) {
            case B < 10: B = "0" + B; break;
            case C < 10: C = "0" + C; break;
            case D < 10: D = "0" + D; break;
            default: break;
        }
        $time.text("已运行 " + A + " 天 " + B + " 时 " + C + " 分 " + D + " 秒 ");
    }
    setInterval(runtime, 1000);

    //search框的实现
    var $search = $(".search");
    var $searchIcon = $(".searchIcon");

    $search.on("focusin", () => {
        $searchIcon.css({
            borderColor: "white",
            color: "white",
            background: 'url("/static/app/imgs/search_white.png") no-repeat center',
            backgroundSize: "40% 50%",
        });
        $search.css({
            borderColor: "white",
            color: "white",
        });
    });

    $search.on("focusout", () => {
        $searchIcon.css({
            borderColor: "rgb(220,220,220)",
            color: "rgb(220,220,220)",
            background: 'url("/static/app/imgs/search.png") no-repeat center',
            backgroundSize: "40% 50%",
        });
        $search.css({
            borderColor: "rgb(220,220,220)",
            color: "rgb(220,220,220)",
        });
    });

    //set
    var $set = $("#set");
    var $set_content = $("#set_content");
    var $weather_img = $("#weather_img");
    var $right_btn = $("#right_btn");
    var $left_btn = $("#left_btn");
    var $weather_name = $("#weather_name");
    var $close_btn = $(".close_btn");

    $set.on("mouseover", () => {
        $set.css("background-image", "url('/static/app/imgs/weather_red.png')");
    });

    $set.on("mouseout", () => {
        $set.css("background-image", "url('/static/app/imgs/weather.png')");
    });

    $set.on("click", (e) => {
        var e = e || window.event;
        e.stopPropagation();
        $set_content.toggle(300);
        $(document).one("click", function () {  //点击其他地方隐藏$set_content
            $set_content.hide(300);
        });

    });

    //防止被document的click事件影响
    $set_content.on("click", (e) => {
        var e = e || window.event;
        e.stopPropagation();
    });

    function getWeatherText(img_index) {
        switch (img_index) {
            case 0: return "晴";
            case 1: return "雪";
            case 2: return "雨";
        }
    }

    var img_index = Math.floor(Math.random() * 3);//0:晴   1:雪   2:雨
    $weather_name.text(getWeatherText(img_index));
    Picture.picClick({ $obj: $weather_img, url: "/static/app/imgs/weather" + img_index + ".jpg", width: 80, height: 80, rows: 15, cols: 15 });

    //snow
    if (img_index == 1) Snow("/static/app/imgs/snow.png");
    //rain
    if (img_index == 2) Rain();

    $right_btn.on("click", () => {
        if (img_index == 1) $("#canvas_snow").remove();
        if (img_index == 2) $("#canvas_rain").remove();
        img_index++;
        if (img_index == 3) img_index = 0;
        if (img_index == 1) Snow("/static/app/imgs/snow.png");
        if (img_index == 2) Rain();
        $weather_name.text(getWeatherText(img_index));
        $weather_img.empty();
        Picture.picClick({ $obj: $weather_img, url: "/static/app/imgs/weather" + img_index + ".jpg", width: 80, height: 80, rows: 15, cols: 15 });
    });

    $left_btn.on("click", () => {
        if (img_index == 1) $("#canvas_snow").remove();
        if (img_index == 2) $("#canvas_rain").remove();
        img_index--;
        if (img_index == -1) img_index = 2;
        if (img_index == 1) Snow("/static/app/imgs/snow.png");
        if (img_index == 2) Rain();
        $weather_name.text(getWeatherText(img_index));
        $weather_img.empty();
        Picture.picClick({ $obj: $weather_img, url: "/static/app/imgs/weather" + img_index + ".jpg", width: 80, height: 80, rows: 15, cols: 15 });
    });

    $close_btn.on("click", () => {
        $set_content.hide(300);
    });

    //网页失去焦点时改变标题
    $(document).on('visibilitychange', function () {
        var isHidden = document.hidden;
        if (isHidden) {
            $('title').text('^-^别离开我！');
        } else {
            $('title').text('Zihua-之华博客-回来啦小老弟');
        }
    });

    //vue
    new Vue({
        el: '#body',
        data: {
            arr: [1, 2, 3, 4],
            testText: 'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala'
                + 'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala'
                + 'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala'
                + 'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala'
                + 'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala'
                + 'balabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabalabala...',
            flag: true,
            direction: ''
        },
        methods: {
            next() {
                this.direction = 'animated bounceOutRight';
                this.$nextTick(() => {
                    this.flag = false;
                    setTimeout(() => { this.flag = true; }, 300);
                });
            },
            prev() {
                this.direction = 'animated bounceOutLeft';
                this.$nextTick(() => {
                    this.flag = false;
                    setTimeout(() => { this.flag = true; }, 300);
                });
            }
        }

    });

}());





