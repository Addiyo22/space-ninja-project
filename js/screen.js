window.onload = function () {
    const startButton = document.querySelector("#start-button")
    const restartButton = document.querySelector("#restart-button")
    const menuButton = document.querySelector("#refresh-button")
    let game

    function handleKeys(event) {
        const key = event.key
        console.log('key',key)
        const possibleKeys = [
            "ArrowLeft",
            "ArrowUp",
            "ArrowRight",
            "ArrowDown",
        ]

        if(possibleKeys.includes(key)) {
            event.preventDefault();

            switch (key) {
                case "ArrowLeft":
                  game.player.directionX = -3;
                  break;
                case "ArrowUp":
                  game.player.directionY = -3;
                  break;
                case "ArrowRight":
                  game.player.directionX = 3;
                  break;
                case "ArrowDown":
                  game.player.directionY = 3;
                 
              }
        }
    }
    function startGame() {
        game = new Game()
        game.start()
      }

      function refresh(){
        window.location.reload();
      }

    window.addEventListener("keydown", handleKeys)

    startButton.addEventListener("click", function () {
        startGame();
      })

    restartButton.addEventListener("click", function () {
        startGame();
    })

    menuButton.addEventListener("click", function(){
        refresh();
    })
}