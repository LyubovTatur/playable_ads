export function moveTo(from, to, duration) {
    const movementArray = [];
    const xOffset = (to.x - from.x) / duration;
    const yOffset = (to.y - from.y) / duration;
    const zOffset = (to.z - from.z) / duration;
    let xCurr = from.x;
    let yCurr = from.y;
    let zCurr = from.z;
    for (let i = 0; i < duration; i++) {
        movementArray.push([
            xCurr,
            yCurr,
            zCurr
        ]);
        xCurr += xOffset;
        yCurr += yOffset;
        zCurr += zOffset;
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
    let zAverageOffset = (to.z - from.z) / (duration/(part*2));
    let xStartOffset = xAverageOffset * Math.pow(coef, firstPart)
    let yStartOffset = yAverageOffset * Math.pow(coef, firstPart)
    let zStartOffset = zAverageOffset * Math.pow(coef, firstPart)
    let xCurrOffset = xStartOffset
    let yCurrOffset = yStartOffset
    let zCurrOffset = zStartOffset
    let xCurr = from.x;
    let yCurr = from.y;
    let zCurr = from.z;
    for (let i = 0; i < duration; i++) {
        movementArray.push([
            xCurr,
            yCurr,
            zCurr
        ]);
        if(i<firstPart) {
            xCurrOffset/=coef
            yCurrOffset/=coef
            zCurrOffset/=coef
        }
        if(i>lastPart) {
            xCurrOffset*=coef
            yCurrOffset*=coef
            zCurrOffset*=coef
        }
        xCurr += xCurrOffset;
        yCurr += yCurrOffset;
        zCurr += zCurrOffset;


    }

    return movementArray;
}
export function rotate(xAngle =0,yAngle=0,zAngle=0, duration) {
    const rotationArray = [];
    const xAngleOffset = xAngle / duration;
    const yAngleOffset = yAngle / duration;
    const zAngleOffset = zAngle / duration;
    let xAngleOCurr = 0;
    let yAngleOCurr = 0;
    let zAngleOCurr = 0;
    for (let i = 0; i < duration; i++) {
        rotationArray.push({
            xAngle:xAngleOCurr,
            yAngle:yAngleOCurr,
            zAngle:zAngleOCurr,
        });
        xAngleOCurr+=xAngleOffset
        yAngleOCurr+=yAngleOffset
        zAngleOCurr+=zAngleOffset
    }
    rotationArray[rotationArray.length-1].xAngle = xAngle
    rotationArray[rotationArray.length-1].yAngle = yAngle
    rotationArray[rotationArray.length-1].zAngle = zAngle
    return rotationArray;
}
