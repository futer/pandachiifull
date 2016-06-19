var text;
var count;
var level;

var level1 = [
		    'xxxxxxxxxxxxxxx',
		    'x             x',
		    'x             x',
		    'x   o         x',
		    'x             x',
		    'x             x',
			'x   -----     x',
		    'x         !!!!x',
		    'x             x',
		    'x             x',
		    'x-----------  x',
		    'x             x',
		    'x     o       x',
		    'x             x',
		    'x    -------  x',
		    'x             x',
		    'x             x',
		    'x  ---- !!    x',
		    'x             x',
		    'x   o         x',
		    'x          o  x',
		    'x!   !!       x',
		    'x         ----x',
		    'x             x',
		    'x ------      x',
			'x       o     x',
		    'x             x',
		    'x             x',
		    'x-------------x',
		];

		var level2 = [
		    'xxxxxxxxxxxxxxx',
		    'x             x',
		    'x             x',
		    'x        o    x',
		    'x             x',
		    'x             x',
			'x   -----     x',
		    'x   !!!!! !!!!x',
		    'x             x',
		    'x  o          x',
		    'x-----        x',
		    'x    -        x',
		    'x    - o      x',
		    'x    -        x',
		    'x    ----     x',
		    'x             x',
		    'x             x',
		    'x  ---- !!    x',
		    'x  -          x',
		    'x  -o         x',
		    'x             x',
		    'x! !!--       x',
		    'x         ----x',
		    'x             x',
		    'x ------      x',
			'x       o     x',
		    'x             x',
		    'x             x',
		    'x-------------x',
		];

var select_level = level1;

var collectcoinsState = {  

	colectioncoins: 0,
	textcoins: "",
	countcoins: 0,
    preload: function() { 

    game.load.image('background_colections','img/collection/background_collections.png');
    game.load.spritesheet('player', 'img/collection/panda.png', 31.3333, 36, 6);
	game.load.image('wall', 'img/collection/wall.png');
	game.load.image('floor', 'img/collection/floor.png');
	game.load.image('coin', 'img/collection/coin.png');
	game.load.image('enemy', 'img/collection/lava.png'); 
	game.load.image('button1', 'img/collection/button1.png');
    game.load.image('button2', 'img/collection/button2.png');  

    },

    create: function() {  
		this.game.world.setBounds(0, 0, 360,640);
   		this.background = this.game.add.sprite(0,0, 'background_colections');

		// Set the background color to blue
		//game.stage.backgroundColor = '#3598db';

		// Start the Arcade physics system (for movements and collisions)
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Add the physics engine to all game objects
		game.world.enableBody = true;

		this.cursor = game.input.keyboard.createCursorKeys();

		// Create the player in the middle of the game
    	this.player = this.game.add.sprite(70, 100, 'player', 2);

    	this.player.inputEnabled = true;
	    this.player.input.enableDrag();

	    this.player.input.allowVerticalDrag = false;

	    this.player.body.collideWorldBounds = true;
	    this.player.body.immovable = false;

    	var walking_left = this.player.animations.add('walking_left', [0,1], 1, true);
    	var walking_right = this.player.animations.add('walking_right', [4,5], 1, true);

    	this.buttonleft = this.game.add.sprite(0, 600, 'button1');

		this.buttonleft.inputEnabled = true;
	    this.buttonleft.events.onInputDown.add(this.clickMoveLeft, this);
	    this.buttonleft.mouseDownCallback = false;

    	this.buttonright = this.game.add.sprite(320, 600, 'button1');

		this.buttonright.inputEnabled = true;
	    this.buttonright.events.onInputDown.add(this.clickMoveRight, this);
	    this.buttonright.clicked = false;

    	this.buttonup = this.game.add.sprite(65, 610, 'button2');

		this.buttonup.inputEnabled = true;
	    this.buttonup.events.onInputDown.add(this.clickMoveUp, this);
	    this.buttonup.clicked = false;


		this.buttonleft.alpha = 0;
		this.buttonright.alpha = 0;
		this.buttonup.alpha = 0;




		// Add gravity to make it fall
		this.player.body.gravity.y = 600;

		this.walls = game.add.group();
		this.floors = game.add.group();
		this.coins = game.add.group();
		this.enemies = game.add.group();

		level = select_level;

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

				// Create a coin and add it to the 'coins' group
		        else if (level[i][j] == '-') {
		            var floor = game.add.sprite(30+20*j, 30+20*i, 'floor');
		            this.floors.add(floor);
		            floor.body.immovable = true; 

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
			this.player.body.velocity.x = -160;
			this.player.animations.play('walking_left', 12, false);
		}
		else if (this.cursor.right.isDown) 
		{
			this.player.body.velocity.x = 160;
			this.player.animations.play('walking_right', 12, false);
		}
		else 
		{
			this.player.body.velocity.x = 0;
			this.player.frame = 2;

		}

		// Make the player and the walls collide
		game.physics.arcade.collide(this.player, this.walls);
		game.physics.arcade.collide(this.player, this.floors);


		// Make the player jump if he is touching the ground
		if (this.cursor.up.isDown && this.player.body.touching.down) 
		{
		    this.player.body.velocity.y = -320;
		    this.player.frame = 3;

		}

		

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

	clickMoveLeft: function()
	{
		if(!this.clickMoveLeft.mouseDownCallback)
		{
			this.player.body.velocity.x = -160;
		}
		else if (!this.clickMoveLeft.mouseUpCallback) 
		{
			this.player.body.velocity.x = 0;
		}
	},

	clickMoveRight: function()
	{
		if(!this.clickMoveRight.clicked)
		{
			this.player.body.velocity.x += 160;
		}
	},

	clickMoveUp: function()
	{
		if(!this.clickMoveRight.clicked && this.player.body.touching.down)
		{
			this.player.body.velocity.y = -320;
		}
	},

	gameOver: function()
	{
		if(!this.restartBackgrund.clicked)
		{	
			count = 0;
			select_level = level2;
			this.game.state.restart();
		}
	},
};