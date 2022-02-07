

$(window).load(function(){


// hide the hidden image

$('.hidden-image').hide();

//---------------------------------------
// Set up ball options
//---------------------------------------
var images = ["B01.png", "B02.png", "B03.png"];


var ballCount = 1,                                     // How many balls
    countBalls=0,
	DAMPING = 0.3,                                       // Damping
	GRAVITY = 1,                                       // Gravity strength
	SPEED = 0.3,                                         // Ball speed
	ballAdditionTime = 1,                              // How fast are balls added
	ballSrc = 'B01.png', // Ball image source
	ballSize = 90,                                      // initial ball size
	topOffset = 800,                                     // Adjust this for initial ball spawn point
	xOffset = 0,                                         // left offset
	yOffset = 0,                                         // bottom offset
	ballDensity = 20,                                    // How dense are the balls
	ball_1_size = 20,                                   // Ball 1 size
	ball_2_size = 10,                                   // Ball 2 size
	canvasWidth = 1500,                                  // Canvas width
	canvasHeight = 1000,                                 // Canvas height
	stackBall = true,                                    // Stack the balls (or false is overlap)
	ballsLoaded = 0,
	stopAnimation = false,
	rss =12;var i =0;

//---------------------------------------
//---------------------------------------
//---------------------------------------

// Canvas sizes for different breakpoints

function doQueryCheck(size1=50,size2=50) {
  // console.log(balls.length);

	if ($(".small-desktop").css("float") === "none" ){
		canvasWidth = 1224;
		canvasHeight = 1000;
		ball_1_size = size1;
		ball_2_size = size2;
		ballCount = 2;
		// $('.phone').text("small desktop");
	}


}


//---------------------------------------
// Canvas globals
//---------------------------------------

var canvas,
	ctx,
	TWO_PI = Math.PI * 2,
	balls = [],
	vel_x,
	vel_y;

var rect = {
		x: 0,
		y: 0,
		w: canvasWidth,
		h: canvasHeight
};

//---------------------------------------
// do the animation
//---------------------------------------

window.requestAnimFrame =
	window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback) {
		window.setTimeout(callback, ballAdditionTime);
	};

//---------------------------------------
// set up the ball
//---------------------------------------

var Ball = function(x, y, radius, width, height) {
	this.x = x;
	this.y = y;
	this.px = x;
	this.py = y;
	this.fx = 0;
	this.fy = 0;
	this.radius = radius;

	// 2 Different ball sizes

	if( Math.round(Math.random()) === 0) {
		this.width = 205;
		this.height = 32;
		if (stackBall) {
			this.radius = 205/7.5;
			// this.radius = 205/7.5;
		}
	} else {
		this.width = 180;
		this.height = 32;
		if (stackBall) {
			this.radius = 205/7.5;
		}
	};
};

//---------------------------------------
// Apply the physics
//---------------------------------------

Ball.prototype.apply_force = function(delta) {
	delta *= delta;
	this.fy += GRAVITY;
	this.x += this.fx * delta;
	this.y += this.fy * delta;
	this.fx = this.fy = 0;
};

//---------------------------------------
// Newtonian motion algorithm
//---------------------------------------

Ball.prototype.velocity = function() {
	var nx = (this.x * 2) - this.px;
	var ny = (this.y * 2) - this.py;
	this.px = this.x;
	this.py = this.y;
	this.x = nx;
	this.y = ny;
};

//---------------------------------------
// Ball prototype
//---------------------------------------

Ball.prototype.draw = function(ctx) {

	// Wireframe ball
	// ctx.beginPath();
		// ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
		// ctx.stroke();

	img = new Image();
	img.src = 'B01.png';

		ctx.drawImage(img, this.x-this.radius-xOffset, this.y-this.radius-xOffset, this.width, this.height);

};
Ball.prototype.draww = function(ctx) {

	// Wireframe ball
	// ctx.beginPath();
		// ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
		// ctx.stroke();

	imgg = new Image();
	imgg.src = 'B03.png';

		ctx.drawImage(imgg, this.x-this.radius-xOffset, this.y-this.radius-xOffset, this.width, this.height);

};
Ball.prototype.drawww = function(ctx) {

	// Wireframe ball
	// ctx.beginPath();
		// ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
		// ctx.stroke();

	imggg = new Image();
	imggg.src = 'B02.png';

		ctx.drawImage(imggg, this.x-this.radius-xOffset, this.y-this.radius-xOffset, this.width, this.height);

};


//---------------------------------------
// resolve collisions (ball on ball)
//---------------------------------------

var resolve_collisions = function(ip) {
	var i = balls.length;
	while (i--) {

		var ball_1 = balls[i];
		var n = balls.length;
		while (n--) {

			if (n == i) continue;
			var ball_2 = balls[n];
			var diff_x = ball_1.x - ball_2.x;
			var diff_y = ball_1.y - ball_2.y;
			var length = diff_x * diff_x + diff_y * diff_y;
			var dist = Math.sqrt(length);
			var real_dist = dist - (ball_1.radius + ball_2.radius);

			if (real_dist < 0) {

				var vel_x1 = ball_1.x - ball_1.px;
				var vel_y1 = ball_1.y - ball_1.py;
				var vel_x2 = ball_2.x - ball_2.px;
				var vel_y2 = ball_2.y - ball_2.py;
				var depth_x = diff_x * (real_dist / dist);
				var depth_y = diff_y * (real_dist / dist);
				ball_1.x -= depth_x * 0.5;
				ball_1.y -= depth_y * 0.5;
				ball_2.x += depth_x * 0.5;
				ball_2.y += depth_y * 0.5;

				if (ip) {
					var pr1 = DAMPING * (diff_x * vel_x1 + diff_y * vel_y1) / length,
						pr2 = DAMPING * (diff_x * vel_x2 + diff_y * vel_y2) / length;

					vel_x1 += pr2 * diff_x - pr1 * diff_x;
					vel_x2 += pr1 * diff_x - pr2 * diff_x;
					vel_y1 += pr2 * diff_y - pr1 * diff_y;
					vel_y2 += pr1 * diff_y - pr2 * diff_y;
					ball_1.px = ball_1.x - vel_x1;
					ball_1.py = ball_1.y - vel_y1;
					ball_2.px = ball_2.x - vel_x2;
					ball_2.py = ball_2.y - vel_y2;
				}
			}
		}
	}
};

//---------------------------------------
// Bounce off the walls
//---------------------------------------

var check_walls = function() {
	var i = balls.length;
	while (i--) {
		var ball = balls[i];
 ball.radius=10;
ball.x = balls.length % 2 == 0 ? 20 : 15;
// console.warn(ball.x);

// ball.radius=10;
		if (ball.x < ball.radius) {

			var vel_x = ball.px - ball.x;
				ball.x = ball.radius;
				ball.px = ball.x - vel_x * DAMPING;

		} else if (ball.x + ball.radius > canvas.width) {

			vel_x = ball.px - ball.x;
			ball.x = canvas.width - ball.radius;
			ball.px = ball.x - vel_x * DAMPING;

		}

		// Ball is new. So don't do collision detection until it hits the canvas. (with an offset to stop it snapping)
		if (ball.y > 100) {
			if (ball.y < ball.radius) {

				var vel_y = ball.py - ball.y;
					ball.y = ball.radius;
					ball.py = ball.y - vel_y * DAMPING;

			} else if (ball.y + ball.radius >canvas.height) {

				vel_y = ball.py - ball.y;
				ball.y = canvas.height - ball.radius;
				ball.py = ball.y - vel_y * DAMPING;

			}
		}
	}
};


//---------------------------------------
// Add a ball to the canvas
//---------------------------------------

var add_ball = function(x, y, r) {
	x = x || Math.random() * (canvas.width),
	y = -topOffset,
	r = r || 30 + Math.random() * ballDensity,
	s = true,
	i = balls.length;

	while (i--) {
		var ball = balls[i];
		var diff_x = ball.x - x;
		var diff_y = ball.y - y;
		var dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);

		if (dist < ball.radius + r) {
			s = false;
			break;
		}
	}
	i = balls.length;

	if (s) {
		balls.push(new Ball(x, y, rss));
    // console.log(balls.length);

	}
  if( balls.length > 35) {
      // returns a random integer from 1 to 10
// balls.reverse();
balls.splice(0,balls.length - Math.floor((balls.length/2)));


  }

  // if(countBalls >100 && balls.length  ==100 ){
      // returns a random integer from 1 to 10
// balls.reverse();
// balls.splice(balls.length - Math.floor((countBalls/3.2))-30,balls.length - Math.floor((countBalls/3.2)));
//
//
//   }




};

