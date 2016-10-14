var brickDestroGameMenu = {  

    preload: function() 
    {  
    	game.load.image('background', 'img/brick-destro/background.png');
    	game.load.image('name', 'img/brick-destro/name.png');

    	game.load.image('backgroundControll', 'img/brick-destro/backgroundControll.png');
    	game.load.image('controllBack', 'img/brick-destro/controllBack.png');

    	game.load.image('startGame', 'img/brick-destro/menuStartGame.png');
    	game.load.image('startTutorial', 'img/brick-destro/menuStartTutorial.png');
    	game.load.image('controll', 'img/brick-destro/menuControll.png');
    	game.load.image('exit', 'img/brick-destro/menuExit.png');
    	game.load.image('rules', 'img/brick-destro/menuRules.png');

    },

    create: function() 
    {  
    	game.add.sprite(0,0, 'background');

    	game.add.sprite(85,30, 'name');
    	
    	this.startGameMenu = game.add.sprite(85,150, 'startGame');
    	this.startGameMenu.inputEnabled = true;
    	this.startGameMenu.events.onInputDown.add(this.clickOnActionStartGame, this);
    	
    	this.startControllMenu = game.add.sprite(85,210, 'controll');
    	this.startControllMenu.inputEnabled = true;
    	this.startControllMenu.clicked = false;
    	this.startControllMenu.events.onInputDown.add(this.clickOnActionControll, this);
		
		this.startExitMenu = game.add.sprite(85,510, 'exit');
    	this.startExitMenu.inputEnabled = true;
    	this.startExitMenu.events.onInputDown.add(this.clickOnActionExit, this);;

    },

    //Update
    update: function() 
    {  
    	

	},

	//Start game button
	clickOnActionStartGame: function()
	{
		this.game.state.start('brickDestroGame');
	},

	//Show controll
	clickOnActionControll: function()
	{
		if(this.startControllMenu.clicked){}
		else
		{
			this.backgroundControll = this.game.add.sprite(0,0,'backgroundControll');
			this.startControllMenu.clicked = true;

			this.controllBack = this.game.add.sprite(28,575,'controllBack');
			this.controllBack.inputEnabled = true;
    		this.controllBack.events.onInputDown.add(this.clickOnActionControllBack, this);;
		}
	},

	//Exit button
	clickOnActionExit: function()
	{
		this.game.state.start('pandachiiState');
	},

	//Controll back from rule
	clickOnActionControllBack: function()
	{
		this.backgroundControll.destroy();
		this.controllBack.destroy();
		this.startControllMenu.clicked = false;	
	},

};
