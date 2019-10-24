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