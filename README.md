# Space Ninja

## [Click here to play the game!](https://addiyo22.github.io/space-ninja-project/)

# Description
Space Ninja is game where the player starts with 4 lives and dodges shuriken and kunai using the arrow buttons. The score incereases when the player collects the ramen. There is also a Boss that appears when the player's score reaches 10. The game ends when all the lives are lost.


# MVP
- Payer moves when pressing the corrosponding arrow keys.
- Ramen appear at the top of the screen from random locations and random frequencies.
- Ramen increase the score by 1
- Shuriken appear at the top of the screen from random locations and random frequencies.
- Shurikens reduce the players life by 1
- The game ends total lives is equal to 0


# Backlog
- Adding an additional obstacle.
- Adding a boss Appearance when the score is 10
- Boss reducing the total lives by 2
- Improving the UI
- Making the game

# Technologies Used
- HTML
- CSS
- JavaScript
- DOM Manipulation
- JS Canvas
- JS Classes
- JS Audio() and JS Image()


# States
- Start Screen
- Game Screen
- Game Over Screen


# Project Structure
## screen.js
  - handleKeys()
  - startGame()
  - refresh()
  - startButton.addEventListener()
  - restartButton.addEventListener()
  - menuButton.addEventListener()

## game.js
- game()
  - this.startScreen;
  - this.gameScreen;
  - this.statContainer;
  - this.gameContainer;
  - this.liveContainer;
  - this.gameEndScreen;
  - this.controlscreen;
  - this.audio;
  - this.player;
  - this.height;
  - this.width;
  - this.obstacles;
  - this.obstacles2;
  - this.collectables;
  - this.bossArr;
  - this.score;
  - this.lives;
  - this.gameIsOver;
  - this.gameIntervalId
  - this.gameLoopFrequency

 - startAudio()
 - stopAudio()
 - start()
 - gameLoop()
 - updateLives()
 - updateScore()
 - endGame()
 - update()

- player()
  - this.gameScreen
  - this.left;
  - this.top;
  - this.width;
  - this.height;
  - this.directionX;
  - this.directionY;
  - this.element;
  - this.element.src;
  - this.element.style.position;
  - this.element.style.width;
  - this.element.style.height;
  - this.element.style.left;
  - this.element.style.top;
  - this.gameScreen.appendChild(this.element)

 - move()
 - updatePosition()
 - didCollide(obstacle)
 - didCollide(obstacle2)
 - didCollide(collectable)
 - didCollide(boss)

- Obstacle()
  - this.gameScreen;
  - this.left;
  - this.top;
  - this.width;
  - this.height;
  - this.element;
  - this.element.src;
  - this.element.style.position;
  - this.element.style.width;
  - this.element.style.height;
  - this.element.style.left;
  - this.element.style.top;
  - this.gameScreen.appendChild(this.element)
 
 - updatePosition()
 - move()

- Obstacle2()
  - this.gameScreen;
  - this.left;
  - this.top;
  - this.width;
  - this.height;
  - this.element;
  - this.element.src;
  - this.element.style.position;
  - this.element.style.width;
  - this.element.style.height;
  - this.element.style.left;
  - this.element.style.top;
  - this.gameScreen.appendChild(this.element)
 
 - updatePosition()
 - move()

- Collectable()
  - this.gameScreen;
  - this.left;
  - this.top;
  - this.width;
  - this.height;
  - this.element;
  - this.element.src;
  - this.element.style.position;
  - this.element.style.width;
  - this.element.style.height;
  - this.element.style.left;
  - this.element.style.top;
  - this.gameScreen.appendChild(this.element)
 
 - updatePosition()
 - move()

- Boss()
  - this.gameScreen;
  - this.left;
  - this.top;
  - this.width;
  - this.height;
  - this.element;
  - this.element.src;
  - this.element.style.position;
  - this.element.style.width;
  - this.element.style.height;
  - this.element.style.left;
  - this.element.style.top;
  - this.gameScreen.appendChild(this.element)
 
 - updatePosition()
 - move()


## Links

- [Trello Link](https://trello.com/b/I61HkSe3/space-ninja)
- [Slides Link](https://docs.google.com/presentation/d/15_7LY6M-LJgkqyN_UjPd8NoogNqbFO-J52lprCCMoQk/edit#slide=id.p)
- [Github repository Link](https://github.com/Addiyo22/space-ninja-project)
- [Deployment Link](https://addiyo22.github.io/space-ninja-project/)