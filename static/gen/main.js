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
class InputHandler {
    constructor(playermove, hero) {
      document.addEventListener("keydown", event => {
        switch (event.keyCode) {
          case 65:
            playermove.moveLeft();
            break;
  
          case 68:
            playermove.moveRight();
            break;
        }
        switch(event.keyCode) {
            case 87:
                playermove.moveUp();
                break;
            
            case 83:
                playermove.moveDown();
                break;
        }});
  
      document.addEventListener("keyup", event => {
        switch (event.keyCode) {
          case 65:
            if (hero.speed.x < 0) playermove.stopsideside();
            break;
  
          case 68:
            if (hero.speed.x > 0) playermove.stopsideside();
            break;
        }
        switch (event.keyCode) {
            case 87:
              if (hero.speed.y < 0) playermove.stopupdown();
              break;
    
            case 83:
              if (hero.speed.y > 0) playermove.stopupdown();
              break;
        }});
    }
}
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
var thisPlayer = {}
var playerlist = []
var allshooting = {}

const GAME_WIDTH = 1800;
const GAME_HEIGHT = 1600;

//helper function for clicking 
function getCursorPosition(canvas, event) {
  const rect = canvas.getBoundingClientRect()
  const posx = event.clientX - rect.left
  const posy = event.clientY - rect.top
  position = {x: posx-canvas.width/2, y: posy-canvas.height/2}
  return(position)
}

var socket = io.connect('http://' + document.domain + ':' + location.port);
// verify our websocket connection is established
socket.on('connect', function() {
  hero = new Hero(GAME_WIDTH, GAME_HEIGHT);
  userid = socket.id
  socket.emit('newplayer', {userid, hero})
  console.log('connection established', userid)
});

//starting game once players are loaded
socket.on('players', function(allPlayers){
  userid = String(socket.id);
  let i;
  for (i=0; i < allPlayers.length; i++){
    if (allPlayers[i]['userid'] === userid){
      thisPlayer = allPlayers[i];
    };
  };
  
  //creating canvas
  let canvas = document.getElementById("gameScreen");
  let ctx = canvas.getContext('2d');
  
  //making lava for edges
  lava_left = new lava(-canvas.width/2, -canvas.height/2, canvas.width/2, GAME_HEIGHT + canvas.height/2);
  lava_bot = new lava(-canvas.width/2, GAME_HEIGHT, GAME_WIDTH + canvas.width, canvas.height);
  lava_right = new lava(GAME_WIDTH, -canvas.height/2, canvas.width/2, GAME_HEIGHT + canvas.height/2);
  lava_top = new lava(-canvas.width/2, -canvas.height/2 , GAME_WIDTH + canvas.width/2, canvas.height/2);

  //making input happen
  movement = new playermove(thisPlayer['hero']);
  new InputHandler(movement, thisPlayer['hero']);

  //mouseclick for shooting
  shots = []
  let tick = 1
  canvas.addEventListener('mousedown', function(e) {
    tick = tick + 1
    shot = new Bullet(getCursorPosition(canvas, e), thisPlayer['hero'], tick)
    shots.push(shot)
    //socket.emit('shooting', shots)
  })

  //making bushes to hide in 
  bush1 = new Bush(100, 120, 50, 50);
  bush2 = new Bush(300, 400, 50, 50);
  bush3 = new Bush(500, 200, 100, 200);
  bush4 = new Bush(1400, 1000, 200, 500);

  bushes = [bush1, bush2, bush3, bush4];

  //viewport
  function clamp(value, min, max){
    if(value < min) return min;
    else if(value > max) return max;
    return value;
  }

  let lastTime = 0

  //gameloop function
  function gameLoop(timestamp) {
  
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  
  //camera
  var camX = clamp(-thisPlayer['hero'].position.x + canvas.width/2, -GAME_WIDTH, GAME_WIDTH);
  var camY = clamp(-thisPlayer['hero'].position.y + canvas.height/2, -GAME_HEIGHT, GAME_HEIGHT);
  ctx.translate(camX, camY);
  
  //rendering lava
  lava_left.draw(ctx)
  lava_bot.draw(ctx)
  lava_right.draw(ctx)
  lava_top.draw(ctx)

  //rendering bushes and stealth
  for (i=0; i<bushes.length; i++){
    bushes[i].update(deltaTime, thisPlayer['hero'])
    bushes[i].draw(ctx)
  };
  stealth(thisPlayer['hero'], bush1, bush2, bush3, bush4)

  //creating player movement
  movement.update(deltaTime);
  
  //sending movement to the back
  socket.emit('positions', thisPlayer);

  //geting all the players
  socket.on('playermove', function otherPlayers(players) {
    playerlist.length = 0
    for (i=0; i < players.length; i++){
      playerlist.push(players[i]['hero'])
    }
  });

  //getting everybodys shot
  socket.on('allshots', function (allshots) {
    allshooting = allshots
    for (i=0; i<allshooting.length; i++){
      let a = allshooting[i].alive
      if(a === false){
        allshooting.splice(i,1)
      }
    };  
  });
  
  //drawing players
  for (i=0; i < playerlist.length; i++){
    draw(ctx, playerlist[i])
  };

  //drawing the shots
  for (i=0; i<shots.length; i++){
    let a = shots[i].alive
    if(a === false){
      shots.splice(i,1)
    }
    if (a){
    drawShot(ctx, shots[i]);
    update(deltaTime, shots[i],lava_top,lava_bot,lava_right,lava_left)
    }
  };

  requestAnimationFrame(gameLoop);
  }
   
  requestAnimationFrame(gameLoop);
});


//chatroom
socket.on('chatroom', function(messages){
  var messageList = document.getElementById('messages');
  messageList.insertAdjacentHTML('afterbegin', `<li> ${messages} </li>`);
  console.log('message recieved');
});

function messageButton() {
  socket.emit('message', document.getElementById('myMessage').value);
  document.getElementById('myMessage').value = "" ;
};