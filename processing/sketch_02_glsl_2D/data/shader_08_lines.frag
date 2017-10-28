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
// Tutorial 8
// VERTICAL AND HORIZONTAL LINES
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
	vec3 backgroundColor 			= vec3(1.0);
	vec3 color1 					= vec3(0.216, 0.471, 0.698);
	vec3 color2 					= vec3(1.00, 0.329, 0.298);
	vec3 color3 					= vec3(0.867, 0.910, 0.247);

	// start by setting the background color. If pixel's value
	// is not overwritten later, this color will be displayed.
	vec3 pixel 						= backgroundColor;
	
	// if the current pixel's x coordinate is between these values,
	// then put color 1.
	// The difference between 0.55 and 0.54 determines
	// the with of the line.
	float leftCoord 				= 0.54;
	float rightCoord 				= 0.55;
	if( st.x < rightCoord && st.x > leftCoord ) pixel = color1;
	
	// a different way of expressing a vertical line
    // in terms of its x-coordinate and its thickness:
	float lineCoordinate 			= 0.4;
	float lineThickness 			= 0.003;
	if(abs(st.x - lineCoordinate) < lineThickness) pixel = color2;
	
	// a horizontal line
	if(abs(st.y - 0.6)<0.01) pixel 	= color3;
	
	// see how the third line goes over the first two lines.
	// because it is the last one that sets the value of the "pixel".

	gl_FragColor	= vec4(pixel, 1.0);

}
