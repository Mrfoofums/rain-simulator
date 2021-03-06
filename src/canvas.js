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

function RainDrop(x,y, velocity ,radius, color) {
   
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
        this.color = color;
        this.gravity = .1;
    }

    RainDrop.prototype.draw = function (){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    RainDrop.prototype.update=function (){
        this.draw();

        if(this.y + this.radius > innerHeight){
            this.splatter();

            this.x = utils.randomIntFromRange(0, innerWidth)
            this.y = utils.randomIntFromRange(-1000,0);
            this.velocity.y = utils.randomIntFromRange(5,15)
        }else{
            this.velocity.y += this.gravity;
        }
        this.y+=this.velocity.y 

    }

    RainDrop.prototype.splatter = function (){
        // console.log('splatting')
        for(let i =0; i < 3; i ++){
            let velocity = {
                x: utils.randomIntFromRange(-5,5),
                y: utils.randomIntFromRange(-5,5)
            } ;
            let radius = 1;
            splatter.push(new Splatter(this.x, this.y,velocity, radius,'red'))
        }
    }

function  Splatter (x,y,velocity,radius,color) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.color = color;
        this.radius= radius;

        this.friction = 0.8;
        this.gravity = .1;
        this.ttl = 50;
        this.opacity = 1;
    }

    Splatter.prototype.draw=function(){
        c.save()
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = `rgba(255,255,255,${this.opacity})`
        c.shadowColor = '#E3EAEF'
        c.shadowBlur = 20
        c.fill()
        c.closePath()
        c.restore()
    }

    Splatter.prototype.update = function(){
        this.draw()

        if(this.y + this.radius + this.velocity.y > canvas.height || this.y - this.radius <= 0){
            this.velocity.y=-this.velocity.y * this.friction;
        }else{
            this.velocity.y +=this.gravity;
        }
        this.y+=this.velocity.y;
        this.x+=this.velocity.x;
        this.ttl-=1;
        this.opacity -= 1/this.ttl
    }

function Player(color){
    this.width = 100;
    this.height = 100
    this.moveVel = 20;
    this.x = innerWidth/2;
    this.y = innerHeight - this.height;
    this.velocity = {
        x:0,
        y:0
    }
    this.color = color;
    this.health = 100;
    this.friction = 0.99;

}    

Player.prototype.draw = function(){
    c.fillStyle = this.color
    c.fillRect(this.x,this.y, this.width, this.height)
    c.fill()
    c.closePath()
}

Player.prototype.update = function(){
    this.draw();

    this.x+=this.velocity.x;

    this.velocity.x *= this.friction
}



function randomRainDrop() {

    let x = utils.randomIntFromRange(0, innerWidth)
    let y = utils.randomIntFromRange(-5000,0);
    let velocity = {
        x: 0,
        y: utils.randomIntFromRange(5,15)
    }
    let radius = utils.randomIntFromRange(3,4);
    let drop = new RainDrop(x,y,velocity,radius,'red');

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

addEventListener('keydown', event=> {
    // console.log(event);
    if(event.key=='ArrowLeft'){
        player.velocity.x =-player.moveVel;
    }
    else if(event.key == 'ArrowRight'){
        player.velocity.x = player.moveVel
    }
    else if(event.key == 'ArrowDown'){
        player.velocity.x = 0
    }
})

// Implementation
let rain
let splatter
let player
function init() {
    splatter = []
    rain = []
    player = new Player('white')
    for (let i = 0; i < 50; i++) {
        rain.push(randomRainDrop(c))
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    rain.forEach(drop=> {
        drop.update();
    });

    splatter.forEach((splat,index)=>{
        //lol @ splat
        splat.update();
        if(splat.ttl == 0){
            splatter.splice(index,1)
        }
    })

    //player
    player.update();
    // console.log(splatter.length)
}

init()
animate()