var check = function(){
  if( (balls.length >10 && i == 20) || (countBalls >40 && i  ==40) ||(countBalls >300 && i  ==300)  || (countBalls >300 && i  ==400) || (countBalls >100 && i  ==500) || (countBalls >100 && i  ==600) || (countBalls >100 && i  ==700) || (countBalls >100 && i  ==800) || (countBalls >100 && i  ==900) || (countBalls >100 && i  ==1000) ) {
      // returns a random integer from 1 to 10
// balls.reverse();
balls.splice(0,balls.length - Math.floor((countBalls/5)));


  }

}
//---------------------------------------
// iterate balls
//---------------------------------------

var update = function() {
	var iter = 1;
	var delta = SPEED / iter;

	while (iter--) {

		var i = balls.length;
		while (i--) {
			balls[i].apply_force(delta);
			balls[i].velocity();
		}

		resolve_collisions();
		check_walls();

		i = balls.length;
		while (i--) {
			balls[i].velocity();
			var ball = balls[i];
		};

		resolve_collisions();
		check_walls();

	}

	ctx.clearRect(0, 0, canvas.width, canvas.height);
		i = balls.length;

		while (i--) {
				var xcc = Math.floor(Math.random() * 3)+1 ;

			if(i%3==0){
		balls[i].draww(ctx);
  }
		else if(i%3==1){
				balls[i].draw(ctx);
		}else {
      	balls[i].drawww(ctx);
    }
	}

	requestAnimFrame(update);
};



