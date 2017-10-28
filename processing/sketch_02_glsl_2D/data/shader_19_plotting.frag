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
// Tutorial 19
// FUNCTION PLOTTING
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// It is always useful to see the plots of functions on cartesian
// coordinate system, to understand what they are doing precisely
//
// Let's plot some 1D functions!
// 
// If y value is a function f of x value, the expression of their
// relation is: y = f(x)
// in other words, the plot of a function is all points
// that satisfy the expression: y-f(x)=0
// this set has 0 thickness, and can't be seen.
// Instead use the set of (x,y) that satisfy: -d < y-f(x) < d
// in other words abs(y-f(x)) < d
// where d is the thickness. (the thickness in in y direction)
// Because of the properties of absolute function, the condition
// abs(y-f(x)) < d is equivalent to the condition:
// abs(f(x) - y) < d
// We'll use this last one for function plotting. (in the previous one
// we have to negate the function that we want to plot)
// definitions


#define PI 3.1415
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
//uniform vec2 u_mouse;
uniform float u_time;

// functions
float linearstep(float edge0, float edge1, float x) {
	float t = (x - edge0)/(edge1 - edge0);
	return clamp(t, 0.0, 1.0);
}

float smootherstep(float edge0, float edge1, float x) {
	float t = (x - edge0)/(edge1 - edge0);
	float t1 = t*t*t*(t*(t*6. - 15.) + 10.);
	return clamp(t1, 0.0, 1.0);
}

void plot(vec2 r, float y, float lineThickness, vec3 color, inout vec3 pixel) {
	if( abs(y - r.y) < lineThickness ) pixel = color;
}

void main() {
	
	vec2 st				= (gl_FragCoord.xy / u_resolution) * 2 - 1;
	float ts			= gl_FragCoord.x / u_resolution.x;
	vec2 aspect 		= u_resolution/ u_resolution.x;
	st 					*= aspect;
	
	vec3 bgCol 															= vec3(1.0);
	vec3 axesCol 														= vec3(0.0, 0.0, 1.0);
	vec3 gridCol 														= vec3(0.5);
	vec3 col1 															= vec3(0.841, 0.582, 0.594);
	vec3 col2 															= vec3(0.884, 0.850, 0.648);
	vec3 col3 															= vec3(0.348, 0.555, 0.641);	

	vec3 pixel 															= bgCol;
	
	// Draw grid lines
	const float tickWidth 												= 0.1;
	for(float i=-2.0; i<2.0; i+=tickWidth) {
		// "i" is the line coordinate.
		if(abs(st.x - i)<0.004) pixel 									= gridCol;
		if(abs(st.y - i)<0.004) pixel 									= gridCol;
	}
	// Draw the axes
	if( abs(st.x)<0.006 ) pixel											= axesCol;
	if( abs(st.y)<0.007 ) pixel											= axesCol;
	
	// Draw functions
	float x 															= st.x;
	float y 															= st.y;
	// pink functions
	// y = 2*x + 5
	if( abs(2.*x + .5 - y) < 0.02 ) pixel 								= col1;
	// y = x^2 - .2
	if( abs(st.x*st.x-0.2 - y) < 0.01 ) pixel 							= col1;
	// y = sin(PI x)
	if( abs(sin(PI*st.x) - y) < 0.02 ) pixel 							= col1;
	
	// blue functions, the step function variations
	// (functions are scaled and translated vertically)
	if( abs(0.25*step(0.0, x)+0.6 - y) < 0.01 ) pixel 					= col3;
	if( abs(0.25*linearstep(-0.5, 0.5, x)+0.1 - y) < 0.01 ) pixel 		= col3;
	if( abs(0.25*smoothstep(-0.5, 0.5, x)-0.4 - y) < 0.01 ) pixel 		= col3;
	if( abs(0.25*smootherstep(-0.5, 0.5, x)-0.9 - y) < 0.01 ) pixel 	= col3;
	
	// yellow functions
	// have a function that plots functions :-)
	plot(st, 0.5*clamp(sin(TWO_PI*x), 0.0, 1.0)-0.7, 0.015, col2, pixel);
	// bell curve around -0.5
	plot(st, 0.6*exp(-10.0*(x+0.8)*(x+0.8)) - 0.1, 0.015, col2, pixel);
	
	// in the future we can use this framework to see the plot of functions
	// and design and find functions for our liking
	// Actually using Mathematica, Matlab, matplotlib etc. to plot functions
	// is much more practical. But they need a translation of functions 
	// from GLSL to their language. Here we can plot the native implementations
	// of GLSL functions.

	gl_FragColor	= vec4(pixel, 1.0);

}
