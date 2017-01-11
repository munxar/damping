const mouse = {x:0,y:0, down: false};
const pos = {x:0, y:0};
const canvas = document.getElementById('canvas');
const info = document.getElementById('info');
const ctx = canvas.getContext('2d');

const last = {x:0, y:0};
let a = 1;
let b = 1.0 - a;

const move = e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    if(mouse.down) {
        points.push({x:pos.x, y:pos.y});
    }
};

const down = e => {
    mouse.down = true;
};

const up = e => {
    mouse.down = false;
};

/*
    important part
    a + b = 1.0
 */
const setweight = (e) => {
    a = parseFloat(e.target.value);
    b = 1.0 - a;
    setInfo();
};

const setInfo = () => {
    info.innerText = `a: ${a}, b: ${b}`;
};

const update = () => {
    pos.x = b*last.x + a*mouse.x;
    pos.y = b*last.y + a*mouse.y;

    last.x = pos.x;
    last.y = pos.y;
};

const points = [];

const draw = () => {
    window.requestAnimationFrame(draw);
    const w = canvas.width;
    const h = canvas.height;
    const size = 4, offset = size / 2;

    update();

    ctx.fillStyle = '#000';
    ctx.fillRect(0,0,w,h);

    ctx.fillStyle = '#FFF';
    ctx.fillRect(pos.x-offset, pos.y-offset, size, size);

    points.forEach(p => ctx.fillRect(p.x-offset, p.y-offset, size, size));
};

window.addEventListener('mousemove', move);
window.addEventListener('mousedown', down);
window.addEventListener('mouseup', up);

setInfo();
draw();