//---------------------------------------
// Set up the canvas object
//---------------------------------------

function doBalls() {
	stopAnimation = false;
	canvas = document.getElementById('balls');
	ctx = canvas.getContext('2d');
	container = $(canvas).parent();
	var $canvasDiv = $('.canvas-holder');

	function respondCanvas(){
		canvas.height = $canvasDiv.innerHeight();
		canvas.width = $canvasDiv.innerWidth();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	respondCanvas();

	// Android friendly window resize

	// var doit;
	// function resizedw(appwidth){
	// 	var window_changed = $(window).width() != appwidth;
	// 	if ($(window).width() != appwidth){
	//
	// 		// Reset everything on screen resize
	// 		//this.location.reload(false);
	// 				respondCanvas();
	// 	}
	// 	past_width = $(window).width();
	// }
	//
	// var past_width = $(window).width();
	//
	// window.onresize = function() {
	// 	clearTimeout(doit);
	// 	doit = setTimeout(function() {
	// 		resizedw(past_width);
	// 	}, 100);
	// };

	ballAdd();

	document.addEventListener( "click", active, false );

document.onload = setTimeout(function () { balls=[]; }, 1000);

// document.getElementById("did").addEventListener( "click", active, false );
// document.getElementById("editp").addEventListener( "click", addBulk, false );


  balls=[];

};




function ballAdd() {

	var count = 1;
	var timer = setInterval(function() {
		addBallTimer();
	}, 100);

	var addBallTimer = function() {
		count ++;
		add_ball();

		if (count === ballCount) {
			stopTimer();
		}
	}

	var stopTimer = function() {
		clearInterval(timer);
	}
	add_ball();

	update();
}
                   //  set your counter to 1

function myLoop () {
var cs = $("#editCount").val()*2;

	        //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
    add_ball(); countBalls++;       //  your code here
      i++;                     //  increment the counter
      if (i < cs) {            //  if the counter < 10, call the loop function
         myLoop();             //  ..  again which will trigger another
      }                        //  ..  setTimeout()
   }, 4000)
}

function addBulk() {

// 	var x = Math.floor(Math.random() * 3) ;
// ballSrc = images[x];

// add_ball();

// myLoop();

// console.log(img);
// console.log(countBalls);

// if(balls.length > 13){
//   balls.length = 4;
// }
balls=[];

var c = $("#editCount").val()
		countBalls=c;
    var bx = 0;
    if(c >200 ){
      bx = c/5
    }else {
      bx= c
    }


		$("#counter").html(countBalls);
		$("#current").val(countBalls);

    for (var i = 0; i < bx; i++) {

      (function (i) {
        setTimeout(function () {
          add_ball();
          check();

        }, 600*i);
      })(i);

    };






		}
function active() {
  // if(countBalls == 100 ){
  //   balls.length =50;
  // }
  // if(countBalls == 200 ){
  //   balls.length =70;
  // }
  // if(countBalls == 300 ){
  //   balls.length =100;
  // }
  // if(countBalls == 400 ){
  //   balls.length =130;
  // }
  // if(countBalls == 500 ){
  //   balls.length =150;
  // }
  // if(countBalls == 600 ){
  //   balls.length =170;
  // }
  // if(countBalls == 600 ){
  //   balls.length =190;
  // }
  // if(countBalls == 700 ){
  //   balls.length =200;
  // }
  // if(countBalls == 700 ){
  //   balls.length =200;
  // }
  // if(countBalls > 150 && countBalls  <= 200  ){
  //   balls.length =balls.length =Math.floor(Math.random() * 30) + 60;
  // }
  // if(countBalls > 200 && countBalls  <= 300  ){
  //   balls.length =Math.floor(Math.random() * 30) + 90;
  // }
  // if(balls.length > 300 && balls.length <= 400 ){
  //   balls.length =Math.floor(Math.random() * 60) + 90;
  // }
  // if(balls.length > 400 ){
  //   balls.length =300;
  // }
  // if(balls.length == 600 ){
  //   balls.length =500;
  // }
  // if(balls.length == 800 ){
  //   balls.length =700;
  // }
// 	var x = Math.floor(Math.random() * 3) ;
// ballSrc = images[x];

// for (var i = 0; i < 40; i++) {
// 	array[i]
// }
add_ball();
countBalls++;
// i=0;
// myLoop();
// console.log(img);
// console.log(balls);
// if(balls.length > 13){
//   balls.length -= 80;
// }
// var c = $("#editCount").val()
// 		countBalls=c;

		$("#counter").html(countBalls);
		$("#current").val(countBalls);





		}

/*
	This refers to media queries to do it's thing
*/

// Inject the canvas into the dom.

doQueryCheck();
doBalls();

});
