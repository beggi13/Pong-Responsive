// ==========
// BALL STUFF
// ==========

// BALL STUFF

var g_ball = {
    cx: g_canvas.width / 2,
    cy: g_canvas.height / 2,
    radius: g_canvas.height / 80,

    xVel: g_canvas.width / 100,
    yVel: g_canvas.height / 120,

    oldX : null,
    oldY : null
};

g_ball.resetPos = function (){
    this.radius = g_canvas.height / 60;

    this.xVel = this.xVel < 0 ? -g_canvas.width / 100 : g_canvas.width / 100;
    
    this.yVel = this.yVel < 0 ? -g_canvas.height / 120 : g_canvas.height / 120;
}

g_ball.update = function (du) {

    this.resetPos();

    if(this.oldX !== null) {
        this.cx = g_canvas.width / this.oldX;
        this.cy = g_canvas.height / this.oldY;
    }

    // Remember my previous position
    var prevX = this.cx;
    var prevY = this.cy;
    
    // Compute my provisional new position (barring collisions)
    var nextX = prevX + this.xVel * du;
    var nextY = prevY + this.yVel * du;

    // Bounce off the paddles
    if (g_paddle1.collidesWith(prevX, prevY, nextX, nextY, this.radius) ||
        g_paddle2.collidesWith(prevX, prevY, nextX, nextY, this.radius))
    {
        this.xVel *= -1;
    }
    
    // Bounce off top and bottom edges
    if (nextY < 0 ||                             // top edge
        nextY > g_canvas.height) {               // bottom edge
        this.yVel *= -1;
    }

    if (nextX < 0){
        g_score.p2++;
        this.xVel *= -1;
    }
    else if(nextX > g_canvas.width){
        g_score.p1++;
        this.xVel *= -1;
    }

    // Reset if we fall off the left or right edges
    // ...by more than some arbitrary `margin`
    //
    var margin = 4 * this.radius;
    if (nextX < -margin || 
        nextX > g_canvas.width + margin) {
        this.reset();
    }

    // *Actually* update my position 
    // ...using whatever velocity I've ended up with
    //
    this.cx += this.xVel * du;
    this.cy += this.yVel * du;

    this.oldX = g_canvas.width / this.cx;
    this.oldY = g_canvas.height / this.cy;
};

g_ball.reset = function () {
    this.cx = g_canvas.width / 2;
    this.cy = g_canvas.height / 2;
};

g_ball.render = function (ctx) {
    ctx.save();

    ctx.fillStyle = "blue";

    fillCircle(ctx, this.cx, this.cy, this.radius);

    ctx.restore();
};