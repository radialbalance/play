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
// zoesandoval.com

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Tutorial 13
// FUNCTIONS
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Functions are great for code reuse. Let's put the code for disks
// into a function and use the function for drawing.
// There are so many different ways of writing a function to draw a shape.
//
// Here we have a void function that does not return anything. Instead,
// "pixel" is taken as an "inout" expression. "inout" is a unique
// keyword of GLSL.
// By default all arguments are "in" arguments. Which
// means, the value of the variable is given to the function scope
// from the scope the function is called. 
// An "out" variable gives the value of the variable from the function
// to the scope in which the function is called.
// An "inout" argument does both. First the value of the variable is
// sent to the function as its argument. Then, that variable is
// processed inside the function. When the function ends, the value
// of the variable is updated where the function is called.
//
// Here, the "pixel" variable that is initialized with the background
// color in the "main" function. Then, "pixel" is given to the "disk"
// function. When the if condition is satisfied the value of the "pixel"
// is changed with the "color" argument. If it is not satified, the
// "pixel" is left untouched and keeps it previous value (which was the
// "bgColor".


#define PI 3.1415

uniform vec2 u_resolution;
//uniform vec2 u_mouse;
uniform float u_time;

// functions
void disk(vec2 st, vec2 center, float radius, vec3 color, inout vec3 pixel) {
	if( length(st-center) < radius) {
		pixel = color;
	}
}


void main() {
	
	vec2 st				= (gl_FragCoord.xy / u_resolution) * 2 - 1;
	vec2 aspect 		= u_resolution/ u_resolution.x;
	st 					*= aspect;
	
	vec3 bgCol 			= vec3(0.3);
	vec3 col1 			= vec3(0.216, 0.471, 0.698); // blue
	vec3 col2			= vec3(1.00, 0.329, 0.298); // yellow
	vec3 col3 			= vec3(0.867, 0.910, 0.247); // red

	vec3 pixel 			= bgCol;
	
	disk(st, vec2(0.1, 0.3), 0.5, col3, pixel);
	disk(st, vec2(-0.8, -0.6), 1.5, col1, pixel);
	disk(st, vec2(0.8, 0.0), .15, col2, pixel);

	// As you see, the borders of the disks have "jagged" curves, where
	// individual pixels can be seen. This is called "aliasing". It occurs
	// because pixels have finite size and we want to draw a continuous
	// shape on a discontinuous grid.
	// There is a method to reduce the aliasing. It is done by mixing the
	// inside color and outside colors at the border. To achieve this
	// we have to learn some built-in functions.

	// And, again, note the order of disk function calls and how they are
	// drawn on top of each other. Each disk function manipulates
	// the pixel variable. If a pixel is manipulated by multiple disk
	// functions, the value of the last one is sent to fragColor.

	// In this case, the previous values are completely overwritten.
	// The final value only depends to the last function that manipulated
	// the pixel. There are no mixtures between layers.
	

	gl_FragColor	= vec4(pixel, 1.0);

}
