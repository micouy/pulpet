// In this version, the edges are sharper and the colors
// in the areas around points are more saturated.
// The downside is that the colors don't blend very
// well - the resulting color looks "dirty".

let points = [
    { x: 50, y: 50, color: [155, 93, 229] },
    { x: 100, y: 250, color: [241, 91, 181] },
    { x: 400, y: 100, color: [254, 228, 64] },
    { x: 250, y: 250, color: [0, 245, 212] },
    { x: 250, y: 400, color: [0, 0, 0] },
    { x: 140, y: 30, color: [255, 255, 255] },
];

let dragging = false;
let picked = 0;
let slider;

function setup() {
    createCanvas(500, 500);
    slider = createSlider(1, 5, 2, 0.2);
    slider.position(40, 540);
    slider.style('width', '100px');
    noLoop();
    redraw();
}


function draw() {
    background('white');

    loadPixels();
    let d = pixelDensity();
    let maxX = width * d;
    let maxY = height * d;
    let pixel = [0, 0, 0];
    let coeffs = [];
    let pow = slider.value();

    let logOnce = (ix, msg) => {
        if (ix == 250 * 500 * 4) {
            console.log(`speclog: ${msg}`);
        }
    };

    for (let x = 0; x < maxX; x++) {
        for (let y = 0; y < maxY; y++) {
            // clear distances and color
            let ix = 4 * d * (y * width + x);
            let coeffsSum = 0;
            pixel[0] = 0;
            pixel[1] = 0;
            pixel[2] = 0;

            for (let point of points) {
                let distance = dist(x, y, point.x * d, point.y * d);
                let coeff = 1 / Math.pow(distance, pow);
                coeffsSum += coeff;
                pixel[0] += point.color[0] * coeff;
                pixel[1] += point.color[1] * coeff;
                pixel[2] += point.color[2] * coeff;
            }

            pixels[ix + 0] = pixel[0] / coeffsSum;
            pixels[ix + 1] = pixel[1] / coeffsSum;
            pixels[ix + 2] = pixel[2] / coeffsSum;
        }
    }

    updatePixels();

    for (let point of points) {
        noStroke();
        fill('white');
        circle(point.x, point.y, 30);
        fill(point.color);
        circle(point.x, point.y, 20);

        let ix = 4 * d * (point.y * width + point.x);

        pixels
    }
}

function mousePressed() {
    if (!dragging) {
        let d = 30;

        for (let i = 0; i < points.length; i++) {
            let point = points[i];
            let goowno = dist(mouseX, mouseY, point.x, point.y);

            if (goowno < d) {
                dragging = true;
                picked = i;
            }
        }
    }

    if (dragging) {
        points[picked].x = mouseX;
        points[picked].y = mouseY;
    } else {
        let [r, g, b, ...rest] = get(mouseX, mouseY);
        console.log(`Picked: ${r}, ${g}, ${b}`);
        console.log('%c   ', `background: rgb(${r}, ${g}, ${b});`);
    }

    redraw();
}

function mouseDragged() {
    if (dragging) {
        points[picked].x = mouseX;
        points[picked].y = mouseY;
    }

    redraw();
}

function mouseReleased() {
    dragging = false;
}

function doubleClicked() {
    let [r, g, b, ...rest] = get(mouseX, mouseY);
    points.push({
        x: mouseX,
        y: mouseY,
        color: [r, g, b]
    });
    redraw();
}
