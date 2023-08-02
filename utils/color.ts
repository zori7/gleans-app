export const getEmojiAverageColor = (emoji: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 100;
    const context = canvas.getContext('2d');

    context!.fillText(emoji, 50, 50);

    const imageData = context!.getImageData(0, 0, canvas.width, canvas.height);

    let red = 0, green = 0, blue = 0, alpha = 0, colorCount = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const a = imageData.data[i + 3];

        if (a > 200) {
            red += r;
            green += g;
            blue += b;
            alpha += a;
            colorCount++;
        }
    }

    return colorCount === 0 ? null : {
        red: Math.round(red / colorCount),
        green: Math.round(green / colorCount),
        blue: Math.round(blue / colorCount),
        alpha: Math.round(alpha / colorCount)
    };
}
