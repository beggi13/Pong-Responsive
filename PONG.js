// "Crappy PONG" -- step by step
//
// Step 13: Simplify
/*

Supporting timer-events (via setInterval) *and* frame-events (via requestAnimationFrame)
adds significant complexity to the the code.

I can simplify things a little by focusing on the latter case only (which is the
superior mechanism of the two), so let's try doing that...

The "MAINLOOP" code, inside g_main, is much simplified as a result.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */
/*
var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8         9
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
*/
/*
g_canvas.update = function(du) {
    this.width = window.innerWidth - 5;
    this.height = window.innerHeight - 5;
}
*/
// ============
// PADDLE STUFF
// ============

// PADDLE 1

var KEY_W = 'W'.charCodeAt(0);
var KEY_S = 'S'.charCodeAt(0);
var KEY_A = 'A'.charCodeAt(0);
var KEY_D = 'D'.charCodeAt(0);

var g_paddle1 = new Paddle({
    cx : 50,
    cy : g_canvas.height / 2,
    id : 1,

    oldX : null,
    oldY : null,
    
    GO_UP   : KEY_W,
    GO_DOWN : KEY_S,
    GO_LEFT : KEY_A,
    GO_RIGHT : KEY_D
});

// PADDLE 2

var KEY_I = 'I'.charCodeAt(0);
var KEY_K = 'K'.charCodeAt(0);
var KEY_J = 'J'.charCodeAt(0);
var KEY_L = 'L'.charCodeAt(0);

var g_paddle2 = new Paddle({
    cx : window.innerWidth - 55,
    cy : (window.innerHeight-5) / 2,
    id : 2,

    oldX : null,
    oldY : null,
    
    GO_UP   : KEY_I,
    GO_DOWN : KEY_K,
    GO_LEFT : KEY_J,
    GO_RIGHT : KEY_L
});

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    
    g_canvas.update();

    g_ball.update(du);
    
    g_paddle1.update(du);
    g_paddle2.update(du);
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    g_canvas.render(ctx);
    g_ball.render(ctx);
    
    g_paddle1.render(ctx);
    g_paddle2.render(ctx);
}

// Kick it off
g_main.init();