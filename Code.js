var canvas = document.getElementById('animation');

var image = new Image();
image.src = "SpriteSheet.png";

function sprite (options) {
	var that = {},
		frameIndex = 0,
		tickCount = 0,
		ticksPerFrame = ticksPerFrame || 20,
		numberOfFrames = options.numberOfFrames || 1;
	
	that.context = options.context;
	that.width = options.width;
	that.height = options.height;
	that.image = options.image;
	that.loop = options.loop;
	
	that.update = function () {
		tickCount += 1;
		
		if (tickCount > ticksPerFrame) {
			tickCount = 0;
			
			if (frameIndex < numberOfFrames - 1) {
				frameIndex += 1;
			} else if (that.loop) {
				frameIndex = 0;
			}
		}
	}
	
	that.render = function () {
		that.context.clearRect(0, 0, that.width, that.height);
		
		that.context.drawImage(
			that.image,
			frameIndex * that.width,
			0,
			that.width / numberOfFrames,
			that.height,
			0,
			0,
			that.width,
			that.height
		);
	};
	
	return that;
}

var box = sprite({
	context: canvas.getContext('2d'),
	width: 100,
	height: 100,
	image: image,
	numberOfFrames: 5,
	loop: true
});

function updateLoop () {
	box.update();
}

function renderLoop () {
	box.render();
}

function gameLoop () {
	updateLoop();
	renderLoop();
	
	console.log("Main Game Loop Ran");
	
	window.requestAnimationFrame(gameLoop);
}

gameLoop();