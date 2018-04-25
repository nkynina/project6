var board;

$("#dialog-message").hide();

  function action() {
    $( "#dialog-message" ).dialog({
      modal: true,
      dialogClass: "no-close",
      buttons: {
        Attack: function() {
       	board.currentPlayer.attack = true;
          $( this ).dialog( "close" );
       
        },
        Defend: function() {
        board.currentPlayer.attack = false;
          $( this ).dialog( "close" );
  
        }
      }
    });
  }


function start() {
	board= new Board(10);
	board.start();
	document.addEventListener('keydown',handleKeys);

	draw(board);
}

function handleKeys(event) {
	event.preventDefault();
	console.log(event.key);
	switch(event.key) {

		case "ArrowUp": up();
		break;
		case "ArrowDown": down();
		break;
		case "ArrowRight": right();
		break;
		case "ArrowLeft": left();
		break;
		case "Enter": board.resetMove();
		break;
	}
	draw(board);
} 

function draw(board) {
	var player1=document.getElementById("player1");
	var player2=document.getElementById("player2");
	player1.innerHTML=board.player1.hp;
	player2.innerHTML=board.player2.hp;

	var damagep1=document.getElementById("weaponp1");
	var damagep2=document.getElementById("weaponp2");
	damagep1.innerHTML=board.player1.weapon.damage;
	damagep2.innerHTML=board.player2.weapon.damage;

	var canvas = document.getElementById("canvas");
	canvas.innerHTML="";
	
	for (var i=0;i<board.map.length;i++) {
		for (var j=0;j<board.map.length;j++) {
			var box = document.createElement("div");
			box.innerHTML = "&nbsp;";
			if (board.map[i][j]==board.GRASS){box.setAttribute("class", "box grass");}
			else if (board.map[i][j]==board.STONE) {box.setAttribute("class", "box stone");}
			else if (board.map[i][j]==board.WEAPON1) {box.setAttribute("class", "box weapon1");}
			else if (board.map[i][j]==board.WEAPON2) {box.setAttribute("class", "box weapon2");}
			else if (board.map[i][j]==board.WEAPON3) {box.setAttribute("class", "box weapon3");}
			else if (board.map[i][j]==board.PLAYER1) {box.setAttribute("class", "box player1");}
			else if (board.map[i][j]==board.PLAYER2) {box.setAttribute("class", "box player2");}
			canvas.appendChild(box);
		}
	} 
}	

function up(){
	var x=board.currentPlayer.X;
	var y=board.currentPlayer.Y;
	if(x-1>=0){
		if(board.map[x-1][y]==board.GRASS) {
			board.map[x-1][y]=board.currentPlayer.id;
			board.currentPlayer.setPosition(x-1,y);
			board.map[x][y]=board.GRASS;
			board.increaseMove();
		} 
		else if (board.map[x-1][y]>=board.WEAPON1 && board.map[x-1][y]<=board.WEAPON3) {
			if (board.currentPlayer.weapon.id == -1) {
				board.currentPlayer.weapon=board.weapons[board.map[x-1][y]];
				board.map[x-1][y]=board.currentPlayer.id;
				board.currentPlayer.setPosition(x-1,y);
				board.map[x][y]=board.GRASS;
				board.increaseMove();
			} 
			else {
				board.map[x][y]=board.WEAPONS[board.currentPlayer.weapon.id]; //let current map to have the current weapon
				board.currentPlayer.weapon=board.weapons[board.map[x-1][y]]; //let player to get the next weapon
				board.map[x-1][y]=board.currentPlayer.id; // currentplayer moves
				board.currentPlayer.setPosition(x-1,y); //let currentplayer position
				board.increaseMove();
			}
			
		}
		else if (board.map[x-1][y]>=board.PLAYER1 && board.map[x-1][y]<=board.PLAYER2){
			action();
			action();
		

			if (board.currentPlayer.attack = true && board.otherPlayer().attack = true) {
				board.currentPlayer.hp = board.currentPlayer.hp - board.otherPlayer().weapon.damage;
				board.otherPlayer().hp = board.otherPlayer().hp - board.currentPlayer.weapon.damage;				
				board.currentPlayer.weapon["damage"]=0;
				board.otherPlayer().weapon["damage"]=0;
			}

			else if (board.currentPlayer.attack = true && board.otherPlayer().attack = false) {				
				board.otherPlayer().hp = board.otherPlayer().hp - board.currentPlayer.weapon.damage * 0.5;				
				board.currentPlayer.weapon["damage"]=0;			
			}

			else if (board.currentPlayer.attack = false && board.otherPlayer().attack = true) {
				board.currentPlayer.hp = board.currentPlayer.hp - board.otherPlayer.weapon.damage * 0.5;				
				board.otherPlayer().weapon["damage"]=0;	
			}

			else if (board.currentPlayer.attack = false && board.otherPlayer().attack = false) {
				board.currentPlayer.hp = board.currentPlayer.hp;
				board.otherPlayer().hp = board.otherPlayer().hp;
			}

			var player2=document.getElementById("player2");
			var damagep1=document.getElementById("weaponp1");
			var player1=document.getElementById("player1");
			var damagep2=document.getElementById("weaponp2");
			player1.innerHTML=board.player1.hp;
			damagep2.innerHTML=board.player2.weapon.damage;
			player2.innerHTML=board.player2.hp;
			damagep1.innerHTML=board.player1.weapon.damage;
			var usedWeapons = [board.player1.weapon.id,board.player2.weapon.id];
			for (var i=0; i<usedWeapons.length; i++) {
				var j = 0;
	    		while (j<1)
	    		{
					var x = Math.floor(Math.random() * this.size);//generate x = random number between 0 to size -1
					var y = Math.floor(Math.random() * this.size);//generate y = random number between 0 to size -1

					if (this.map[x][y] == this.GRASS) {
						board.map[x][y]=board.weapons[i]; 
						board.weapons[board.weapons[i]].setPosition(x,y);
						j++;
            		}
            	}
			}

			if (board.player1.hp<=0) {
				alert("Player2 wins!");
			}
			else if(board.player2.hp<=0) {
				alert("Player1 wins!");
			}

		
		}
	} 
}	


