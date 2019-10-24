function stealth(hero, bush1, bush2, bush3, bush4) {
    if(detectCollision(hero, bush1) || 
    detectCollision(hero, bush2) ||
    detectCollision(hero, bush3) ||
    detectCollision(hero, bush4)){
        hero.stealth = true
        if(hero.stealth)console.log('hiding')
    } else {
        hero.stealth = false
    }
}