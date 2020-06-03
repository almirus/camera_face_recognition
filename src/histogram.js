'use strict';

export function checkBright(id) {
    if (!id) return;
    const dark_threshold = 0.4;
    const light_threshold = 0.4
    let canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = document.getElementById(id);
    canvas.width = img.width;
    canvas.height = img.height;
    console.log(canvas.width, canvas.height);
    context.drawImage(img, 0, 0);
    const imgData = context.getImageData(0, 0, img.width, img.height).data;

    let chans = [[]],
        maxCount = 0, val = 0;
    let step = 1;
    step *= 4;

    for (let i = 0, n = imgData.length; i < n; i += step) {
        val = rgb2hsv(imgData[i], imgData[i + 1], imgData[i + 2]);

        val = [val[2]];
        for (let y = 0, m = val.length; y < m; y++) {
            if (val[y] in chans[y]) {
                chans[y][val[y]]++;
            } else {
                chans[y][val[y]] = 1;
            }
            if (chans[y][val[y]] > maxCount) {
                maxCount = chans[y][val[y]];
            }
        }
    }

    if (maxCount === 0) {
        return;
    }
    let vals = chans[0];
    let x, y = 0;
    let light = 0, dark = 0, avr = 0;
    for (let i = 0; i <= 255; i++) {
        if (!(i in vals)) {
            continue;
        }
        y = Math.round((vals[i] / maxCount) * 480);
        x = Math.round((i / 255) * 640);
        if (i < 30) dark += y;
        if (i > 210) light += y;
        avr += y;
    }
    console.log('dark= ', dark, ' ', dark / avr);
    console.log('light= ', light, ' ', light / avr);
    console.log('sum= ', avr);
    if (dark / avr > dark_threshold) {
        return 1
    }
    if (light / avr > light_threshold) {
        return 2
    }
    // This is gray
    function rgb2hsv(red, green, blue) {
        red /= 255;
        green /= 255;
        blue /= 255;

        let hue, sat,
            min = Math.min(red, green, blue),
            max = Math.max(red, green, blue),
            delta = max - min,
            value = max;

        if (delta === 0) {
            hue = sat = 0;
        } else {
            sat = delta / max;

            if (max === red) {
                hue = (green - blue) / delta;
            } else if (max === green) {
                hue = (blue - red) / delta + 2;
            } else if (max === blue) {
                hue = (red - green) / delta + 4;
            }

            hue /= 6;
            if (hue < 0) {
                hue += 1;
            }
        }

        return [Math.round(hue * 255), Math.round(sat * 255), Math.round(value * 255)];
    }
}