//Snakes Game
//Game Loop -Init ,Draw,Update
//add boundari condition 
//html local storage api
// make resposive another screen
//if alert dilog box game over
function init(){
    //console.log("Init");
    //we will first fetch these #mycanvas canvas
    canvas=document.getElementById('mycanvas');
    pen=canvas.getContext('2d');//like takeing a pen to draw on a mycanvas bord
    W=canvas.width;
    H=canvas.height;
    game_over=false;
//food object
food=getRandomFood();
score=0;

    //snake ki pproperty
    snake={
     init_length:5,
     color:"yellow",
     cells:[],//cells is an array of object
     direction:"right",
     createSnake:function(){
        for(var i=this.init_length-1;i>=0;i--){
            this.cells.push({x:i,y:0});
        }
     },
     //har cells ko draw karna hai
     drawSnake:function(){
        for(var i=0;i<this.cells.length;i++){
         //jei color diye snake draw korbo
         pen.fillStyle=this.color;
         pen.strokeStyle="black";//border bananor jonno
         pen.lineWidth=5;
         //stroke bananna hai
         pen.strokeRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
         //cells banana hai
         pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
        }
     },
     //snake moving
     updateSnake:function(){
    var headX=this.cells[0].x;
    var headY=this.cells[0].y;
    //Asumming snake is moving right
    //Insertion at head
    // nextHeadX=headX+1;
     //this.cells.pop();
    // this.cells.unshift({x:nextHeadX,y:headY});
    //how the snake eat the food
    //jodi food khai tahole add hobe cells r food na khele cells pop hobe logic
    if(headX==food.x && headY==food.y){//head cornar food k corner se match ho rahai to definetly food kha liya snak ne
        food=getRandomFood();//new place draw the food 
         score++;
    }else{
        //pop last cell if food not eaten
        this.cells.pop();//r food na khele cell pop hobe
    }
    
    if(this.direction=="right"){
        nextX=headX+1;
        nextY=headY;
    }else if(this.direction=="left"){
        nextX=headX-1;
        nextY=headY;
    }else if(this.direction=="down"){
        nextX=headX;
        nextY=headY+1;
    }else{
        nextX=headX;
        nextY=headY-1;
    }
    //Insert the new cell at head/front
    this.cells.unshift({x:nextX,y:nextY});

//find out the last coordinate(boundaries)snake mane boundarie crouse korte gelei game over hoye jane
var last_x=Math.round(W/10);
var last_y=Math.round(H/10);
if(this.cells[0].y<0 || this.cells[0].x<0 ||
    this.cells[0].x>last_x || this.cells[0].y>last_y){
       //alert in in-browser javascript 
       let name=prompt("What is your name?","Guest");
       console.log(name); 
       alert("Game Over "+(name));
        game_over=true;
    }
    }
};
    snake.createSnake();
    //Add Event Listeners to our game
    //Listen for keyboard events
    function KeyPressed(e){
        console.log("You pressed a key");
        console.log(e);
        //keypressed se direction change hoga
        if(e.key=="ArrowRight"){
            snake.direction="right";
        }else if(e.key=="ArrowLeft"){
            snake.direction="left";
        }else if(e.key=="ArrowDown"){
            snake.direction="down";
        }else{
            snake.direction="up";
        }
    }

    document.addEventListener('keydown',KeyPressed);

    }
    function draw(){

    pen.clearRect(0,0,W,H);//every time you draw first clear old screen   
    snake.drawSnake(); //snake apne ap draw hobe
    console.log("In draw");

    //Lets us draw the food

    pen.fillStyle=food.color;
    pen.fillRect(food.x*10,food.y*10,10,10);//food size

    pen.fillStyle="white";//scorecolor
    pen.font="14px Roboto";
    pen.fillText("Score:"+score,10,10);
}
    function update(){
    snake.updateSnake();
    
    }
    
    function gameLoop(){
        draw();
        update();
//gameloop
if(game_over==true){
    clearInterval(f);
}

    }
    
function getRandomFood(){

    var foodX=Math.round(Math.random()*(W-10)/10);//beacuse food width ke under rahe jitna size snake hai utna size food er hoya uchit r food black box er size er modheye jate thake
    var foodY=Math.round(Math.random()*(H-10)/10); //tai w-20 and h-20 tahole boxer modheye thakbe[random mane 0 theke 1 er modheye jekhono random number ]

    foodColors=["red","green","aqua","coral","orchid"];//food colors
    var i=Math.round(Math.random()*foodColors.length);//random foodfoodColors=["red","green","aqua","coral","orchid"];//food colors

    var food={
    x:foodX,
    y:foodY,
    color:foodColors[i],
};
return food;
}    
    init();
   
var f=setInterval(gameLoop,100);//call game loop after t time
    //gameLoop();//ekbar kore call hobe
    