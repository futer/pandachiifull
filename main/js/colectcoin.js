var text;
var count;
var level;

var select_level = level1;

var collectCoinsState = {  

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
	game.load.image('move', 'img/collection/button_move.png');

    },

    create: function() {  

    	//Set bound world
		this.game.world.setBounds(0, 0, 360,640);
   		this.background = this.game.add.sprite(0,0, 'background_colections');


		// Start the Arcade physics system (for movements and collisions)
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Add the physics engine to all game objects
		game.world.enableBody = true;

		//Set cursos as keyboard
		this.cursor = game.input.keyboard.createCursorKeys();

		// Create the player in the middle of the game
    	this.player = this.game.add.sprite(70, 100, 'player', 2);

    	this.player.inputEnabled = true;
	    //this.player.input.enableDrag();

	    //Vertial and collide
	    this.player.input.allowVerticalDrag = false;

	    this.player.body.collideWorldBounds = true;
	    this.player.body.immovable = false;

	    //Set movement animation
    	var walking_left = this.player.animations.add('walking_left', [0,1], 1, true);
    	var walking_right = this.player.animations.add('walking_right', [4,5], 1, true);


    	//Set button movement
    	this.buttonleft = this.game.add.sprite(0, 530, 'move');
		this.buttonleft.inputEnabled = true;

    	this.buttonright = this.game.add.sprite(240, 530, 'move');
		this.buttonright.inputEnabled = true;

    	this.buttonup = this.game.add.sprite(120, 530, 'move');
		this.buttonup.inputEnabled = true;

		//Set button transparenty
		this.buttonleft.alpha = false;
		this.buttonright.alpha = false;
		this.buttonup.alpha = false;

		//Set spacebar
		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		// Add gravity to make it fall
		this.player.body.gravity.y = 600;

		//Add group for map
		this.walls = game.add.group();
		this.floors = game.add.group();
		this.coins = game.add.group();
		this.enemies = game.add.group();

		//select level
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

		//point text and count
		count = 0;

		text = game.add.text(5, 5, "Point: 0", 
		{
			font: "bold 12px Arial",
			fill: "#FFF",

		 });

		//Exit icon
		this.exiticton = game.add.sprite(335, 5, 'exiticon');  
		this.exiticton.inputEnabled = true;
    	this.exiticton.events.onInputDown.add(this.clickOnActionExit, this);

    },
    update: function() {  

    	this.buttonleft.events.onDragStart.add(this.isTouchingButtonLeft, this);
    	this.buttonright.events.onDragStart.add(this.isTouchingButtonRight, this);
    	this.buttonup.events.onDragStart.add(this.isTouchingButtonJump, this);

    	// Move the player when an arrow key is pressed and 
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
		if (this.spaceKey.isDown && this.player.body.touching.down) 
		{
		    this.player.body.velocity.y = -320;
		    this.player.frame = 3;
		}

		// Call the 'takeCoin' function when the player takes a coin
		game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

		// Call the 'restart' function when the player touches the enemy
		game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);

		//Call restart button
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
	    game.state.start('collectCoinsState');
	},

	// Function to exit game
	clickOnActionExit: function()
	{
		this.game.state.start('pandachiiState');
	},

	// Function to Next level
	gameOver: function()
	{
		if(!this.restartBackgrund.clicked)
		{	
			count = 0;
			select_level = level2;
			this.game.state.restart();
		}
	},

	isTouchingButtonLeft: function(button, pointer) 
	{
		this.player.body.velocity.x = -160;
		this.player.animations.play('walking_left', 12, false);
		
	},

	isTouchingButtonRight: function(button, pointer) 
	{
		this.player.body.velocity.x = 160;
		this.player.animations.play('walking_right', 12, false);
	},

	isTouchingButtonJump: function(button, pointer) 
	{
		if(this.player.body.touching.down)
		{
			this.player.body.velocity.y = -320;
			this.player.frame = 3;
		}
		
	},

};
