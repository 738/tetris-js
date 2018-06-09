var wid = 10;
var hei = 18;
var vel = 500;
var scr = 0;
var nowps = [];
var st = 0;
var rs = 0;
var xM = 0;
var yM = 0;
var to;

var oa = new Array();
for (i = 0; i < 7; i++)
    oa[i] = 'on' + (i + 1);
shape = "00,01,02,03|00,10,20,30$01,10,11,12|00,10,11,20|00,01,02,11|01,10,11,21$00,01,10,11$00,01,11,12|01,10,11,20$01,02,10,11|00,10,11,21$00,01,02,12|01,11,20,21|00,10,11,12|00,01,10,20$00,01,02,10|00,01,11,21|02,10,11,12|00,10,20,21";
shapeY = "0,0,0,0|3$1,1,1|2,1|0,1,0|1,2$1,1$0,1,1|2,1$1,1,0|1,2$0,0,1|2,2|1,1,1|2,0$1,0,0|0,2|1,1,1|2,2";

var row = new Array(hei);
var cell = new Array(hei);
var TT = document.getElementById('TT');
for (var i = 0; i < hei; i++)
    cell[i] = new Array(wid);
for (var i = 0; i < hei; i++) {
    row[i] = TT.insertRow(-1);
    for (var j = 0; j < wid; j++) {
        cell[i][j] = row[i].insertCell(j);
        cell[i][j].setAttribute('id', 'td' + i + '_' + j);
    }
}

var ta = new Array(hei);
for (i = 0; i < hei; i++)
    ta[i] = new Array(wid);
for (i = 0; i < hei; i++)
    for (j = 0; j < wid; j++)
        ta[i][j] = document.getElementById('td' + i + '_' + j);

function mkBlk() {
    ps = [0, Math.floor(wid / 2 - 1)];
    nowps = ps;
    st = Math.floor(Math.random() * 7);
    rs = 0;
    yM = parseInt(getMx(st, rs)[0]);
    xM = parseInt(getMx(st, rs)[1]);
    drw(nowps, st, rs);
    to = setTimeout(function () { dwn(); }, vel);
}
mkBlk();

function rtBlk() {
    var flg = 0;
    ln = shp(st, rs).length;
    st_ln = shape.split('$')[st].split('|').length;
    tm_rs = rs;
    if (tm_rs < st_ln - 1)
        tm_rs++;
    else if (tm_rs == st_ln - 1)
        tm_rs = 0;
    for (i = 0; i < ln; i++) {
        yS = shp(st, tm_rs)[i].substring(0, 1);
        xS = shp(st, tm_rs)[i].substring(1, 2);
        y = nowps[0] + parseInt(yS, 10);
        x = nowps[1] + parseInt(xS, 10);
        if (ta[y][x].className == oa[0] || ta[y][x].className == oa[1] || ta[y][x].className == oa[2] || ta[y][x].className == oa[3] || ta[y][x].className == oa[4] || ta[y][x].className == oa[5] || ta[y][x].className == oa[6] || x > wid - 1 || y > hei - 1) {
            flg = 1;
            break;
        }
    }
    if (flg == 0) {
        ers(nowps, st, rs);
        if (rs < st_ln - 1)
            rs++;
        else if (rs == st_ln - 1)
            rs = 0;
        drw(nowps, st, rs);
        yM = parseInt(getMx(st, rs)[0]);
        xM = parseInt(getMx(st, rs)[1]);
    }
}

function RBlk() {
    if (nowps[1] + xM < wid - 1) {
        var flg = 0;
        ln = shp(st, rs).length;
        for (i = 0; i < ln; i++) {
            yS = shp(st, rs)[i].substring(0, 1);
            xS = shp(st, rs)[i].substring(1, 2);
            y = nowps[0] + parseInt(yS, 10);
            x = nowps[1] + parseInt(xS, 10);
            x += 1;
            if (ta[y][x].className == oa[0] || ta[y][x].className == oa[1] || ta[y][x].className == oa[2] || ta[y][x].className == oa[3] || ta[y][x].className == oa[4] || ta[y][x].className == oa[5] || ta[y][x].className == oa[6]) {
                flg = 1;
                break;
            }
        }
        if (flg == 0) {
            ers(nowps, st, rs);
            nowps[1] += 1;
            drw(nowps, st, rs);
        }
    }
}

