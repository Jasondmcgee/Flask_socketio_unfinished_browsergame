class Hero {
    constructor(gameWidth, gameheight) {
        this.position = {x: gameWidth/2, y: gameheight/2};
        this.size = {x:25, y:25};
        this.speed = {x:0, y:0};
        this.maxSpeed = {x:4, y:4};
        this.stealth = false
        this.health = 100

        this.gameWidth = gameWidth
        this.gameheight = gameheight
    }
}