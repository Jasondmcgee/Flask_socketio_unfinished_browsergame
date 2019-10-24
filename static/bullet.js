class Bullet {
    constructor(placement, hero, tick){
        this.position = {x: hero.position.x + 10, y: hero.position.y + 10}
        this.rate = {x:10, y: 10}
        this.alive = true
        this.ticker = tick
        if (placement.x > 100 && placement.x < 270 || 
            placement.x < -100 && placement.x > -270){
            this.rate.x = 40
        }
        if (placement.y > 100 && placement.y < 270 || 
            placement.y < -100 && placement.y > -270){
            this.rate.y = 40
        }
        if (placement.x > 270|| 
            placement.x < -270){
            this.rate.x = 100
        }
        if (placement.y > 270 || 
            placement.y < -270){
            this.rate.y = 100
        }
        this.speed = {x: (placement.x)/this.rate.x, y: (placement.y/this.rate.y)}
        this.size = {x:8, y:8}
    }
}