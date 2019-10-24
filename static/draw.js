function draw(ctx, hero) {
    ctx.save();
    if (hero.stealth) {
        console.log('hiding away')
        ctx.globalAlpha = 0.0;
      } else {
        ctx.globalAlpha = 1;
      }
    
    ctx.drawImage(
        image = document.getElementById("img_hero"),
        hero.position.x,
        hero.position.y,
        hero.size.x,
        hero.size.y
    );
    ctx.restore()
};

function drawShot(ctx, shot) {  
    ctx.drawImage(
        image = document.getElementById("img_bullet"),
        shot.position.x,
        shot.position.y,
        shot.size.x,
        shot.size.y
    );
    ctx.restore()
};

function update(deltaTime, shot, lava1, lava2, lava3, lava4,) {
    shot.position.x += shot.speed.x
    shot.position.y += shot.speed.y
    if (detectCollision(shot, lava1) || 
    detectCollision(shot, lava2) ||
    detectCollision(shot, lava3) ||
    detectCollision(shot, lava4)){
        shot.alive = false
    }
}
