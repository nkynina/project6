
var board;
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
			board.currentPlayer.weapon=board.weapons[board.map[x-1][y]];
			board.map[x-1][y]=board.currentPlayer.id;
			board.currentPlayer.setPosition(x-1,y);
			board.map[x][y]=board.GRASS;
			board.increaseMove();
		}
		else if(board.currentPlayer.weapon.id!== -1) { // id not equal to -1 means weapon exits
			board.map[x][y]=board.weapons[board.currentPlayer.weapon.id]; //let current map to have the current weapon
			board.currentPlayer.weapon=board.weapons[board.map[x-1][y]]; //let player to get the next weapon
			board.map[x-1][y]=board.currentPlayer.id; // currentplayer moves
			board.currentPlayer.setPosition(x-1,y); //let currentplayer position
			board.increaseMove();
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
			board.currentPlayer.weapon=board.weapons[board.map[x+1][y]];
			board.map[x+1][y]=board.currentPlayer.id;
			board.currentPlayer.setPosition(x+1,y);
			board.map[x][y]=board.GRASS;
			board.increaseMove();
		}
		else if(board.currentPlayer.weapon.id!== -1) {
			board.map[x][y]=board.weapons[board.currentPlayer.weapon.id];
			board.currentPlayer.weapon=board.weapons[board.map[x+1][y]];
			board.map[x+1][y]=board.currentPlayer.id;
			board.currentPlayer.setPosition(x+1,y);
			board.increaseMove();
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
			board.currentPlayer.weapon=board.weapons[board.map[x][y+1]];
			board.map[x][y+1]=board.currentPlayer.id;
			board.currentPlayer.setPosition(x,y+1);
			board.map[x][y]=board.GRASS;
			board.increaseMove();
		}
		else if(board.currentPlayer.weapon.id!== -1) {
			board.map[x][y]=board.weapons[board.currentPlayer.weapon.id];
			board.currentPlayer.weapon=board.weapons[board.map[x][y+1]];
			board.map[x][y+1]=board.currentPlayer.id;
			board.currentPlayer.setPosition(x,y+1);
			board.increaseMove();
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
			board.currentPlayer.weapon=board.weapons[board.map[x][y-1]];
			board.map[x][y-1]=board.currentPlayer.id;
			board.currentPlayer.setPosition(x,y-1);
			board.map[x][y]=board.GRASS;
			board.increaseMove();
		}
		else if(board.currentPlayer.id!== -1) {
			board.map[x][y]=board.weapons[board.currentPlayer.weapon.id];
			board.currentPlayer.weapon=board.weapons[board.map[x][y-1]];
			board.map[x][y-1]=board.currentPlayer.id;
			board.currentPlayer.setPosition(x,y-1);
			board.increaseMove();
		}
	}
}	

