export function moveTo(from, to, duration) {
    const movementArray = [];
    const xOffset = (to.x - from.x) / duration;
    const yOffset = (to.y - from.y) / duration;
    let xCurr = from.x;
    let yCurr = from.y;
    for (let i = 0; i < duration; i++) {
        movementArray.push([
             xCurr,
            yCurr
        ]);
        xCurr += xOffset;
        yCurr += yOffset;
    }
    return movementArray;
}
export function moveDynamicTo(from, to, duration, coef) {
    const movementArray = [];
    const part =2
    const firstPart = duration/part;
    const lastPart = duration - firstPart
    let xAverageOffset = (to.x - from.x) / (duration/(part*2));
    let yAverageOffset = (to.y - from.y) / (duration/(part*2));
    let xStartOffset = xAverageOffset * Math.pow(coef, firstPart)
    let yStartOffset = yAverageOffset * Math.pow(coef, firstPart)
    let xCurrOffset = xStartOffset
    let yCurrOffset = yStartOffset
    let xCurr = from.x;
    let yCurr = from.y;
    for (let i = 0; i < duration; i++) {
        movementArray.push([
             xCurr,
             yCurr
        ]);
        if(i<firstPart) {
            xCurrOffset/=coef
            yCurrOffset/=coef
        }
        if(i>lastPart) {
            xCurrOffset*=coef
            yCurrOffset*=coef
        }
        xCurr += xCurrOffset;
        yCurr += yCurrOffset;


    }

    return movementArray;
}
export function rotate(angle, duration) {
    const rotationArray = [];
    const angleOffset = angle / duration;
    let angleCurr = 0;
    for (let i = 0; i < duration; i++) {
        rotationArray.push({
            angle: angleCurr
        });
        angleCurr += angleOffset;
    }
    rotationArray[rotationArray.length-1].angle = angle
    return rotationArray;
}
