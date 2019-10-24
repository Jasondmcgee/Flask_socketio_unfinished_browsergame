class lava {
    constructor(posx,posy,sizex,sizey) {
        this.image = document.getElementById("img_lava")
        this.position = {x: posx, y:posy}
        this.size = {x:sizex, y:sizey}
    }


    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y
    )}
}