function down(){
	var x=board.currentPlayer.X;
	var y=board.currentPlayer.Y;
	if(x+1<=10){
		if(board.map[x+1][y]==board.GRASS) {
			board.map[x+1][y]=board.currentPlayer.id;
			board.currentPlayer.setPosition(x+1,y);
			board.map[x][y]=board.GRASS;
			board.increaseMove();
			
		}
		else if (board.map[x+1][y]>=board.WEAPON1 && board.map[x+1][y]<=board.WEAPON3) 
		{
			if (board.currentPlayer.weapon.id == -1) {
				board.currentPlayer.weapon=board.weapons[board.map[x+1][y]];
				board.map[x+1][y]=board.currentPlayer.id;
				board.currentPlayer.setPosition(x+1,y);
				board.map[x][y]=board.GRASS;
				board.increaseMove();
			} 
			else {
				board.map[x][y]=board.WEAPONS[board.currentPlayer.weapon.id];
				board.currentPlayer.weapon=board.weapons[board.map[x+1][y]];
				board.map[x+1][y]=board.currentPlayer.id;
				board.currentPlayer.setPosition(x+1,y);
				board.increaseMove();
			}
			
		}
		else if (board.map[x+1][y]>=board.PLAYER1 && board.map[x+1][y]<=board.PLAYER2){
			 document.getElementById('myModal').innerHTML;
			 document.getElementById('myModal').innerHTML;
			
			if (document.getElementById('attack1').checked && document.getElementById('attack2').checked) {
				board.player2.hp = board.player2.hp - board.player1.weapon.damage;
				board.player1.hp = board.player1.hp - board.player2.weapon.damage;
				board.player2.weapon["damage"]=0;
				board.player1.weapon["damage"]=0;
			}

			else if (document.getElementById('attack1').checked && document.getElementById('defend2').checked) {
				if (board.currentPlayer.id==board.PLAYER1) {
					board.player2.hp = board.player2.hp - board.player1.weapon.damage * 0.5;
					board.player1.weapon["damage"]=0;
				}
				else if (board.currentPlayer.id==board.PLAYER2) {
					board.player1.hp = board.player1.hp - board.player2.weapon.damage * 0.5;
					board.player2.weapon["damage"]=0;
				}
			}

			else if (document.getElementById('defend1').checked && document.getElementById('defend2').checked) {
				board.player2.hp = board.player2.hp;
				board.player1.hp = board.player1.hp;
			}

			else if (document.getElementById('defend1').checked && document.getElementById('attack2').checked) {
				if (board.currentPlayer.id==board.PLAYER1) {
					board.player1.hp = board.player1.hp - board.player2.weapon.damage * 0.5;
					board.player2.weapon["damage"]=0;
				}
				else if (board.currentPlayer.id==board.PLAYER2) {
					board.player2.hp = board.player2.hp - board.player1.weapon.damage * 0.5;
					board.player1.weapon["damage"]=0;
				}
			}

			var player2=document.getElementById("player2");
			var damagep1=document.getElementById("weaponp1");
			var player1=document.getElementById("player1");
			var damagep2=document.getElementById("weaponp2");
			player1.innerHTML=board.player1.hp;
			damagep2.innerHTML=board.player2.weapon.damage;
			player2.innerHTML=board.player2.hp;
			damagep1.innerHTML=board.player1.weapon.damage;
			var usedWeapons = [board.player1.weapon.id,board.player2.weapon.id];
			
			for (var i=0; i<usedWeapons.length; i++) {
				var j = 0;
	    		while (j<1)
	    		{
					var x = Math.floor(Math.random() * this.size);//generate x = random number between 0 to size -1
					var y = Math.floor(Math.random() * this.size);//generate y = random number between 0 to size -1

					if (this.map[x][y] == this.GRASS) {
						board.map[x][y]=board.weapons[i]; 
						board.weapons[board.weapons[i]].setPosition(x,y);
						j++;
            		}
            	}
			}

			if (board.player1.hp<=0) {
				alert("Player2 wins!");
			}
			else if(board.player2.hp<=0) {
				alert("Player1 wins!");
			}
		}
	}

}	

