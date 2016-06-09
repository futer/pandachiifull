var text;
var count;

var collectcoinsState = {  

	colectioncoins: 0,
	textcoins: "",
	countcoins: 0,
    preload: function() { 

    game.load.image('player', 'img/collection/panda.png');
	game.load.image('wall', 'img/collection/wall.png');
	game.load.image('coin', 'img/collection/coin.png');
	game.load.image('enemy', 'img/collection/lava.png'); 
        
    },

    create: function() {  
		this.game.world.setBounds(0, 0, 360,640);

		// Set the background color to blue
		game.stage.backgroundColor = '#3598db';

		// Start the Arcade physics system (for movements and collisions)
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Add the physics engine to all game objects
		game.world.enableBody = true;

		this.cursor = game.input.keyboard.createCursorKeys();

		// Create the player in the middle of the game
		this.player = game.add.sprite(70, 100, 'player');

		// Add gravity to make it fall
		this.player.body.gravity.y = 600;

		this.walls = game.add.group();
		this.coins = game.add.group();
		this.enemies = game.add.group();

		// Design the level. x = wall, o = coin, ! = lava.
		var level = [
		    'xxxxxxxxxxxxxxx',
		    'x         x   x',
		    'x  xxxx       x',
		    'x   o         x',
		    'x             x',
		    'x             x',
			'x     xxxxx   x',
		    'x             x',
		    'x         !!!!x',
		    'x             x',
		    'xxxxxxxxxxxx  x',
		    'x             x',
		    'x     o       x',
		    'x             x',
		    'x    xxxxxxx  x',
		    'x             x',
		    'x             x',
		    'x  xxxx xx    x',
		    'x             x',
		    'x   o         x',
		    'x      !!  o  x',
		    'x!!  !        x',
		    'x        xxxx x',
		    'x             x',
		    'x xxxxxx      x',
			'x       o     x',
		    'x             x',
		    'x             x',
		    'xxxxxxxxxxxxxxx',
		];

		// Create the level by going through the array
		for (var i = 0; i < level.length; i++) {
		    for (var j = 0; j < level[i].length; j++) {

		        // Create a wall and add it to the 'walls' group
		        if (level[i][j] == 'x') {
		            var wall = game.add.sprite(30+20*j, 30+20*i, 'wall');
		            this.walls.add(wall);
		            wall.body.immovable = true; 
		        }

		        // Create a coin and add it to the 'coins' group
		        else if (level[i][j] == 'o') {
		            var coin = game.add.sprite(30+20*j, 30+20*i, 'coin');
		            this.coins.add(coin);
		        }

		        // Create a enemy and add it to the 'enemies' group
		        else if (level[i][j] == '!') {
		            var enemy = game.add.sprite(30+20*j, 30+20*i, 'enemy');
		            this.enemies.add(enemy);
		        }
		    }
		}

				count = 0;

			    text = game.add.text(5, 5, "Point: 0", 
			    {
			        font: "bold 12px Arial",
			        fill: "#FFF",

			    });

			    this.exiticton = game.add.sprite(335, 5, 'exiticon');  
			    this.exiticton.inputEnabled = true;
    		    this.exiticton.events.onInputDown.add(this.clickOnActionExit, this);

    },

    update: function() {  

    	// Move the player when an arrow key is pressed
		if (this.cursor.left.isDown) 
		{
			this.player.body.velocity.x = -200;
		}
		else if (this.cursor.right.isDown) 
		{
			this.player.body.velocity.x = 200;
		}
		else this.player.body.velocity.x = 0;

		// Make the player jump if he is touching the ground
		if (this.cursor.down.isDown && this.player.body.touching.down) 
		{
		    this.player.body.velocity.y = -100;
		}

		// Make the player and the walls collide
		game.physics.arcade.collide(this.player, this.walls);

		// Call the 'takeCoin' function when the player takes a coin
		game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

		// Call the 'restart' function when the player touches the enemy
		game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);

		if (count > 4)
		    {

				this.restartBackgrund = this.game.add.sprite(82,120, 'restartBackgrund');
				this.restartBackgrund.clicked = false;
				this.restartBackgrund.inputEnabled = true;
				this.restartBackgrund.events.onInputDown.add(this.gameOver,this);
	   
	   			this.player.kill();

		    }



	},

	// Function to kill a coin
	takeCoin: function(player, coin) {
	    coin.kill();
	    count = count + 1;
		text.setText("Point: " + count);
	},

	// Function to restart the game
	restart: function() {
	    game.state.start('collectcoinsState');
	},
	clickOnActionExit: function()
	{
		this.game.state.start('GameState');
	},

	gameOver: function()
	{
		if(!this.restartBackgrund.clicked)
		{
			count = 0;
			this.game.state.restart();
		}
	},
};
