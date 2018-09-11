import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}


const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

class RainDrop {
  
    constructor(x,y, velocity ,radius, color, c){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
        this.color = color;
        this.c = c;
        this.gravity = .1;
    }

    draw(){
        this.c.beginPath()
        this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        this.c.fillStyle = this.color
        this.c.fill()
        this.c.closePath()
    }

   randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    update(){
        this.draw();

        if(this.y + this.radius > innerHeight){

            this.x = utils.randomIntFromRange(0, innerWidth)
            this.y = utils.randomIntFromRange(-1000,0);
            this.velocity.y = utils.randomIntFromRange(5,15)
        }

        this.velocity.y += this.gravity;
        this.y+=this.velocity.y 
    }
};

function randomRainDrop(c) {

    let x = utils.randomIntFromRange(0, innerWidth)
    let y = utils.randomIntFromRange(-5000,0);
    let velocity = {
        x: 0,
        y: utils.randomIntFromRange(5,15)
    }
    let radius = utils.randomIntFromRange(1,3);
    let drop = new RainDrop(x,y,velocity,radius,'blue',c);

    return drop;
}

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Implementation
let rain
function init() {
    rain = []
    for (let i = 0; i < 1000; i++) {
        rain.push(randomRainDrop(c))
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    rain.forEach((drop,index) => {
        drop.update();
    });
    // console.log(rain)
}

init()
animate()