function right(){
	var x=board.currentPlayer.X;
	var y=board.currentPlayer.Y;
	if(y+1<=10){
		if(board.map[x][y+1]==board.GRASS) {
			board.map[x][y+1]=board.currentPlayer.id;
			board.currentPlayer.setPosition(x,y+1);
			board.map[x][y]=board.GRASS;
			board.increaseMove();
			
		}
		else if (board.map[x][y+1]>=board.WEAPON1 && board.map[x][y+1]<=board.WEAPON3) 
		{
			if (board.currentPlayer.weapon.id == -1) {
				board.currentPlayer.weapon=board.weapons[board.map[x][y+1]];
				board.map[x][y+1]=board.currentPlayer.id;
				board.currentPlayer.setPosition(x,y+1);
				board.map[x][y]=board.GRASS;
				board.increaseMove();
			}
			else {
				board.map[x][y]=board.WEAPONS[board.currentPlayer.weapon.id];
				board.currentPlayer.weapon=board.weapons[board.map[x][y+1]];
				board.map[x][y+1]=board.currentPlayer.id;
				board.currentPlayer.setPosition(x,y+1);
				board.increaseMove();
			}
			
		}
		else if (board.map[x][y+1]>=board.PLAYER1 && board.map[x][y+1]<=board.PLAYER2){
			document.getElementById('myModal').innerHTML;
			document.getElementById('myModal').innerHTML;
			

			if (document.getElementById('attack1').checked && document.getElementById('attack2').checked) {
				board.player2.hp = board.player2.hp - board.player1.weapon.damage;
				board.player1.hp = board.player1.hp - board.player2.weapon.damage;
				board.player2.weapon["damage"]=0;
				board.player1.weapon["damage"]=0;
			}

			else if (document.getElementById('attack1').checked && document.getElementById('defend2').checked) {
				if (board.currentPlayer.id==board.PLAYER1) {
					board.player2.hp = board.player2.hp - board.player1.weapon.damage * 0.5;
					board.player1.weapon["damage"]=0;
				}
				else if (board.currentPlayer.id==board.PLAYER2) {
					board.player1.hp = board.player1.hp - board.player2.weapon.damage * 0.5;
					board.player2.weapon["damage"]=0;
				}
			}

			else if (document.getElementById('defend1').checked && document.getElementById('defend2').checked) {
				board.player2.hp = board.player2.hp;
				board.player1.hp = board.player1.hp;
			}

			else if (document.getElementById('defend1').checked && document.getElementById('attack2').checked) {
				if (board.currentPlayer.id==board.PLAYER1) {
					board.player1.hp = board.player1.hp - board.player2.weapon.damage * 0.5;
					board.player2.weapon["damage"]=0;
				}
				else if (board.currentPlayer.id==board.PLAYER2) {
					board.player2.hp = board.player2.hp - board.player1.weapon.damage * 0.5;
					board.player1.weapon["damage"]=0;
				}
			}

			var player2=document.getElementById("player2");
			var damagep1=document.getElementById("weaponp1");
			var player1=document.getElementById("player1");
			var damagep2=document.getElementById("weaponp2");
			player1.innerHTML=board.player1.hp;
			damagep2.innerHTML=board.player2.weapon.damage;
			player2.innerHTML=board.player2.hp;
			damagep1.innerHTML=board.player1.weapon.damage;
			var usedWeapons = [board.player1.weapon.id,board.player2.weapon.id];
			for (var i=0; i<usedWeapons.length; i++) {
				var j = 0;
	    		while (j<1)
	    		{
					var x = Math.floor(Math.random() * this.size);//generate x = random number between 0 to size -1
					var y = Math.floor(Math.random() * this.size);//generate y = random number between 0 to size -1

					if (this.map[x][y] == this.GRASS) {
						board.map[x][y]=board.weapons[i]; 
						board.weapons[board.weapons[i]].setPosition(x,y);
						j++;
            		}
            	}
			}
			if (board.player1.hp<=0) {
				alert("Player2 wins!");
			}
			else if(board.player2.hp<=0) {
				alert("Player1 wins!");
			}

		}
	}

}	

