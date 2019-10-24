function detectCollision(hero, gameObject) {
    let bottomofhero = hero.position.y + hero.size.x
    let topofhero = hero.position.y
    let rightofhero = hero.position.x + hero.size.x
    let leftofhero = hero.position.x

    let bottomofobject = gameObject.position.y + gameObject.size.y
    let topofobject = gameObject.position.y
    let rightofobject = gameObject.position.x + gameObject.size.x
    let leftofobject = gameObject.position.x
    if (bottomofhero > topofobject &&
        topofhero < bottomofobject &&
        leftofhero < rightofobject &&
        rightofhero > leftofobject
        ) 
    return true
};