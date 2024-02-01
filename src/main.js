// Tory Swenson
//Rocket Patrol: invaders
// mmmhm somewhere around 17ish hours. 
//MOD LIST:
//looping background music (1)
//New title screen (3)
//background (1)
//Faster new spaceship (5)
//move rocket after shooting (1)
//3 frame animation for ships (3) - its kinda hard to see in browser, but there is a gif example i put in assets 
//ships Faster after 30sec (1)
//Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (5)


let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config)

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3
// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT

//highscore mod
let highScore = 0;
function updateHighScore(newScore) {
    if (newScore > highScore) {
        highScore = newScore;
        localStorage.setItem("highScore", highScore);
        document.getElementById("high-score").textContent = highScore;
    }
}