function left(){
	var x=board.currentPlayer.X;
	var y=board.currentPlayer.Y;
	if(y-1>=0){
		if(board.map[x][y-1]==board.GRASS) {
			board.map[x][y-1]=board.currentPlayer.id;
			board.currentPlayer.setPosition(x,y-1);
			board.map[x][y]=board.GRASS;
			board.increaseMove();
			
		}
		else if (board.map[x][y-1]>=board.WEAPON1 && board.map[x][y-1]<=board.WEAPON3) 
		{
			if (board.currentPlayer.weapon.id == -1) {
				board.currentPlayer.weapon=board.weapons[board.map[x][y-1]];
				board.map[x][y-1]=board.currentPlayer.id;
				board.currentPlayer.setPosition(x,y-1);
				board.map[x][y]=board.GRASS;
				board.increaseMove();
			}
			else {
				board.map[x][y]=board.WEAPONS[board.currentPlayer.weapon.id];
				board.currentPlayer.weapon=board.weapons[board.map[x][y-1]];
				board.map[x][y-1]=board.currentPlayer.id;
				board.currentPlayer.setPosition(x,y-1);
				board.increaseMove();
			}
			
		}

		else if (board.map[x][y-1]>=board.PLAYER1 && board.map[x][y-1]<=board.PLAYER2){
			document.getElementById('myModal').innerHTML;
			document.getElementById('myModal').innerHTML;

			if (document.getElementById('attack1').checked && document.getElementById('attack2').checked) {
				board.player2.hp = board.player2.hp - board.player1.weapon.damage;
				board.player1.hp = board.player1.hp - board.player2.weapon.damage;
				board.player2.weapon["damage"]=0;
				board.player1.weapon["damage"]=0;
			}

			else if (document.getElementById('attack1').checked && document.getElementById('defend2').checked) {
				if (board.currentPlayer.id==board.PLAYER1) {
					board.player2.hp = board.player2.hp - board.player1.weapon.damage * 0.5;
					board.player1.weapon["damage"]=0;
				}
				else if (board.currentPlayer.id==board.PLAYER2) {
					board.player1.hp = board.player1.hp - board.player2.weapon.damage * 0.5;
					board.player2.weapon["damage"]=0;
				}
			}

			else if (document.getElementById('defend1').checked && document.getElementById('defend2').checked) {
				board.player2.hp = board.player2.hp;
				board.player1.hp = board.player1.hp;
			}

			else if (document.getElementById('defend1').checked && document.getElementById('attack2').checked) {
				if (board.currentPlayer.id==board.PLAYER1) {
					board.player1.hp = board.player1.hp - board.player2.weapon.damage * 0.5;
					board.player2.weapon["damage"]=0;
				}
				else if (board.currentPlayer.id==board.PLAYER2) {
					board.player2.hp = board.player2.hp - board.player1.weapon.damage * 0.5;
					board.player1.weapon["damage"]=0;
				}
			}

			var player2=document.getElementById("player2");
			var damagep1=document.getElementById("weaponp1");
			var player1=document.getElementById("player1");
			var damagep2=document.getElementById("weaponp2");
			player1.innerHTML=board.player1.hp;
			damagep2.innerHTML=board.player2.weapon.damage;
			player2.innerHTML=board.player2.hp;
			damagep1.innerHTML=board.player1.weapon.damage;
			
			var usedWeapons = [board.player1.weapon.id,board.player2.weapon.id];
			for (var i=0; i<usedWeapons.length; i++) {
				var j = 0;
	    		while (j<1)
	    		{
					var x = Math.floor(Math.random() * board.size);//generate x = random number between 0 to size -1
					var y = Math.floor(Math.random() * board.size);//generate y = random number between 0 to size -1

					if (board.map[x][y] == board.GRASS) {
						board.map[x][y]=board.weapons[i]; 
						board.weapons[board.weapons[i]].setPosition(x,y);
						j++;
            		}
            	}
			}
			if (board.player1.hp<=0) {
				alert("Player2 wins!");
			}
			else if(board.player2.hp<=0) {
				alert("Player1 wins!");
			}

		}
	
	}
}



