#ifdef GL_ES
precision mediump float;
#endif

// GLSL 2D Tutorials | https://www.shadertoy.com/view/Md23DV
// Uğur Güney

/*
	by Uğur Güney. March 8, 2014. 

	Hi! I started learning GLSL a month ago. The speedup gained by using
	GPU to draw real-time graphics amazed me. If you want to learn
	how to write shaders, this tutorial written by a beginner can be
	a starting place for you.

	Please fix my coding errors and grammar errors. :-)
*/

// Ported to Processing by Zoe Sandoval
// zoesanodval.com

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Tutorial 7
// COORDINATE TRANSFORMATION
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Instead of working on screen coordinates, using our own coordinate
// system is more convenient most of the time.
//
// Here we will make and use a new coordinate system "r", instead of
// the absolute screen coordinates "fragCoord". In "r"
// the x and y coordinates will go from 0 to 1. For x, 0 is the left
// side and 1 is the right side. For y, 0 is the bottom side, and 1 is
// the upper side.
//
// Using "r" let's divide the screen into 3 parts.

// Zoe Sandoval
// Instead of calling it "r," I am going to call thew new system "st."
#define PI 3.1415

uniform vec2 u_resolution;
//uniform vec2 u_mouse;
uniform float u_time;

//functions

void main() {
	
	vec2 st				= gl_FragCoord.xy / u_resolution;
	vec3 color1 		= vec3(0.841, 0.582, 0.594);
	vec3 color2 		= vec3(0.884, 0.850, 0.648);
	vec3 color3 		= vec3(0.348, 0.555, 0.641);
	vec3 pixel;
	
	// sugar syntax for "if" conditional. It says
	// "if the x coordinate of a pixel is greater than the half of
	// the width of the screen, then use color1, otherwise use
	// color2."
	if( st.x < 1.0/3.0) {
		pixel 			= color1;
	} else if( st.x < 2.0/3.0 ) {
		pixel 			= color2;
	} else {
		pixel 			= color3;
	}
	
	gl_FragColor	= vec4(pixel, 1.0);

}
