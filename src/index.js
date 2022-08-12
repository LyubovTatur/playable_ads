import "./styles.css";
import * as move2d from "./components/Obj2dMovementArrayCreators";
import * as move3d from "./components/Obj3dMovementArrayCreators";
import IndexedMap from "./components/IndexedMap";

document.getElementById("app").innerHTML = `
<div class="container center col">
  <div class="row mx-auto d-block">
    <canvas class="card d-block mx-auto" width="1000"
    height="600"
    
    id="canvas"/>
  </div>
  <div class="row  mx-auto">
      <button class="m-2 col btn btn-info" id="start2d">2d movement (1 moveTo, 2 rotate, 3 moveDynamicTo)</button>
      <button class="m-2 col btn btn-info" id="start3d">show 3d movement and rotation arrays in console log</button>
      <button class="m-2 col btn btn-info" id="indexedMap">show IndexedMap in console log</button>
  </div>
    
</div>
`;
document.getElementById('start2d').addEventListener('click', startAnimation)
document.getElementById('start3d').addEventListener('click', show3dMovementArray)
document.getElementById('indexedMap').addEventListener('click', showIndexedMap)

const width = 100
const height = 50

let animationIndex = -1
const animationArray = [
    () => {
        drawingProcess = setInterval(movement, movementArrayLength);
    },
    () => {
        rotationProcess = setInterval(RectRotation, rotationArrayLength);
    },
    () => {
        dynamicDrawingProcess = setInterval(dynamicMovement, dynamicMovementArrayLength);
    },
]

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let drawingProcess
let rotationProcess
let dynamicDrawingProcess

let movementArray = move2d.moveTo({x: 700, y: 400}, {x: 10, y: 30}, 40)
const movementArrayLength = movementArray.length
let movementIndex = 0;

const rotationArray = move2d.rotate(180, 40)
const rotationArrayLength = rotationArray.length
let rotationIndex = 0;

const dynamicMovementArray = move2d.moveDynamicTo({x: 10, y: 30}, {x: 700, y: 400}, 40, 0.80)
const dynamicMovementArrayLength = dynamicMovementArray.length
let dynamicMovementIndex = 0;


function startAnimation() {
    animationIndex++;
    if (animationIndex === animationArray.length) {
        animationIndex = 0
        setIndexesToZero()
    }
    animationArray[animationIndex]()


}

function setIndexesToZero() {
    movementIndex = 0;
    rotationIndex = 0;
    dynamicMovementIndex = 0;
}

function drawRect(x, y, angle = 0) {
    ctx.fillStyle = "#0095DD";
    ctx.save();
    ctx.beginPath();

    if (angle) {
        ctx.translate(x + width / 2, y + height / 2);
        ctx.rotate(angle * Math.PI / 180);
        ctx.rect(-width / 2, -height / 2, width, height);
    } else {
        ctx.rect(x, y, width, height);
    }

    ctx.fill();
    ctx.restore();
    ctx.closePath();
}

function RectRotation() {
    const [x, y] = movementArray[movementIndex - 1]
    const {angle} = rotationArray[rotationIndex]
    clearCanvas()
    drawRect(x, y, angle)
    rotationIndex++
    isProcessShouldBeStopped(rotationIndex, rotationArrayLength, rotationProcess)

}

function movement() {
    clearCanvas()
    const [x, y] = movementArray[movementIndex]
    drawRect(x, y);
    movementIndex++
    isProcessShouldBeStopped(movementIndex, movementArrayLength, drawingProcess)
}

function dynamicMovement() {
    clearCanvas()
    const [x, y] = dynamicMovementArray[dynamicMovementIndex]
    drawRect(x, y);
    dynamicMovementIndex++
    isProcessShouldBeStopped(dynamicMovementIndex, dynamicMovementArrayLength, dynamicDrawingProcess)
}

function isProcessShouldBeStopped(index, duration, proccess) {
    if (index === duration) {
        clearInterval(proccess)

    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

}

function show3dMovementArray() {
    console.log('moveTo', move3d.moveTo({x: 10, y: 20, z: 40}, {x: 100, y: 700, z: 50}, 20))
    console.log('moveDynamicTo', move3d.moveDynamicTo({x: 10, y: 20, z: 40}, {x: 100, y: 700, z: 50}, 20, 0.7))
    console.log('rotate', move3d.rotate(45, 10, 180, 10))
}

function showIndexedMap() {
    const myMap = new IndexedMap()
    myMap.set('mlem', 'blep')
    myMap.set('kotik', 'cat')
    console.log('myMap', myMap)
    console.log('myMap.has(\'mlem\')', myMap.has('mlem'))
    console.log('myMap.has(\'kk\')', myMap.has('kk'))
    console.log('myMap.hasIndex(1)', myMap.hasIndex(1))
    console.log('myMap.hasIndex(3)', myMap.hasIndex(3))
    console.log('myMap.get(\'mlem\')', myMap.get('mlem'))
    console.log('myMap.getByIndex(1)', myMap.getByIndex(1))
    console.log('myMap.forEach(elem=>console.log(elem[0]))')
    myMap.forEach(elem => console.log(elem[0]))
    console.log('myMap.union()', myMap.union([['doggo', 'sobaka'], ['mlem', 'lion']], [['krol', 'blep'], ['bird', 'blep']]))
    console.log('myMap.uniq()', myMap.uniq())
    console.log('myMap.uniqKeys()', myMap.uniqKeys())
    console.log('myMap.toString()', myMap.toString())
    console.log('myMap.sortIndexes()', myMap.sortIndexes())
    console.log('myMap.toString()', myMap.toString())
    console.log('myMap.sort()', myMap.sort())
    console.log('myMap.toString()', myMap.toString())
    console.log('myMap.setTo(1,[\'settedKey\',\'value\']', myMap.setTo(1, ['settedKey', 'value']))
    console.log('myMap.removeAt(2,3)', myMap.removeAt(2, 3))
}

