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
// Tutorial 4
// RGB COLOR MODEL AND COMPONENTS OF VECTORS
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

//
// After initialized, the components of vectors can be reached using
// the dot "." notation.
//
// RGB: http://en.wikipedia.org/wiki/RGB_color_model
// A color is represented by three numbers (here in the range [0.0, 1.0])
// The model assumes the addition of pure red, green and blue lights
// of given intensities.
//
// If you lack design skills like me, and having hard time
// in choosing nice looking, coherent set of colors 
// you can use one of these websites to choose color palettes, where
// you can browse different sets of colors 
// https://kuler.adobe.com/create/color-wheel/
// http://www.colourlovers.com/palettes
// http://www.colourlovers.com/colors

#define PI 3.1415

uniform vec2 u_resolution;
//uniform vec2 u_mouse;
uniform float u_time;

//functions

void main() {
	vec2 st			= gl_FragCoord.st / u_resolution;
	//vec2 mouse 		= u_mouse / u_resolution; 

	// Uğur Güney
	// play with these numbers:
	float redAmount 	= 0.6; // amount of redness
	float greenAmount 	= 0.2; // amount of greenness
	float blueAmount 	= 0.9; // amount of blueness

	vec3 color		= vec3(0.0);
	// Uğur Güney
	// Here we only input a single argument. It is a third way of
	// contructing vectors.
	// "vec3(x)" is equivalent to vec3(x, x, x);
	// This vector is initialized as
	// color.x = 0.0, color.y = 0.0; color.z = 0.0;
	color.x 			= redAmount;
	color.y 			= greenAmount;
	color.z 			= blueAmount;
	
	float alpha 		= 1.0;
	gl_FragColor	= vec4(color, alpha);

 	// Uğur Güney
	// Here we are seperating the color and transparency parts
	// of the vec4 that represents the pixels.

}
