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
// Tutorial 6
// THE RESOLUTION, FRAME SIZE
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// If you resize your browser, or go to fullscreen mode and come back
// you'll see that the ratio of the width of the first color to the
// second color changes with screen size.
// It is because we set the width of the strip in absolute number of
// pixels, rather than as a proportion of the screen width and height.
//
// Say we want to paint the left and right halves with different colors.
// Without knowing the number of pixels horizontally, we cannot prepare
// a shader that works on all frame sizes.
// 
// How can we learn the screen size (the width and height) in terms of 
// the number of pixel. It is given us in the variable "iResolution".
// "iResolution.x" is the width of the frame, and
// "iResolution.y" is the height of the frame

// Zoe Sandoval
// From Matthew Ragan's port to TouchDesigner, 
// "iResolution is provided by shaderToy as a variable",
// so we must write our own uniform which I've called u_resolution.

#define PI 3.1415

uniform vec2 u_resolution;
//uniform vec2 u_mouse;
uniform float u_time;

//functions

void main() {
	vec2 st			= gl_FragCoord.st / u_resolution;
	//vec2 mouse 		= u_mouse / u_resolution; 

	// Uğur Güney
	// choose two colors
	vec3 color1 		= vec3(0.741, 0.635, 0.471);
	vec3 color2 		= vec3(0.192, 0.329, 0.439);
	vec3 pixel;
	
	// sugar syntax for "if" conditional. It says
	// "if the x coordinate of a pixel is greater than the half of
	// the width of the screen, then use color1, otherwise use
	// color2."
	pixel 				= ( gl_FragCoord.x > u_resolution.x / 2.0 ) ? color1 : color2;
	
	gl_FragColor	= vec4(pixel, 1.0);

}
