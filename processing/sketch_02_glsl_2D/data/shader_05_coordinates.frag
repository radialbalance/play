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
// Tutorial 5
// THE COORDINATE SYSTEM
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// "fragCoord", "fragment coordinate" is an input variable.
//
// It tells us at which pixel we are on the screen. The coordinate center
// is the left bottom corner, and coordinate values increases towards
// right and upwards.
//
// The main function is run for each and every pixel on the screen. At
// each call the "gl_FracCoord" has the coordinates of the corresponding
// pixel.
//
// GPUs have many cores, so, the function calls for different pixels
// can be calculated in parallel at the same time.
// This allows higher speeds than the calculation of pixel colors one
// by one in series on the CPU. But, it puts an important constraint too:
// The value of a pixel cannot depend on the value of another pixel. (the
// calculations are done in parallel and it is impossible to know which
// one will finish before the other one)
// The outcome of a pixel can only depend on the pixel coordinate (and
// some other input variables.)
// This is the most important difference of shader programming. We'll
// come to this point again and again
//
// Let's draw something that is not a solid color.

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
	vec3 color1 = vec3(0.886, 0.576, 0.898);
	vec3 color2 = vec3(0.537, 0.741, 0.408);
	vec3 pixel;

	// vec3 color		= vec3(0.0);

	// if the x coordinate is greater than 100 then plot color1
	// else plot color2
	float widthOfStrip = 100.0;
	if( gl_FragCoord.x > widthOfStrip ) {
		pixel = color2;
	} else {
		pixel = color1;
	}
	
	gl_FragColor	= vec4(pixel, 1.0);

}
