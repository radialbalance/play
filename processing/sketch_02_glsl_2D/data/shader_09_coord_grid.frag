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
// Tutorial 9
// VISUALIZING THE COORDINATE SYSTEM
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Let's use a for loop and horizontal and vertical lines to draw
// a grid of the coordinate center

#define PI 3.1415

uniform vec2 u_resolution;
//uniform vec2 u_mouse;
uniform float u_time;

//functions

void main() {
	
	vec2 st				= gl_FragCoord.xy / u_resolution;
	
	vec3 backgroundColor 			= vec3(1.0);
	vec3 axesColor 					= vec3(0.0, 0.0, 1.0);
	vec3 gridColor 					= vec3(0.5);

	// start by setting the background color. If pixel's value
	// is not overwritten later, this color will be displayed.
	vec3 pixel 						= backgroundColor;
	
	// Draw the grid lines
	// we used "const" because loop variables can only be manipulated
	// by constant expressions.
	const float tickWidth 			= 0.1;
	for(float i=0.0; i<1.0; i+=tickWidth) {
		// "i" is the line coordinate.
		if(abs(st.x - i)<0.002) pixel = gridColor;
		if(abs(st.y - i)<0.002) pixel = gridColor;
	}
	// Draw the axes
	if( abs(st.x)<0.005 ) pixel 		= axesColor;
	if( abs(st.y)<0.006 ) pixel 		= axesColor;

	gl_FragColor	= vec4(pixel, 1.0);

}
