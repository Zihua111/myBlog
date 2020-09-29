
(function () {
    class Pictrue {

        constructor() {

        }
        picHover = function (init) {

            //init
            var rows = init.rows || 10;
            var cols = init.cols || 10;
            var height = init.height || 100;
            var width = init.width || 100;
            var speedms = init.speedms || 200;
            var $obj = init.$obj || $("body");
            var url = init.url;
            //

            $obj.css("position", "relative");

            //生成图片
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    if ((r == 0 && c == 0) || (r == 0 && c == 1) || (r == 1 && c == 0)
                        || (r == 0 && c == cols - 2) || (r == 0 && c == cols - 1) || (r == 1 && c == cols - 1)
                        || (r == rows - 1 && c == 0) || (r == rows - 1 && c == 1) || (r == rows - 2 && c == 0)
                        || (r == rows - 1 && c == cols - 1) || (r == rows - 1 && c == cols - 2)
                        || (r == rows - 2 && c == cols - 1)) {
                        continue;
                    }
                    var $tempdiv = $("<div></div>").css("background", "url('" + url + "')").css("transform", "scale(1)")
                        .css("transition", "transform " + speedms + "ms").css("width", width / cols + "px")
                        .css("height", height / rows + "px").css("backgroundSize", width + "px " + height + "px")
                        .css("backgroundPosition", (-Math.floor(width / cols) * c) + "px " + (-Math.floor(height / rows) * r) + "px");

                    var $templi = $("<li></li>").attr("class", "liClassInPictrue").css("width", width / cols + "px")
                        .css("height", height / rows + "px").css("left", Math.floor(width / cols) * c + "px")
                        .css("top", Math.floor(height / rows) * r + "px").css("transform", "rotate(0deg)")
                        .css("position", "absolute").css("background", "white").css("opacity", "1")
                        .css("transition", "transform " + speedms + "ms ease-out,opacity " + speedms + "ms ease-out");

                    $templi.append($tempdiv);
                    $obj.append($templi);
                }
            }

            //生成一组随机数
            var randomList = [];
            for (let j = 0; j < $(".liClassInPictrue").length; j++) {
                randomList.push(Math.random() * 40 - 20);
            }

            //事件
            $obj.on("mouseover", (e) => {
                e = e || window.event;
                e.stopPropagation();
                var $liclick = $(".liClassInPictrue");
                for (let j = 0; j < $liclick.length; j++) {
                    var random = Math.random() * 40 - 20;
                    let lidiv = $liclick[j].children[0];
                    let r = Math.floor(j / cols);
                    let c = j - r * cols;
                    $liclick[j].style.transform = "scale(0.9) rotate(" + randomList[j] + "deg)" +
                        "translateX(" + (2 * c - 20) + "px)" +
                        "translateY(" + (2 * r - 20) + "px)";
                    lidiv.style.transform = "scale(0.9)";
                    $liclick[j].style.opacity = "0.8";
                }
            });

            $obj.on("mouseout", (e) => {
                e = e || window.event;
                e.stopPropagation();
                $(".liClassInPictrue").css("transform", "rotate(0deg)").css("opacity", "1").children().css("transform", "scale(1)");
            });
        }

        picClick = function (init) {

            //init
            var rows = init.rows || 10;
            var cols = init.cols || 10;
            var height = init.height || 100;
            var width = init.width || 100;
            var speedms = init.speedms || 200;
            var $obj = init.$obj || $("body");
            var url = init.url;
            //

            $obj.css("position", "relative");

            //生成图片
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    if ((r == 0 && c == 0) || (r == 0 && c == 1) || (r == 1 && c == 0)
                        || (r == 0 && c == cols - 2) || (r == 0 && c == cols - 1) || (r == 1 && c == cols - 1)
                        || (r == rows - 1 && c == 0) || (r == rows - 1 && c == 1) || (r == rows - 2 && c == 0)
                        || (r == rows - 1 && c == cols - 1) || (r == rows - 1 && c == cols - 2)
                        || (r == rows - 2 && c == cols - 1)) {
                        continue;
                    }
                    var $tempdiv = $("<div></div>").css("background", "url('" + url + "')").css("transform", "scale(1)")
                        .css("transition", "transform " + speedms + "ms").css("width", width / cols + "px")
                        .css("height", height / rows + "px").css("backgroundSize", width + "px " + height + "px")
                        .css("backgroundPosition", (-Math.floor(width / cols) * c) + "px " + (-Math.floor(height / rows) * r) + "px");

                    var $templi = $("<li></li>").attr("class", "liClassInPictrue").css("width", width / cols + "px")
                        .css("height", height / rows + "px").css("left", Math.floor(width / cols) * c + "px")
                        .css("top", Math.floor(height / rows) * r + "px").css("transform", "rotate(0deg)")
                        .css("position", "absolute").css("background", "white").css("opacity", "1")
                        .css("transition", "transform " + speedms + "ms ease-out,opacity " + speedms + "ms ease-out");

                    $templi.append($tempdiv);
                    $obj.append($templi);
                }
            }

            //生成一组随机数
            var randomList = [];
            for (let j = 0; j < $(".liClassInPictrue").length; j++) {
                randomList.push(Math.random() * 40 - 20);
            }

            var flag = false;

            //事件
            $obj.on("click", (e) => {
                e = e || window.event;
                e.stopPropagation();
                if (flag == false) {
                    var $liclick = $(".liClassInPictrue");
                    for (let j = 0; j < $liclick.length; j++) {
                        var random = Math.random() * 40 - 20;
                        let lidiv = $liclick[j].children[0];
                        let r = Math.floor(j / cols);
                        let c = j - r * cols;
                        $liclick[j].style.transform = "scale(0.9) rotate(" + randomList[j] + "deg)" +
                            "translateX(" + (2 * c - 20) + "px)" +
                            "translateY(" + (2 * r - 20) + "px)";
                        lidiv.style.transform = "scale(0.9)";
                        $liclick[j].style.opacity = "0.8";
                    }
                    flag = true;
                } else {
                    $(".liClassInPictrue").css("transform", "rotate(0deg)").css("opacity", "1").children().css("transform", "scale(1)");
                    flag = false;
                }
            });
        }

    }
    Picture = new Pictrue();
})();
