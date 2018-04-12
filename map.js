var Player = function(playerid,hp) {
	this.id=playerid;
	this.hp=hp;
	this.X;
	this.Y;
	this.weapon= new Weapon(-1,0);

	this.setPosition=function(x,y) {
		this.X=x;
		this.Y=y;
	}
}

 var Weapon = function(weaponid,damage) {
	this.id=weaponid;
	this.damage=damage;
	this.X;
	this.Y;

	this.setPosition=function(x,y) {
		this.X=x;
		this.Y=y;

	}
} 


var Board = function(size) {
	this.size = size;
	this.map = [];
	this.GRASS = 0;
	this.STONE = 1;
	this.WEAPON1 = 2;
	this.WEAPON2 = 3;
	this.WEAPON3 = 4;
	this.PLAYER1 = 5;
	this.PLAYER2 = 6;
	this.player1 = new Player(this.PLAYER1,100);
	this.player2 = new Player(this.PLAYER2,100);
	this.currentPlayer=this.player1;
	this.currentPlayerMoves=0;
	this.weapon1 = new Weapon(this.WEAPON1,20);
	this.weapon2 = new Weapon(this.WEAPON2,40);
	this.weapon3 = new Weapon(this.WEAPON3,50);
	this.weapons = {
		2:this.weapon1,
		3:this.weapon2,
		4:this.weapon3
	}
	this.LOWER_BOUNDARY = 0;
	this.UPPER_BOUNDARY = this.size;


	this.start=function() {
		this.generateMap();
		this.generateStones();
		this.generateWeapons();
		this.generatePlayers();
	}
	this.generateMap=function(){
		
		for (var i=0;i<this.size;i++) {
			var row = [];
			for (var j=0;j<this.size; j++) {
				row.push(this.GRASS);

			}
				this.map.push(row);
		}
	}

	this.generateStones=function() {
		var i =0;
		var numberOfStones =  Math.floor(0.1 * this.size * this.size);
		while (i<numberOfStones)  //generate a loop from 1 to number of stones
		{ 
			var x = Math.floor(Math.random() * this.size);//generate x = random number between 0 to size -1
			var y = Math.floor(Math.random() * this.size);//generate y = random number between 0 to size -1 
			this.map[x][y]=this.STONE;//asign map[x][y]=stone(stone=1)
			var stone = document.createElement("div");
			i++;
		};

		
	}

	this.generateWeapons=function() {
		var weapons = [this.WEAPON1, this.WEAPON2, this.WEAPON3];
		for (var i=0; i<weapons.length; i++) {
			var j = 0;
    		while (j<1)
    		{
				var x = Math.floor(Math.random() * this.size);//generate x = random number between 0 to size -1
				var y = Math.floor(Math.random() * this.size);//generate y = random number between 0 to size -1

				if (this.map[x][y] == this.GRASS) {
					this.map[x][y]=weapons[i]; 
					this.weapons[weapons[i]].setPosition(x,y);
					j++;
            	}
            }
		}
	}
    	

	this.generatePlayers=function(){
	var i = 0;
    	while (i<1) {
			var x = Math.floor(Math.random() * this.size);//generate x = random number between 0 to size -1
			var y = Math.floor(Math.random() * this.size);//generate y = random number between 0 to size -1

			if (this.map[x][y] == this.GRASS) {
				this.map[x][y]=this.PLAYER1;
				this.player1.setPosition(x,y);
				i++;
				//}
			}
		} 

		var j = 0;
		while (j<1) {
			x = Math.floor(Math.random() * this.size);//generate x = random number between 0 to size -1
			y = Math.floor(Math.random() * this.size);//generate y = random number between 0 to size -1
			
			if (x-1>=this.LOWER_BOUNDARY && x+1<this.UPPER_BOUNDARY && y-1>=this.LOWER_BOUNDARY && y+1<this.UPPER_BOUNDARY) {
				if (this.map[x][y] == this.GRASS && this.map[x-1][y]!=this.PLAYER1 && this.map[x+1][y]!=this.PLAYER1 && this.map[x][y-1]!= this.PLAYER1 && this.map[x][y+1]!= this.PLAYER1) {
					this.map[x][y]= this.PLAYER2; 
					this.player2.setPosition(x,y);
				j++;
				};
			}; 
   		};
	};
	this.increaseMove=function() {
		this.currentPlayerMoves++;
		if (this.currentPlayerMoves>2) {
			this.currentPlayerMoves = 0;
			if (this.currentPlayer.id==this.PLAYER1) {
				this.currentPlayer=this.player2;
			} else {
				this.currentPlayer=this.player1;
			}
		}
	}
}





