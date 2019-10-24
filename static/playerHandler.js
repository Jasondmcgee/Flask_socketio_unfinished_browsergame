class playermove{
    constructor(hero) {
        this.hero = hero
    }

    moveLeft() {
        this.hero.speed.x = -this.hero.maxSpeed.x
        console.log('working')
    }
    
    moveRight() {
        this.hero.speed.x = this.hero.maxSpeed.x;
    }

    moveUp(){
        this.hero.speed.y = -this.hero.maxSpeed.y
    }

    moveDown(){
        this.hero.speed.y = this.hero.maxSpeed.y;
    }

    stopupdown() {
        this.hero.speed.y = 0;
    }
    stopsideside(){
        this.hero.speed.x = 0;
    }
    
    update(deltaTime) {
        this.hero.position.x += this.hero.speed.x
        this.hero.position.y += this.hero.speed.y

        if (this.hero.position.x < 0) this.hero.position.x = 0;
        if (this.hero.position.x + this.hero.size.x > this.hero.gameWidth)
            this.hero.position.x = this.hero.gameWidth - this.hero.size.x;

        if (this.hero.position.y < 0) this.hero.position.y = 0;
        if (this.hero.position.y + this.hero.size.x> this.hero.gameheight) 
            this.hero.position.y = this.hero.gameheight - this.hero.size.x;
    }
}