function LBlk() {
    if (nowps[1] > 0) {
        var flg = 0;
        ln = shp(st, rs).length;
        for (i = 0; i < ln; i++) {
            yS = shp(st, rs)[i].substring(0, 1);
            xS = shp(st, rs)[i].substring(1, 2);
            y = nowps[0] + parseInt(yS, 10);
            x = nowps[1] + parseInt(xS, 10);
            x -= 1;
            if (ta[y][x].className == oa[0] || ta[y][x].className == oa[1] || ta[y][x].className == oa[2] || ta[y][x].className == oa[3] || ta[y][x].className == oa[4] || ta[y][x].className == oa[5] || ta[y][x].className == oa[6]) {
                flg = 1;
                break;
            }
        }
        if (flg == 0) {
            ers(nowps, st, rs);
            nowps[1] -= 1;
            drw(nowps, st, rs);
        }
    }
}

var t;
function dwn() {
    t = setTimeout(function () { dwn(); }, vel);
    if (nowps[0] + yM <= hei - 1) {
        var flg = 0;
        ln = shp(st, rs).length;
        for (i = 0; i < ln; i++) {
            yS = shp(st, rs)[i].substring(0, 1);
            xS = shp(st, rs)[i].substring(1, 2);
            y = nowps[0] + parseInt(yS, 10);
            x = nowps[1] + parseInt(xS, 10);
            y += 1;
            if (nowps[0] + yM == hei - 1) {
                flg = 1;
                setOn(nowps, st, rs);
                clearTimeout(t);
                clearTimeout(to);
                chkf();
                mkBlk();
                break;
            }
            if (ta[y][x].className == oa[0] || ta[y][x].className == oa[1] || ta[y][x].className == oa[2] || ta[y][x].className == oa[3] || ta[y][x].className == oa[4] || ta[y][x].className == oa[5] || ta[y][x].className == oa[6]) {
                flg = 1;
                setOn(nowps, st, rs);
                clearTimeout(t);
                clearTimeout(to);
                chkf();
                mkBlk();
                break;
            }
        }
        if (flg == 0) {
            ers(nowps, st, rs);
            nowps[0]++;
            drw(nowps, st, rs);
        }
    }
    for (i = 0; i < wid; i++) {
        if (ta[0][i].className == oa[0] || ta[0][i].className == oa[1] || ta[0][i].className == oa[2] || ta[0][i].className == oa[3] || ta[0][i].className == oa[4] || ta[0][i].className == oa[5] || ta[0][i].className == oa[6]) {
            clearTimeout(to);
            alert('score: ' + scr);
            break;
        }
    }
}

function dwnQk() {
    A = hei - 1;
    var flg = 0;
    ln = shapeY.split('$')[st].split('|')[rs].split(',').length;
    for (i = 0; i < ln; i++) {
        yS = shapeY.split('$')[st].split('|')[rs].split(',')[i];
        y = nowps[0] + parseInt(yS, 10);
        x = nowps[1] + i;
        for (j = 0; j < hei - nowps[0] - yM; j++) {
            y += 1;
            if (nowps[0] + yM + j == hei - 1) {
                flg = 1;
                if (j < A)
                    A = j;
                break;
            }
            if (ta[y][x].className == oa[0] || ta[y][x].className == oa[1] || ta[y][x].className == oa[2] || ta[y][x].className == oa[3] || ta[y][x].className == oa[4] || ta[y][x].className == oa[5] || ta[y][x].className == oa[6]) {
                flg = 1;
                if (j < A)
                    A = j;
                break;
            }
        }
    }
    if (flg == 1) {
        ers(nowps, st, rs);
        nowps[0] += A;
        drw(nowps, st, rs);
    }
}

