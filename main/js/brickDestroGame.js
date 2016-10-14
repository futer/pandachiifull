var text;
var count;
var brickCounts = 0;

var brickDestroGame = {  

    preload: function() 
    {  
    	game.load.image('background', 'img/brick-destro/background.png');
    	game.load.image('paddle', 'img/brick-destro/paddle.png');
    	game.load.image('brick', 'img/brick-destro/brick.png');  
    	game.load.image('ball', 'img/brick-destro/ball.png'); 
    	game.load.image('score_bg','img/brick-destro/scoreBackground.png');
    	game.load.image('pause_bg','img/brick-destro/pauseBackground.png');
    	game.load.image('restartBackgrund', 'img/restert_background.png');
    },

    create: function() 
    {  
    	game.add.sprite(0,0, 'background');
    	//game.stage.backgroundColor = '#ffffff';
    	game.physics.startSystem(Phaser.Physics.ARCADE);

    	//set world Bounds
		this.game.world.setBounds(0, 0, 360,640);


		game.world.enableBody = true;

		//Set movement ket
		this.left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	    this.right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

	    // Add the paddle at the bottom of the screen
	    this.paddle = game.add.sprite(200, 610, 'paddle');
	    this.paddle.inputEnabled = true;
	    this.paddle.input.enableDrag();

	    this.paddle.input.allowVerticalDrag = false;

	    // Make sure the paddle won't move when it hits the ball
	    this.paddle.body.immovable = true;

	    // Make sure the paddle won't go outside stage
	    this.paddle.body.collideWorldBounds = true;

	    // Create cursors for pause inGame
	    cursors = game.input.keyboard.createCursorKeys();	    

	    //Set pauseKey for "P"
	    pauseKey = this.input.keyboard.addKey(Phaser.Keyboard.P);
    	pauseKey.onDown.add(this.togglePause, this);

    	//Add bricks
	    this.addBricks();

			// Add the ball 
		    this.ball = game.add.sprite(200, 300, 'ball');  

		    //Create pauseButton
		    this.pauseBackgrund = this.game.add.sprite(150,10, 'pause_bg');
			this.pauseBackgrund.clicked = false;
			this.pauseBackgrund.inputEnabled = true;
			this.pauseBackgrund.events.onInputDown.add(this.togglePause,this);

		    // Give the ball some initial speed
		    this.ball.body.velocity.x = 350;
		    this.ball.body.velocity.y = 350;

		    // Make sure the ball will bounce when hitting something
		    this.ball.body.bounce.setTo(1); 
		    this.ball.body.collideWorldBounds = true;

		    //Create score backGround
		    this.game.add.sprite(10,10, 'score_bg');

			count = 0;

			    text = game.add.text(25, 20, "Point: 0", 
			    {
			        font: "bold 12px Arial",
			        fill: "#446f31",
			        stroke: "#ffffff",
			        strokeThickness: 2
			    });

			   this.exiticton = game.add.sprite(335, 5, 'exiticon');  
			   this.exiticton.inputEnabled = true;
    		   this.exiticton.events.onInputDown.add(this.clickOnActionExit, this);

    },

    //Toggle pause
    togglePause: function() 
    {
    	game.physics.arcade.isPaused = (game.physics.arcade.isPaused) ? false : true;
	},

	//Add bricks
    addBricks: function()
    {
    	// Create a group that will contain all the bricks
		    this.bricks = game.add.group();  

		    // Add 25 bricks to the group (5 columns and 5 lines)
		    for (var i = 0; i < 5; i++) {
		        for (var j = 0; j < 5; j++) {
		            // Create the brick at the correct position
		            var brick = game.add.sprite(40+i*60, 80+j*35, 'brick');

		            // Make sure the brick won't move when the ball hits it
		            brick.body.immovable = true;

		            // Add the brick to the group
		            this.bricks.add(brick);
		        }
		    }
    },

    //Update
    update: function() 
    {  
    	//Count brick for reAdd
    	if(brickCounts == 25)
	    {
	    	if(this.ball.y > 400)
	    	{
				brickCounts = 0;
	    		this.addBricks();
	    	}

	    }

	    //Set movement
	    if (this.left.isDown) 
	    {
	    	// Paddle move to left
	    	this.paddle.body.velocity.x = -300;
	    }
	    else if(this.right.isDown) 
	    {
	    	// Paddle move to right
	    	this.paddle.body.velocity.x = 300; 
	    }
	    else 
	    {
	        // Stop the paddle when no key is pressed
	    	this.paddle.body.velocity.x = 0;     
	    }	

	    	// Add collisions between the paddle and the ball
		    game.physics.arcade.collide(this.paddle, this.ball);

		    // Call the 'hit' function when the ball hits a brick
		    game.physics.arcade.collide(this.ball, this.bricks, this.hit, null, this);

		    // Restart the game if the ball is below the paddle
		    if (this.ball.y > this.paddle.y)
		    {
		    	//Create restart button
				this.restartBackgrund = this.game.add.sprite(82,220, 'restartBackgrund');
				this.restartBackgrund.clicked = false;
				this.restartBackgrund.inputEnabled = true;
				this.restartBackgrund.events.onInputDown.add(this.gameOver,this);
	    	
	    		//Kill ball for stop game
		        this.ball.kill();

		    }

	},

	//Restart state
	gameOver: function()
	{
		if(!this.restartBackgrund.clicked)
		{
			brickCounts = 0;
			this.game.state.restart();
		}
	},

	//Set colisson bettwen ball and brick
	hit: function(ball, brick) 
	{  
	    brick.kill();
	    count = count + 10;
		brickCounts = brickCounts + 1;

		//debug.setText("Count" + brickCounts);
		text.setText("Point: " + count);
	},

	//Exit button
	clickOnActionExit: function()
	{
		this.game.state.start('brickDestroGameMenu');
	},

};
