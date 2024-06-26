class Game {
    constructor() {
      this.startScreen = document.getElementById("start-screen")
      this.gameScreen = document.getElementById("game-screen")
      this.statContainer = document.getElementById("stat-container")
      this.gameContainer = document.getElementById("game-container")
      this.liveContainer = document.getElementById("livesP")
      this.gameEndScreen = document.getElementById("end-screen")
      this.controlscreen = document.getElementById("controls")
      this.audio = document.getElementById("audioNaruto")
      this.player = new Player(
        this.gameScreen,
        200,
        520,
        100,
        120,
        "./docs/assets/naruto.gif"
      );
      this.height = 600
      this.width = 700
      this.obstacles = []
      this.obstacles2 = []
      this.collectables = []
      this.bossArr = []
      this.score = 0
      this.lives = 4
      this.gameIsOver = false
      this.gameIntervalId
      this.gameLoopFrequency = Math.round(1000/60)
    }

    startAudio(){
        this.audio.play();
    }

    stopAudio(){
        this.audio.currentTime = 0;
        this.audio.pause()
    }
  
    start() {
      this.gameScreen.style.height = `${this.height}px`;
      this.gameScreen.style.width = `${this.width}px`;  
      this.gameContainer.style.display = "flex";
      this.startScreen.style.display = "none";
      this.gameScreen.style.display = "block";
      this.gameEndScreen.style.display = "none"
      this.liveContainer.style.display = "block"
      this.controlscreen.style.display = "none" 
      this.startAudio()
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
        document.getElementById('scoreEnd').textContent = this.score;
      }

    endGame() {
        this.player.element.remove()
        this.obstacles.forEach(obstacle => obstacle.element.remove())
        this.obstacles2.forEach(obstacle => obstacle.element.remove())
        this.collectables.forEach(collectable => collectable.element.remove())
        this.bossArr.forEach(boss => boss.element.remove())
        this.gameIsOver = true
        this.gameContainer.style.display = "none"
        this.gameScreen.style.display = "none"
        this.gameEndScreen.style.display = "block"
        this.liveContainer.style.display = "none"
        this.controlscreen.style.display = "none"
        this.stopAudio()
    }
    update() { 
          this.updateScore()
          this.updateLives()
          this.player.move() // get most recent player position

          // obstacle section 
    
           for (let i = 0; i < this.obstacles.length; i++) {
            const obstacle = this.obstacles[i]
            obstacle.move()

            if (this.lives === 0) {
                this.endGame();
            }

            else if (this.player.didCollide(obstacle)) {
                obstacle.element.remove();
                this.obstacles.splice(i, 1);
                this.lives--;
                i--;
            }
            else if (obstacle.top > this.height) {
              obstacle.element.remove();
              this.obstacles.splice(i, 1);
              i--;
            }
    
          }
                
            // Creating random obstacle
                 
            if (Math.random() > 0.99 && this.obstacles.length < 2) {
                this.obstacles.push(new Obstacle(this.gameScreen)); 
            } 

            // collectable section

            for (let i = 0; i < this.collectables.length; i++) {
                const collectable = this.collectables[i]
                collectable.move()

                if (this.player.didCollide(collectable)) {
                    this.score++;
                    collectable.element.remove();
                    this.collectables.splice(i, 1);
                    i--;
                }
                else if (collectable.top > this.height) {
                    collectable.element.remove();
                    this.collectables.splice(i, 1);
                    i--;
                  }
              }

              // Creating random collectable

              if (Math.random() > 0.99 && this.collectables.length < 5) {
                this.collectables.push(new Collectable(this.gameScreen));  
            }

            // obstacle 2 section

            for (let i = 0; i < this.obstacles2.length; i++) {
              const obstacle2 = this.obstacles2[i]
              obstacle2.move()

              if (this.lives === 0) {
                  this.endGame();
              }
  
              else if (this.player.didCollide(obstacle2)) {
                  obstacle2.element.remove();
                  this.obstacles2.splice(i, 1);
                  this.lives--;
                  i--;
              }
              else if (obstacle2.top > this.height) {
                obstacle2.element.remove();
                this.obstacles2.splice(i, 1);
                i--;
              }
      
            }
            if (Math.random() > 0.95 && this.obstacles2.length < 2) {
              this.obstacles2.push(new Obstacle2(this.gameScreen)); 
          } 

            // boss section 

                for (let i = 0; i < this.bossArr.length; i++) {
                  const boss = this.bossArr[i]
                  boss.move()
                  
  
                  if (this.lives === 0) {
                      this.endGame();
                  }
  
                  else if (this.player.didCollide(boss)) {
                      boss.element.remove();
                      this.bossArr.splice(i, 1);
                      if(this.lives === 1){
                        this.lives--
                      }
                      else{
                        this.lives -= 2 
                      }
                      i--;
                  }
                  else if (boss.top > this.height) {
                      boss.element.remove();
                    }
                }
            if (Math.random() > 0.95 && this.bossArr.length < 1 && this.score === 10) {
              this.bossArr.push(new Boss(this.gameScreen)); 
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
        if (this.left > this.gameScreen.offsetWidth - this.width - 20) {
          this.left = this.gameScreen.offsetWidth - this.width - 20;
        }
    
        // handles bottom side
        if (this.top > this.gameScreen.offsetHeight - this.height - 25) {
          this.top = this.gameScreen.offsetHeight - this.height - 25;
        }
    
        // Update the player's car position on the screen
        this.updatePosition();
      }

      updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
      }

      didCollide(boss) { 

        const playerRect = this.element.getBoundingClientRect(); 
        const bossRect = boss.element.getBoundingClientRect(); 

        if (
          playerRect.left < bossRect.right &&
          playerRect.right > bossRect.left &&
          playerRect.top < bossRect.bottom &&
          playerRect.bottom > bossRect.top
        ) { 
          return true;
        } else {
          return false;
        }
      }

      didCollide(obstacle) { 

        const playerRect = this.element.getBoundingClientRect(); 
        const obstacleRect = obstacle.element.getBoundingClientRect(); 

        if (
          playerRect.left < obstacleRect.right &&
          playerRect.right > obstacleRect.left &&
          playerRect.top < obstacleRect.bottom &&
          playerRect.bottom > obstacleRect.top
        ) { 
          return true;
        } else {
          return false;
        }
      }

      didCollide(obstacle2) { 

        const playerRect = this.element.getBoundingClientRect(); 
        const obstacle2Rect = obstacle2.element.getBoundingClientRect(); 

        if (
          playerRect.left < obstacle2Rect.right &&
          playerRect.right > obstacle2Rect.left &&
          playerRect.top < obstacle2Rect.bottom &&
          playerRect.bottom > obstacle2Rect.top
        ) { 
          return true;
        } else {
          return false;
        }
      }

      didCollide(collectable) { 

        const playerRect = this.element.getBoundingClientRect(); 
        const collectRect = collectable.element.getBoundingClientRect();
    
        if (
          playerRect.left < collectRect.right &&
          playerRect.right > collectRect.left &&
          playerRect.top < collectRect.bottom &&
          playerRect.bottom > collectRect.top
        ) { 
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
          this.element.src = "./docs/assets/shuriken.gif";
          this.element.style.position = "absolute";         
          this.element.style.width = `${this.width}px`;         
          this.element.style.height = `${this.height}px`;          
          this.element.style.left = `${this.left}px`;          
          this.element.style.top = `${this.top}px`;          
          this.gameScreen.appendChild(this.element);  
        }
      
        updatePosition() {
          this.element.style.left = `${this.left}px`;
          this.element.style.top = `${this.top}px`;
        }
      
        move() {
          this.top += 3;
          this.updatePosition();
        }
      }
      
      class Obstacle2 {
        constructor(gameScreen) {
          this.gameScreen = gameScreen;
          this.left = Math.floor(Math.random() * 300 + 70);
          this.top = 0;
          this.width = 30;
          this.height = 100;
          this.element = document.createElement("img");
      
          this.element.src = "./docs/assets/kunai.png";
          this.element.style.position = "absolute";
          this.element.style.width = `${this.width}px`;
          this.element.style.height = `${this.height}px`;
          this.element.style.left = `${this.left}px`;
          this.element.style.top = `${this.top}px`;
      
          this.gameScreen.appendChild(this.element);
        }
      
        updatePosition() {
          this.element.style.left = `${this.left}px`;
          this.element.style.top = `${this.top}px`;
        }
      
        move() {
          this.top += 3;
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
      
          this.element.src = "./docs/assets/ramen.png";
          this.element.style.position = "absolute";
          this.element.style.width = `${this.width}px`;
          this.element.style.height = `${this.height}px`;
          this.element.style.left = `${this.left}px`;
          this.element.style.top = `${this.top}px`;
      
          this.gameScreen.appendChild(this.element);
        }
      
        updatePosition() {
          this.element.style.left = `${this.left}px`;
          this.element.style.top = `${this.top}px`;
        }
      
        move() {
          this.top += 3;
          this.updatePosition();
        }
      }

      class Boss {
        constructor(gameScreen) {
          this.gameScreen = gameScreen;
          this.left = Math.floor(Math.random() * 300 + 70);
          this.top = 0;
          this.width = 150;
          this.height = 250;
          this.element = document.createElement("img");
      
          this.element.src = "./docs/assets/file.png";
          this.element.style.position = "absolute";
          this.element.style.width = `${this.width}px`;
          this.element.style.height = `${this.height}px`;
          this.element.style.left = `${this.left}px`;
          this.element.style.top = `${this.top}px`;
      
          this.gameScreen.appendChild(this.element);
        }
      
        updatePosition() {
          this.element.style.left = `${this.left}px`;
          this.element.style.top = `${this.top}px`;
        }
      
        move() {
          this.top += 3;
          this.updatePosition();
        }
      }