function drw(nowps, st, rs) {
    na = new Array();
    for (i = 0; i < 7; i++)
        na[i] = 'now' + (i + 1);
    ln = shp(st, rs).length;
    for (i = 0; i < ln; i++) {
        yS = shp(st, rs)[i].substring(0, 1);
        xS = shp(st, rs)[i].substring(1, 2);
        y = nowps[0] + parseInt(yS, 10);
        x = nowps[1] + parseInt(xS, 10);
        ta[y][x].className = na[st];
    }
}

function ers(nowps, st, rs) {
    ln = shp(st, rs).length;
    for (i = 0; i < ln; i++) {
        yS = shp(st, rs)[i].substring(0, 1);
        xS = shp(st, rs)[i].substring(1, 2);
        y = nowps[0] + parseInt(yS, 10);
        x = nowps[1] + parseInt(xS, 10);
        ta[y][x].className = '';
    }
}

function setOn(nowps, st, rs) {
    ln = shp(st, rs).length;
    for (i = 0; i < ln; i++) {
        yS = shp(st, rs)[i].substring(0, 1);
        xS = shp(st, rs)[i].substring(1, 2);
        y = nowps[0] + parseInt(yS, 10);
        x = nowps[1] + parseInt(xS, 10);
        ta[y][x].className = oa[st];
    }
}

function getMx() {
    yx = [];
    ar = [];
    mx = 0;
    ln = shp(st, rs).length;
    for (i = 0; i < ln; i++)
        ar[i] = shp(st, rs)[i].substring(0, 1);
    for (i = 0; i < ln; i++)
        mx = max(ar);
    yx[0] = mx;
    mx = 0;
    for (i = 0; i < ln; i++)
        ar[i] = shp(st, rs)[i].substring(1, 2);
    for (i = 0; i < ln; i++)
        mx = max(ar);
    yx[1] = mx;
    return yx;
}

function max(arr) {
    M = 0;
    for (i = 0; i < arr.length; i++)
        if (arr[i] > M)
            M = arr[i];
    return M;
}

function shp(s, r) {
    return shape.split('$')[s].split('|')[r].split(',');
}

function chkf() {
    bn = 0;
    for (i = nowps[0]; i <= nowps[0] + yM; i++) {
        isOn = 0;
        for (j = 0; j < wid; j++) {
            if (ta[i][j].className == oa[0] || ta[i][j].className == oa[1] || ta[i][j].className == oa[2] || ta[i][j].className == oa[3] || ta[i][j].className == oa[4] || ta[i][j].className == oa[5] || ta[i][j].className == oa[6])
                isOn++;
        }
        if (isOn == wid) {
            bn++;
            for (j = 0; j < wid; j++)
                ta[i][j].className = '';
            for (a = i - 1; a >= 0; a -= 1) {
                for (b = 0; b < wid; b++) {
                    for (c = 0; c < 7; c++) {
                        if (ta[a][b].className == oa[c]) {
                            ta[a][b].className = '';
                            ta[a + 1][b].className = oa[c];
                            break;
                        }
                    }
                }
            }
        }
    }
    if (bn == 1)
        scr += 10;
    else if (bn == 2)
        scr += 50;
    else if (bn == 3)
        scr += 100;
    else if (bn == 4)
        scr += 200;

    if (scr < 2000)
        vel = 500;
    else if (scr < 4000)
        vel = 450;
    else if (scr < 7000)
        vel = 400;
    else if (scr < 10000)
        vel = 350;
    else if (scr < 15000)
        vel = 300;
    else if (scr < 30000)
        vel = 250;
    else if (scr < 50000)
        vel = 200;
    else if (scr < 100000)
        vel = 150;

    document.getElementById('scr').innerHTML = 'score: ' + scr;
}

document.onkeydown = function (e) {
    if (e.keyCode == 37)
        LBlk();
    else if (e.keyCode == 39)
        RBlk();
    else if (e.keyCode == 40)
        dwnQk();
    else if (e.keyCode == 38)
        rtBlk();
}

document.onkeydown = function () {
    if (event.keyCode == 37)
        LBlk();
    else if (event.keyCode == 39)
        RBlk();
    else if (event.keyCode == 40)
        dwnQk();
    else if (event.keyCode == 38)
        rtBlk();
}
