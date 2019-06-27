var level01 = function(window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game, canvas) {
        // some useful constants 
        var groundY = game.groundY;
        
        console.log(game);

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1,
            speed: -3,
            gameItems: [
                { type: 'sawblade', x: canvas.width + 1700, y: groundY },
                { type: 'sawblade', x: canvas.width + 1200, y: groundY },
                { type: 'sawblade', x: canvas.width + 2000, y: groundY },
                {type: 'box',x: canvas.width + 1500,y:groundY -100},
                {type: "enemy",x: canvas.width + 400, y:groundY-30},
                {type:"enemy", x: canvas.width + 800,y:groundY-125},
                {type: "enemy",x: canvas.width + 1200,y:groundY-50},
            ]
        };
    //     createEnemy(400, groundY-30);
    //  createEnemy(800, groundY-125 );
    //  createEnemy(1200, groundY-50);
    
        setInterval(procedurallyGenerateItem, 15 * 1000);
        
        function procedurallyGenerateItem() {
            initLevelData();
        }
     
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE


        //TODO 8: Many Obstacles
        function createSawBlade(x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 25;
            var myObstacle = game.createObstacle(hitZoneSize, damageFromObstacle);
            myObstacle.velocityX = -6
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            myObstacle.rotationalVelocity = -10;
        }
        //your code goes here

        //TODO 9: Level Data
        initLevelData();
        function initLevelData() {
            for (var i = 0; i < levelData.gameItems.length; i++) {
                var gameItem = levelData.gameItems[i];
                if ( gameItem.type ==="sawblade" ){
                    createSawBlade(gameItem.x, gameItem.y);
                } else if (gameItem.type ==="enemy") {
                     createEnemy(gameItem.x, gameItem.y);
                }
                else{
                    createBox(gameItem.x, gameItem.y);
                }
            }
        }
        // Create a sawblade using the .x and .y property of each game item object

        //TODO 10: Roll Your Own Obstacles
       
            function createBox(x,y) {
             var hitZoneSize = 25;
            var damageFromObstacle = -25;
            var myObstacle = game.createObstacle(hitZoneSize, damageFromObstacle);
            myObstacle.velocityX = -6
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/emralkgd.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            myObstacle.rotationalVelocity = 0;
            myObstacle.onPlayerCollision = function(){
                game.increaseScore(250);
                myObstacle.fadeOut();
            }
            }
            
            function createEnemy(x, y) {
            //TODO 11: Enemies!
            var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.bitmap('img/images.jpg');
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x =x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.rotationalVelocity = 10;
            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-10);
                console.log('the box has hit halle') ;
            }
            
            enemy.onProjectileCollision = function() {
                enemy.fadeOut();
                game.increaseScore(100);
            }
                
        }
     
     
     
     
     
     
     
     
     
     
        
    };
};




//TODO 13: Design An Enemy
function createEnemy() {
    // all code from TODO 11 and 12
}

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}