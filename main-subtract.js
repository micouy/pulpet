// In this version the transitions are very smooth.
// The colors in areas between points are not dirty
// at all. The downside (?) is that around each point
// the colors somewhat differ from the point's color
// (they are not as saturated with the picked color).

let points = [
    { x: 50, y: 50, color: [155, 93, 229] },
    { x: 100, y: 250, color: [241, 91, 181] },
    { x: 400, y: 100, color: [254, 228, 64] },
    { x: 50, y: 400, color: [0, 187, 249] },
    { x: 250, y: 250, color: [0, 245, 212] },
    { x: 250, y: 400, color: [0, 0, 0] },
    { x: 140, y: 30, color: [255, 255, 255] },
];

let dragging = false;
let picked = 0;

function setup() {
    createCanvas(500, 500);
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

    let logOnce = (ix, msg) => {
        if (ix == 250 * 500 * 4) {
            console.log(`speclog: ${msg}`);
        }
    };

    for (let x = 0; x < maxX; x++) {
        for (let y = 0; y < maxY; y++) {
            // clear distances and color
            let ix = 4 * d * (y * width + x);
            coeffs.splice(0);
            pixel[0] = 0;
            pixel[1] = 0;
            pixel[2] = 0;

            for (let point of points) {
                coeffs.push(dist(x, y, point.x * d, point.y * d));
            }

            let coeffsSum = coeffs.reduce((acc, val) => acc + val);

            for (let i = 0; i < coeffs.length; i++) {
                coeffs[i] = Math.pow((coeffsSum - coeffs[i]), 24);
            }

            let coeffsOppositeSum = coeffs.reduce((acc, val) => acc + val);

            for (let i = 0; i < points.length; i++) {
                pixel[0] += points[i].color[0] * (coeffs[i] / coeffsOppositeSum);
                pixel[1] += points[i].color[1] * (coeffs[i] / coeffsOppositeSum);
                pixel[2] += points[i].color[2] * (coeffs[i] / coeffsOppositeSum);
            }

            pixels[ix + 0] = pixel[0];
            pixels[ix + 1] = pixel[1];
            pixels[ix + 2] = pixel[2];
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
