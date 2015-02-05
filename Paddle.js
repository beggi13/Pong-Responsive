// A generic constructor which accepts an arbitrary descriptor object
function Paddle(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.

Paddle.prototype.halfWidth = g_canvas.width / 120;
Paddle.prototype.halfHeight = g_canvas.height / 15;
Paddle.prototype.xVel = g_canvas.width / 100;
Paddle.prototype.yVel = g_canvas.height / 80;
Paddle.prototype.fromEdge = g_canvas.width / 6;

Paddle.prototype.reset = function () {
    this.halfWidth = g_canvas.width / 120;
    this.halfHeight = g_canvas.height / 15;
    this.xVel = g_canvas.width / 100;
    this.yVel = g_canvas.height / 80;
    this.fromEdge = g_canvas.width / 6;
}

Paddle.prototype.update = function (du) {

    this.reset();

    if(this.oldX !== null) {
        this.cx = g_canvas.width / this.oldX;
        this.cy = g_canvas.height / this.oldY;
    }
    
    if (g_keys[this.GO_UP] && 
        this.cy > this.halfHeight) {
        this.cy -= this.yVel * du;
    } 
    else if (g_keys[this.GO_DOWN] && 
        this.cy < g_canvas.height - this.halfHeight) {
        this.cy += this.yVel * du;
    }


    var leftStop, rightStop;

    if(this.id === 1) {
        leftStop = 0;
        rightStop = this.fromEdge;
    }
    if(this.id === 2) {
        leftStop = this.fromEdge * 5;
        rightStop = g_canvas.width;
    }
    

    if(g_keys[this.GO_LEFT] &&
        this.cx > leftStop + this.halfWidth){
        this.cx -= this.xVel * du;
    }
    else if (g_keys[this.GO_RIGHT] &&
        this.cx < rightStop - this.halfWidth){
        this.cx += this.xVel * du;
    }

    this.oldX = g_canvas.width / this.cx;
    this.oldY = g_canvas.height / this.cy;
};

Paddle.prototype.render = function (ctx) {
    ctx.save();
    ctx.fillStyle = "white";
    // (cx, cy) is the centre; must offset it for drawing
    ctx.fillRect(this.cx - this.halfWidth,
                 this.cy - this.halfHeight,
                 this.halfWidth * 2,
                 this.halfHeight * 2);
    ctx.restore();
};

Paddle.prototype.collidesWith = function (prevX, prevY, 
                                          nextX, nextY, 
                                          r) {
    var paddleEdge = this.cx;
    // Check X coords
    if ((nextX - r < paddleEdge && prevX - r >= paddleEdge) ||
        (nextX + r > paddleEdge && prevX + r <= paddleEdge)) {
        // Check Y coords
        if (nextY + r >= this.cy - this.halfHeight &&
            nextY - r <= this.cy + this.halfHeight) {
            // It's a hit!
            return true;
        }
    }
    // It's a miss!
    return false;
};