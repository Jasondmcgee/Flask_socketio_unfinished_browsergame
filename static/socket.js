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