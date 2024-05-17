class Game {
    constructor() {
      this.startScreen = document.getElementById("start-screen")
      this.gameScreen = document.getElementById("game-screen")
      this.gameEndScreen = document.getElementById("end-screen")
      this.player = new Player(
        this.gameScreen,
        200,
        520,
        100,
        120,
        "../Images/naruto.png"
      );
      this.height = 600
      this.width = 500
      this.obstacles = []
      this.collectables = []
      this.score = 0
      this.lives = 4
      this.gameIsOver = false
      this.gameIntervalId
      this.gameLoopFrequency = Math.round(1000/60)
    }
  
    start() {
      this.gameScreen.style.height = `${this.height}px`;
      this.gameScreen.style.width = `${this.width}px`;
  
      this.startScreen.style.display = "none";
      
      this.gameScreen.style.display = "block";
  
      
      this.gameIntervalId = setInterval(() => {
        this.gameLoop()
      }, this.gameLoopFrequency)
    }
  
    gameLoop() {
        this.update();
        if (this.gameIsOver) {
            clearInterval(this.gameIntervalId)
          }
    }
    updateLives(){
        document.getElementById('lives').textContent = this.lives;
      }
      updateScore(){
        document.getElementById('score').textContent = this.score;
      }

    endGame() {
        this.player.element.remove()
        this.obstacles.forEach(obstacle => obstacle.element.remove())
        this.collectables.forEach(collectable => collectable.element.remove())
        this.gameIsOver = true
        this.gameScreen.style.display = "none"
        this.gameEndScreen.style.display = "block"
    }
    update() { 
          this.updateScore()
          this.updateLives()
          this.player.move() // get most recent player position
    
           for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i]
            obstacle.move()
            
            // check if there's a collision between the player and an obstacle
            if (this.player.didCollide(obstacle)) {
                // Remove the obstacle element from the DOM
                obstacle.element.remove();
                // Remove obstacle object from the array
                this.obstacles.splice(i, 1);
                // Reduce player's lives by 1
                this.lives--;
                // Update the counter variable to account for the removed obstacle
                i--;
            }
            else if (obstacle.top > this.height) {
              // Remove the obstacle from the DOM
              obstacle.element.remove();
              // Remove obstacle object from the array
              this.obstacles.splice(i, 1);
              // Update the counter variable to account for the removed obstacle
              i--;
            }
    
            // If the lives are 0, end the game
            if (this.lives === 0) {
                this.endGame();
            }
    
          }
                
                 // Create a new obstacle based on a random probability
                // when there is no other obstacles on the screen
            if (Math.random() > 0.98 && this.obstacles.length < 1) {
                this.obstacles.push(new Obstacle(this.gameScreen));  // generate the obstacles
            } 

            // collectable section


            for (let i = 0; i < this.collectables.length; i++) {
                const collectable = this.collectables[i]
                collectable.move()
                
                // check if there's a collision between the player and an collectable
                if (this.player.didCollide(collectable)) {
                    this.score++;
                    // Remove the collectable element from the DOM
                    collectable.element.remove();
                    // Remove collectable object from the array
                    this.collectables.splice(i, 1);
                    // Update the counter variable to account for the removed collectable
                    i--;
                }
                
        
              }
              if (Math.random() > 0.98 && this.collectables.length < 4) {
                this.collectables.push(new Collectable(this.gameScreen));  // generate the collectables
            }


        }

}

class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
      this.gameScreen = gameScreen;
      this.left = left;
      this.top = top;
      this.width = width;
      this.height = height;
      this.directionX = 0;
      this.directionY = 0;
      this.element = document.createElement("img");
  
      this.element.src = imgSrc;
      this.element.style.position = "absolute";
      this.element.style.width = `${width}px`;
      this.element.style.height = `${height}px`;
      this.element.style.left = `${left}px`;
      this.element.style.top = `${top}px`;
  
      this.gameScreen.appendChild(this.element);
    }

    move() {
        this.left += this.directionX;
        this.top += this.directionY;
    
 
        if (this.left < -10) {
          this.left = -10;
        }
    
        // handles top side
        if (this.top < 2) {
          this.top = 2;
        }
    
        // handles right hand side
        if (this.left > this.gameScreen.offsetWidth - this.width - -10) {
          this.left = this.gameScreen.offsetWidth - this.width - -10;
        }
    
        // handles bottom side
        if (this.top > this.gameScreen.offsetHeight - this.height - -5) {
          this.top = this.gameScreen.offsetHeight - this.height - -5;
        }
    
        // Update the player's car position on the screen
        this.updatePosition();
      }

      updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
      }

      didCollide(obstacle) { // check if there's a collision between a player and an obstacle
        const playerRect = this.element.getBoundingClientRect(); // --> {x, y, width, height, top, right, left, bottom}
        const obstacleRect = obstacle.element.getBoundingClientRect(); // --> {x, y, width, height, top, right, left, bottom}
    
        if (
          playerRect.left < obstacleRect.right &&
          playerRect.right > obstacleRect.left &&
          playerRect.top < obstacleRect.bottom &&
          playerRect.bottom > obstacleRect.top
        ) { // if all these are true --> collision happened
          return true;
        } else {
          return false;
        }
      }

      didCollide(collectable) { // check if there's a collision between a player and an obstacle
        const playerRect = this.element.getBoundingClientRect(); // --> {x, y, width, height, top, right, left, bottom}
        const collectRect = collectable.element.getBoundingClientRect(); // --> {x, y, width, height, top, right, left, bottom}
    
        if (
          playerRect.left < collectRect.right &&
          playerRect.right > collectRect.left &&
          playerRect.top < collectRect.bottom &&
          playerRect.bottom > collectRect.top
        ) { // if all these are true --> collision happened
          return true;
        } else {
          return false;
        }
      }
    }

     class Obstacle {
        constructor(gameScreen) {
          this.gameScreen = gameScreen;
          this.left = Math.floor(Math.random() * 300 + 70);
          this.top = 0;
          this.width = 100;
          this.height = 150;
          this.element = document.createElement("img");
      
          this.element.src = "../Images/shuriken.png";
          this.element.style.position = "absolute";
          this.element.style.width = `${this.width}px`;
          this.element.style.height = `${this.height}px`;
          this.element.style.left = `${this.left}px`;
          this.element.style.top = `${this.top}px`;
      
          this.gameScreen.appendChild(this.element);
        }
      
        updatePosition() {
          // Update the obstacle's position based on the properties left and top
          this.element.style.left = `${this.left}px`;
          this.element.style.top = `${this.top}px`;
        }
      
        move() {
          // Move the obstacle down by 3px
          this.top += 3;
          // Update the obstacle's position on the screen
          this.updatePosition();
        }
      } 

      class Collectable {
        constructor(gameScreen) {
          this.gameScreen = gameScreen;
          this.left = Math.floor(Math.random() * 300 + 70);
          this.top = 0;
          this.width = 80;
          this.height = 130;
          this.element = document.createElement("img");
      
          this.element.src = "../Images/ramen.png";
          this.element.style.position = "absolute";
          this.element.style.width = `${this.width}px`;
          this.element.style.height = `${this.height}px`;
          this.element.style.left = `${this.left}px`;
          this.element.style.top = `${this.top}px`;
      
          this.gameScreen.appendChild(this.element);
        }
      
        updatePosition() {
          // Update the obstacle's position based on the properties left and top
          this.element.style.left = `${this.left}px`;
          this.element.style.top = `${this.top}px`;
        }
      
        move() {
          // Move the obstacle down by 3px
          this.top += 3;
          // Update the obstacle's position on the screen
          this.updatePosition();
        }
      }