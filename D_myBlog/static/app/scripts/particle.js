

(function () {

    var width = this.innerWidth;
    var height = this.innerHeight;
    var cursor = { x: width / 2, y: height / 2 };
    var particles = [];

    function addParticle(x, y) {
        var particle = new Particle();
        particle.init(x, y);
        particles.push(particle);
    }

    function updateParticles() {

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            if (particles[i].lifeSpan < 0) {
                particles[i].$element.remove();
                particles.splice(i, 1);
            }
        }

    }

    class Particle {

        lifeSpan = 200; //ms
        initialStyles = {
            "position": "absolute",
            "top": "0", //±ØÐë¼Ó
            "display": "block",
            "pointerEvents": "none",
            "z-index": "0",
            "fontSize": "6px",
            "will-change": "transform",
            "height": "2px",
            "width": "2px",
            "background": 'url("/static/app/imgs/bgd.jpg") no-repeat',
            "background-size": "100% 100%",
            "border-radius": "1px",
        };

        init = (x, y) => {

            this.velocity = {
                x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                y: 1
            };

            this.position = { x: x - 10, y: y - 20 };

            this.$element = $('<span></span>').css(this.initialStyles);

            this.update();

            $("body").append(this.$element);
        };

        update = () => {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.lifeSpan--;
            this.$element.css("transform", "translate3d(" + this.position.x + "px," + this.position.y
                + "px,0) scale(" + (this.lifeSpan / 120) + ")");
        }

    }

    $(".img1_top").on('mousemove', (e) => {
        cursor.x = e.offsetX;
        cursor.y = e.offsetY;
        addParticle(cursor.x, cursor.y);
    });

    //ÒÆ¶¯¶Ëbegin
    $(".img1_top").on('touchmove', (e) => {
        if (e.touches.length > 0) {
            for (let i = 0; i < e.touches.length; i++) {
                addParticle(e.touches[i].offsetX, e.touches[i].offsetY);
            }
        }
    });

    $(".img1_top").on('touchstart', (e) => {
        if (e.touches.length > 0) {
            for (let i = 0; i < e.touches.length; i++) {
                addParticle(e.touches[i].offsetX, e.touches[i].offsetY);
            }
        }
    });
    //end

    $(this).on('resize', () => {
        width = this.innerWidth;
        height = this.innerHeight;
    });

    (function loop() {
        requestAnimationFrame(loop);
        updateParticles();
    }());

})();