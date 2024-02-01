class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
        // Initialize the high score within the constructor
        //this.highScore = localStorage.getItem("highScore") || 0;
    
    }
    
    create(){
        //place tile sprite
        this.updatedStarfield = this.add.tileSprite(0, 0, 640, 480, 'updatedStarfield').setOrigin(0,0)
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0)
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFF). setOrigin(0, 0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config, borderUISize, 0xFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0XFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0XFFFFF).setOrigin(0,0)
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 
        'rocket').setOrigin(0.5, 0)
        //let NewShip = this.add.sprite(Spaceship.x, Spaceship.y, 'Spaceshipn').setOrigin(0, 0);
        //NewShip.anims.play('Spaceshipn') //play explode animatio{n
            
        

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'SpaceShipn2', 0, 
        30, 3, Phaser.Math.Between(0,1) == 0 ? -1 : 1 ,3).setOrigin(0,0)

        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 
        'SpaceShipn2', 0, 20, 3, Phaser.Math.Between(0,1) == 0 ? -1 : 1,10).setOrigin(0,0)

        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'SpaceShipn2', 0, 
        10, 3, Phaser.Math.Between(0,1) == 0 ? -1 : 1,3, 3).setOrigin(0,0)

        this.ship04 = new Spaceship(this, game.config.width + borderUISize*8, borderUISize*8+borderPadding*6, 'updatesSpaceship', 0, 
        40, 6, Phaser.Math.Between(0,1) == 0 ? -1 : 1,10).setOrigin(0,0)

        //this.add.sprite(game.config.width + borderUISize*6 , borderPadding*4).play('SpaceShipn2');
        //this.add.sprite(game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2 ).play('SpaceShipn2');
        //this.add.sprite(game.config.width , borderUISize*6 + borderUISize*6 + borderPadding*4).play('SpaceShipn2');


        //shipShipn(ship) {
         //   let Shipn = this.add.sprite(ship.x, ship.y, 'SpaceShipn').setOrigin(0,0);
           // Shipn.anims.play('SpaceShipn');
        //}
        
        //set the initial game timer value in seconds (e.g., 60 seconds)
        //game.settings.gameTimer = 60000;

        //Set up a timer for speed increase after 30 sec
        this.speedIncreaseTimer = this.time.delayedCall(30000, () => {
            //increases the speed of the spaceships when the timer expires 
            this.ship01.increaseSpeed(); 
            this.ship02.increaseSpeed(); 
            this.ship03.increaseSpeed(); 
            this.ship04.increaseSpeed(); 
        }, null, this);
        
        // define keys
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        // initialize score
        this.p1Score = 0
        // Initialize high score display
        //document.getElementById("high-score").textContent = this.highScore;
        //display score
        let scoreConfig = {
            fontFamily: 'Courier', 
            fontSize: '28px', 
            backgroundColor: '#DE639A',
            color: '#16001E',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5, 
            
            },
            fixedWith:100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig)
        // GAME OVER flag
        this.gameOver = false

        // 60-second play clock
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu',
        scoreConfig).setOrigin(0.5)
            this.gameOver = true
            
            //HIGH SCORE SHT HERE
        }, null, this)
        //game.settings.gameTimer = 60000;  // Set the initial game timer value in milliseconds (e.g., 60 seconds)

        
        // create timeline Left text
        let TimeConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
          }
          this.TimeLeft = this.add.text(borderUISize + borderPadding* 40 , borderUISize + borderPadding*2, game.settings.gameTimer, TimeConfig)
         // game.settings.gameTimer -= 1000 
         //this.updatedTimer()
         //this.TimeLeft.text  -= 1000;

         this.TimeLeft.setText(game.settings.gameTimer  / 1000)
         //this.TimeLeft.text  =           this.TimeLeft;
        console.log("Elapsed Seconds:", game.settings.gameTimer);

        
         // fuck this timer 
         document.addEventListener('DOMContentLoaded', function() {
            const startingMinutes = 1;
            let time = startingMinutes * 60;
        
            const countdownEl = document.getElementById('countdown');
        
            setInterval(updateCountdown, 1000);
        
            function updateCountdown() {
                const minutes = Math.floor(time / 60);
                let seconds = time % 60;
        
                seconds = seconds < 10 ? '0' + seconds : seconds;
        
                countdownEl.innerHTML = `${minutes}:${seconds}`;
                time--;
        
                if (time < 0) {
                    clearInterval(updateCountdown);
                }
            }
        });
        
        // animations
        this.anims.create({
            key: 'ShipN' ,
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('SpaceShipn2',{
                start:0,
                end: 5
            }), 
        })
        this.ship01.anims.play('ShipN')
        this.ship02.anims.play('ShipN')
        this.ship03.anims.play('ShipN')

        this.anims.create({
            key: 'explosion' , 
            frameRate: 5, 
            frames: this.anims.generateFrameNumbers('flares',{
                start:0,
                end:6
            })
        })
    }

        

    
    update() {
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }
        this.updatedStarfield.tilePositionX -= 4

        //Check for user input to control the rocket 
        if (!this.gameOver) {
            if (keyLEFT.isDown && this.p1Rocket.x >= borderUISize + this.p1Rocket.width) {
                this.p1Rocket.x -= this.p1Rocket.moveSpeed;
            }
            if (keyRIGHT.isDown && this.p1Rocket.x <= game.config.width - borderUISize - this.p1Rocket.width) {
                this.p1Rocket.x += this.p1Rocket.moveSpeed;
            }

            //Check if the rocket is still on the screen to update
            if (this.p1Rocket.isFiring) {
                this.p1Rocket.update();
            }
        }
        //Handle Timer (hits & misses)
        if (!this.gameOver) {

            //check for game over based on timer
            if (game.settings.gameTimer <= 0) {
                this.gameOver = true
            }
        }

        //updatedTimer(); {
            //const updatedTimer = Math.max(0, Math.ceil(game.settings.gameTimer));
          //  this.TimeLeft.text = 'Time: ${updatedTimer}'
        //}
        ///this.updatedTimer()


        // Update Timer
        let updatedTimer = 0;  // Declare the variable outside the if block
        
        if (!this.gameOver) {
            game.settings.gameTimer -= this.time.deltaTime;
            //this.TimeLeft.setText('TimeConfig')
            //this.TimeLeft.setText = `Time: ${Math.max(0, Math.ceil(game.settings.gameTimer / 1000))}`;
            //const elapsedSeconds = Math.floor((currentTime - game.settings.startTime) / 1000 );
            //game.settings.gameTimer = Math.max(0, game.settings.gameTimer - elapsedSeconds * 1000);

            //updatedTimer = Math.max(0, Math.ceil(game.settings.gameTimer / 1000));
            //console.log("Elapsed Seconds:", elapsedSeconds);
            //console.log("Updated Timer:", updatedTimer);
            //console.log("Game Timer:", game.settings.gameTimer);

            //this.TimeLeft.setText = `Time: ${updatedTimer}`;


            //this.TimeLeft.text = `Time: ${Math.max(0, Math.ceil(game.settings.gameTimer / 1000))}`;
            if (game.settings.gameTimer <= 0) {
                this.gameOver = true;
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu',scoreConfig).setOrigin(0.5)


            }
        }
        

        this.p1Rocket.update()
        this.ship01.update()               // update spaceships (x3)
        this.ship02.update()
        this.ship03.update()
        this.ship04.update()   
                    //new mod spaceship
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }
        // High-score
        //this.add.text(x, y, 'High Score: ' + this.highScore, someTextStyle);
    
        //check collision
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }
        if(this.checkCollision(this.p1Rocket, this.ship04)){
            this.p1Rocket.reset()
            this.shipExplode(this.ship04)
        }
        
        if(!this.gameOver) {
            this.p1Rocket.update()        // update rocket sprite
            this.ship01.update()          // update spaceships (x3)
            this.ship02.update()
            this.ship03.update()
            this.ship04.update() //update mod sp
        }
        //shipExplode(ship) {
            //ship.alpha = 0 
            //let boom = this.add.sprite(ship.x, ship.y, 'explosion' ).setOrigin(0,0 );
            //boom.anims.play('explosion')
            //boom.on('animationcomplete', () => {
             //   ship.reset()
            //    ship.alpha = 1
          //      boom.destroy()
         //   }) 
        //}

        const topBarY = borderUISize *3 + borderPadding;
        const marginOfError = 2;

        if(this.p1Rocket.y >= topBarY - marginOfError) {
            this.TimeLeft -= 1000 
            console.log('Rocket reached the end')
            this.miss -= 60000;
            
            if(!this.gameOver){
                this.miss -= 60000;
            }
        }

    }

        
    
    shipExplode(ship) {
        ship.alpha = 0
        let boom = this.add.sprite(ship.x, ship.y, 'explosion'  ).setOrigin(0, 0);
        boom.anims.play('explosion') //play explode animation

        boom.on('animationcomplete', ()   => { //callback after anim compl
            ship.reset() // reset ship postion
            ship.alpha = 1  //make ship visible again
            boom.destroy() //remove explosion sprite

        })
        // score add and text update
        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score
        this.sound.play('sfx-explosion')
    }




    //Check Collision2
    
    //Check Collision1
    checkCollision(rocket, ship) {
        

        
        
            //simple AABB checking
            if (
                rocket.x < ship.x + ship.width &&
                rocket.x + rocket.width > ship.x &&
                rocket.y < ship.y + ship.height &&
                rocket.height + rocket.y > ship. y
                ) {
                    console.log('Collision detected')
                    this.shipExplode(ship);
                    //this.shipAnimation(Spaceship);
                    ship.hitByRocket(); // Call the method to handle hit logic
                    return true;
                } else {

                    //console.log('No collision')
                    return false;
                }
}
                
     
}

