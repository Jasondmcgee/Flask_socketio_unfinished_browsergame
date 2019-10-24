class Bush {
    constructor(posx, posy, sizex, sizey, hero){
        this.image = document.getElementById("img_bush");
        this.position = {x: posx, y: posy};
        this.size = {x:sizex, y:sizey};
        this.hero = hero
    }

    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y
    )}

    update(deltaTime) {
        
    }
}