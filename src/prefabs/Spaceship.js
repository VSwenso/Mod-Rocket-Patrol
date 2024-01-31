// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, moveSpeed, speed, direction) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)      // add to existing scene
        this.points = pointValue      // store pointValue
        this.moveSpeed = moveSpeed            // spaceship speed in pixels/frame

        //Speed and Direction properties
        this.speed = speed;
        this.direction = direction;
    }
    

    update() {
        //move spaceship left
        this.x -= this.moveSpeed

        // wrap from left to right edge
        if(this.x <= 0 - this.width) {
            this.x = game.config.width
        }

        //Speed and Direction properties
        //this.speed = speed; 
        //this.direction = direction;
    }

    //method to increase the speed
    increaseSpeed() {
        this.moveSpeed += 3; // change speed if that sht is too fast

    }

    //reset position
    reset(){
        this.x = game.config.width
    }
    hitByRocket() {
        // Add logic to handle when the spaceship is hit by the rocket
        // For example, increase the time on the clock
        // You can customize this based on your game's rules
        // For now, let's assume it adds 5 seconds to the clock
        this.scene.clock.delay += 1000; // Add 1000 milliseconds (1 seconds)
    }
    missbyRocket(){
        this.scene.clock.delay -= 60000;
    }
}