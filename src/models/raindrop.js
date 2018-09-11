import * as utils from '../utils';

export default class RainDrop {
  
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

            this.x = this.randomIntFromRange(0, innerWidth)
            this.y = this.randomIntFromRange(-1000,0);
            this.velocity.y = this.randomIntFromRange(5,15)
        }

        this.velocity.y += this.gravity;
        this.y+=this.velocity.y 
    }
}


