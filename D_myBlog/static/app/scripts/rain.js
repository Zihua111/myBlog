
function Rain() {
    // ����canvasԪ��
    var canvasEl = document.createElement('canvas');
    canvasEl.setAttribute("id", "canvas_rain");
    canvasEl.style.position = "fixed";
    canvasEl.style.background = "rgba(0,0,0,0)";
    canvasEl.style.height = "100%";
    canvasEl.style.width = "100%";
    canvasEl.style.left = "0";
    canvasEl.style.top = "0";
    canvasEl.style.pointerEvents = "none";
    document.body.appendChild(canvasEl);

    var ctx = canvasEl.getContext('2d');
    // canvas������ ������ɫ
    var backgroundColor = "#000";

    // canvas�����Ŀ� ���� ��������Ŀ�
    canvasEl.width = canvasEl.clientWidth;
    // canvas�����ĸ� ���� ��������ĸ�
    canvasEl.height = canvasEl.clientHeight;

    // ����Сˮ�������
    // ��������ɢ��Сˮ�飬Сˮ�����һЩԲ��
    var dropList = [];

    // ����
    // ��������ɢ��Сˮ�飬Сˮ������������½�����Ҫ����Ϊ gravity ���������Ե��
    var gravity = 0.5;

    // ������ε�����
    // ÿ����� ���� ����һ���� 
    var linelist = [];

    // ������������ 
    // mousePos[0] ����x���ֵ��mousePos[1] ����y���ֵ 
    var mousePos = [0, 0];

    // ������꣬ mouseDis ��С�����ڵ���λ���ʧ���γ�ɢ��Ч��
    // ��mousePosΪԲ�ģ�mouseDisΪ�뾶�������Χ�ڵ���� ����ɢ�����γ����Сˮ��
    var mouseDis = 35;

    // ����һ�ζ�������lineNum ����Σ�lineNum ֵԽ�������Խ�ܼ�
    var lineNum = 3;

    // ������귽�� �仯���귽��� �ٶ�
    // ����ƶ�������ķ��� �������ı䣬��Ҫ��speedx �������
    var speedx = 0;

    // maxspeedx Ϊ speedx ����ȡ�����ֵ
    // �� speedx = maxspeedxʱ�����귽�� �� ������ƶ����������ı�
    var maxspeedx = 0;

    // ҳ���С�����仯ʱ������canvas������С
    window.onresize = function () {
        canvasEl.width = canvasEl.clientWidth;
        canvasEl.height = canvasEl.clientHeight;
    }

    //�ƶ���괥���¼�
    window.onmousemove = function (e) {
        //  ����mousePos ���� �������
        //  e.clientX Ϊ���� ��������ڿ������� ��ߵľ���
        //  e.clientY Ϊ���� ��������ڿ������� �ϱߵľ���
        mousePos[0] = e.clientX;
        mousePos[1] = e.clientY;

        // ͨ�����λ�ã����� maxspeedx��ֵ��ȡֵ��Χ�� -1 �� 1
        // maxspeedx��ֵ����ϵ�� 
        // 1����εķ���
        // 2���������ķ���
        // 3��������䷽�� ���� ����ƶ�����仯���ٶ�
        // 4��Сˮ����ƶ�����
        // ֵԽ�ӽ�1����ʾ����Խ����
        // ֵԽ�ӽ�-1����ʾ����Խ����
        maxspeedx = (e.clientX - canvasEl.clientWidth / 2) / (canvasEl.clientWidth / 2);
    }

    // ���ݲ���������һ��rgb��ɫ�����ڸ����������ɫ
    function getRgba(r, g, b, a) {
        return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    }

    // �� һ���꣨һ���ߣ�
    function createLine(e) {
        // ������� ��εĳ���
        var temp = 0.25 * (50 + Math.random() * 100);
        // һ�� line ���󣬴���һ�����
        var line = {
            // ��������ٶ�  
            speed: 5.5 * (Math.random() * 6 + 3),
            // �ж��Ƿ�ɾ����ֵΪtrue��ɾ��
            die: false,
            // ���x���� 
            posx: e,
            // ���y���� 
            posy: -50,
            // ��εĳ���
            h: temp,
            // ��ε���ɫ
            color: getRgba(Math.floor(temp * 255 / 75), Math.floor(temp * 255 / 75), Math.floor(temp * 255 / 75), 0.5)
        };
        // �Ѵ����õ�line����Σ�������ӵ�������ε�����
        linelist.push(line);
    }

    // ��һ��Сˮ�飨���ɢ�����Сˮ�����һ������Բ����
    function createDrop(x, y) {
        // һ�� drop ���󣬴���һ��Բ��
        var drop = {
            // �ж��Ƿ�ɾ����ֵΪtrue��ɾ��
            die: false,
            // Բ��Բ�ĵ�x���� 
            posx: x,
            // Բ��Բ�ĵ�y���� 
            posy: y,
            // vx ��ʾ x���ֵ �仯���ٶ�
            vx: (Math.random() - 0.5) * 8,
            // vy ��ʾ y���ֵ �仯���ٶ� ȡֵ��Χ��-3 �� -9
            vy: Math.random() * (-6) - 3,
            // Բ���İ뾶
            radius: Math.random() * 1.5 + 1
        };
        return drop;
    }

    // ��һ��������Сˮ��
    function madedrops(x, y) {
        // �������һ���� maxi
        // maxi ����Ҫ��Сˮ�������
        var maxi = Math.floor(Math.random() * 5 + 5);
        for (var i = 0; i < maxi; i++) {
            dropList.push(createDrop(x, y));
        }
    }

    // ��ʼ����update���������¶���
    window.requestAnimationFrame(update);
    // ���¶���
    function update() {
        // �������Сˮ�������������
        if (dropList.length > 0) {
            // ��������Сˮ�������
            dropList.forEach(function (e) {
                //����e.vx��vx��ʾx����仯���ٶ�
                // (speedx)/2 ��Ϊ�ˣ���Сˮ�� ��x����ƶ������һ�㣬����ȥ����ʵ��
                // Ҳʹ Сˮ����ƶ����� �� ��η���������䷽������ƶ�������ͬ
                e.vx = e.vx + (speedx / 2);
                e.posx = e.posx + e.vx;

                //����e.vy��vy��ʾy����仯���ٶ�
                // e.vy�ķ�Χ��-3 �� -9������ʱe.posy��y���꣩һ������ֵ������ e.posy��ֵ���ȼ�С������
                // Ҳ����ʵ�� ���ɢ��Сˮ�飬Сˮ������������½���Ч��
                e.vy = e.vy + gravity;
                e.posy = e.posy + e.vy;

                // ��� Сˮ��y���� ���� ��������ĸ߶ȣ�����die����Ϊtrue
                // Сˮ������������������ɾ����
                if (e.posy > canvasEl.clientHeight) {
                    e.die = true;
                }
            });
        }

        // ɾ�� die����Ϊture �������Ա
        // �����������Сˮ��ɾ����
        for (var i = dropList.length - 1; i >= 0; i--) {
            if (dropList[i].die) {
                dropList.splice(i, 1);
            }
        }

        // �������귽��任���ٶȣ�ȡֵ��Χ�� -1 �� 1
        // �� speedx = maxspeedxʱ�����귽�� �� ������ƶ����������ı�
        speedx = speedx + (maxspeedx - speedx) / 50;

        // ����lineNum��ֵ����һ���������
        for (var i = 0; i < lineNum; i++) {
            // ����createLine ���������������x����
            createLine(Math.random() * 2 * canvasEl.width - (0.5 * canvasEl.width));
        }

        // ���ý����ߣ�Ҳ�������ɢ�� �γ����Сˮ���λ��
        var endLine = canvasEl.clientHeight - Math.random() * canvasEl.clientHeight / 5;

        // ����������ε�����
        linelist.forEach(function (e) {

            // ���ù��ɶ��� ȷ��һ����Χ���������Χ����λ�ɢ���γ�Сˮ��
            // e.posx + speedx * e.h �����x����
            // e.posy + e.h �����y����
            var dis = Math.sqrt(((e.posx + speedx * e.h) - mousePos[0]) * ((e.posx + speedx * e.h) - mousePos[0]) + (e.posy + e.h - mousePos[1]) * (e.posy + e.h - mousePos[1]));

            // �����mouseDis�����ڣ���ɾ����Σ���һЩСˮ�飨Բ����
            // ʵ�����������Σ����ɢ��Сˮ���Ч��
            if (dis < mouseDis) {
                // ɾ�� ���
                e.die = true;
                // ��һЩСˮ�飨Բ����
                madedrops(e.posx + speedx * e.h, e.posy + e.h);
            }

            // �����γ��� �����ߣ�ɾ����Σ���һЩСˮ�飨Բ����
            if ((e.posy + e.h) > endLine) {
                e.die = true;
                madedrops(e.posx + speedx * e.h, e.posy + e.h);
            }

            // ��� ��� y���� ���� ��������ĸ߶ȣ�����die����Ϊtrue
            // ��� ��� �������������ɾ����
            if (e.posy >= canvasEl.clientHeight) {
                e.die = true;
            } else {
                // ������ ��� y�����ֵ
                e.posy = e.posy + e.speed;

                // �仯��� x����
                // * speedx ����������� ���� ����
                // ʹ ������䷽�� �� ����ƶ�������ͬ
                e.posx = e.posx + e.speed * speedx;
            }
        });

        // ɾ�� die����Ϊture �������Ա
        // ��������ڵģ����������ߵģ���������������ɾ����
        for (var i = linelist.length - 1; i >= 0; i--) {
            if (linelist[i].die) {
                linelist.splice(i, 1);
            }
        }

        // ��Ⱦ
        render();
        // �ݹ���� update��ʵ�ֶ���Ч��
        window.requestAnimationFrame(update);
    }

    // ��Ⱦ
    function render() {
        // ��һ���Ϳ�������һ����ľ��Σ���ʹ��͸��clearRect
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
        // �����
        ctx.lineWidth = 1;
        linelist.forEach(function (line) {
            ctx.strokeStyle = line.color;
            ctx.beginPath();
            ctx.moveTo(line.posx, line.posy);

            // * speedx ����������η���
            //ʹ��η��������ƶ�������ͬ
            ctx.lineTo(line.posx + line.h * speedx, line.posy + line.h);
            ctx.stroke();
        });

        //�����ɢ���γ�Сˮ��
        ctx.lineWidth = 0.2;
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        dropList.forEach(function (e) {
            ctx.beginPath();
            ctx.arc(e.posx, e.posy, e.radius, Math.random() * Math.PI * 2, 1 * Math.PI);
            ctx.stroke();
        });
    }
}

