class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene")
    }
    preload() {
        //load images/tile sprites
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('starfield', './assets/starfield.png')
        this.load.image('updatedStarfield', './assets/updatedStarfield.png')
        this.load.image('updatesSpaceship', './assets/updatesSpaceship.png')
        this.load.image('MenuScreen', './assets/Menu.png')
        //this.load.image('flares', './assets/flares.png')
        //this.load.image('SpaceShipn', './assets/SpaceShipn2.png')

        //load spritesheet
        this.load.spritesheet('flares', './assets/flares.png', {
            frameWidth: 130.4, 
            frameHeight: 132, 
            startFrame: 0,
            endFrame: 9
        })

        //SpaceShipn
        this.load.spritesheet('SpaceShipn2', './assets/SpaceShipN1S.png',{
            frameWidth: 64,
            frameHeight: 64,
            startframe:0, 
            endFrame: 5,
            repeat: -1
        })

        //load audio
        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')
        this.load.audio('background', './assets/watr-fluid-10149.mp3')
    }
    create(){
        //animation configuration 
        this.anims.create({
            key: 'explode', 
            frames: this.anims.generateFrameNumbers('flares', {
                start: 0,
                end: 3, 
                first: 0
            }),
            frameRate: 30,
        })
        
        
        // Initialize high score display
        //document.getElementById("high-score").textContent = highScore;

        //Particle Emitter 
        const emitter = this.add.particles(400, 250, 'flares', {
            frame: [ 'red', 'yellow', 'green' ],
            lifespan: 4000,
            speed: { min: 150, max: 250 },
            scale: { start: 0.8, end: 0 },
            gravityY: 150,
            blendMode: 'ADD',
            emitting: false
        });
        this.input.on('pointerdown', pointer => {

            emitter.explode(16);
        }); 
        //Enemy Spaceship ANIMATION
        //this.SpaceShipn = this.add.sprite( x, y, 'SpaceShipn').setOrigin(0,0)
        // Play background Music with loop 
        const backgroundMusic = this.sound.add('background', { loop: true });
        backgroundMusic.play();

            // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        let menuConfig = {
            fontFamily: 'Audiowide', 
            fontSize: '28px', 
            backgroundColor: '#DE639A', 
            color: '#16001E', 
            align: 'right', 
            padding: {
            top: 5, 
            bottom: 5, 
            },
            fixedWidth: 0
        }
        //display menu text
        this.MenuScreen = this.add.tileSprite(0, 0, 640, 480, 'MenuScreen').setOrigin(0,0)
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', 
        menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Use <- arrows to move & (F) to fire', menuConfig).
        setOrigin(0.5)
        menuConfig.backgroundColor = '#F7717D'
        menuConfig.color = '#000'
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', 
        menuConfig).setOrigin(0.5)
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3, 
                gameTimer: 10000
            }
            this.sound.play('sfx-select')
            this.sound.play('background')
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4, 
                gameTimer: 45000
            }
            this.sound.play('sfx-select')
            this.sound.play('background')
            this.scene.start('playScene')
        }
    
    }
}