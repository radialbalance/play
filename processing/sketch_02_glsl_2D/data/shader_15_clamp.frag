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
// Tutorial 15
// BUILT-IN FUNCTIONS: CLAMP
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// "clamp" function saturates the input below and above the thresholds
// f(x, min, max) = { max x>max
//                  { x   max>x>min
//                  { min min>x

#define PI 3.1415
#define TWOPI 6.28318530718

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
	
	vec2 st				= gl_FragCoord.xy / u_resolution;
	vec2 aspect 		= u_resolution/ u_resolution.x;
	st 					*= aspect;
	
	vec3 bgCol 						= vec3(0.0); // black
	vec3 col1 						= vec3(0.216, 0.471, 0.698); // blue
	vec3 col2 						= vec3(1.00, 0.329, 0.298); // yellow
	vec3 col3 						= vec3(0.867, 0.910, 0.247); // red

	vec3 pixel 						= bgCol;
	
	float edge, variable, ret;
	
	// divide the screen into four parts horizontally for different
	// examples
	if(st.x < 0.25) { // Part I
		ret 						= st.y; // the brightness value is assigned the y coordinate
		    						       // it'll create a gradient
	} 
	else if(st.x < 0.5) { // Part II
		float minVal 				= 0.3; // implementation of clamp
		float maxVal 				= 0.6;
		float variable 				= st.y;
		if( variable<minVal ) {
			ret 					= minVal;
		}
		if( variable>minVal && variable<maxVal ) {
			ret 					= variable;
		}
		if( variable>maxVal ) {
			ret 					= maxVal;
		}
	} 
	else if(st.x < 0.75) { // Part III
		float minVal 				= 0.6;
		float maxVal 				= 0.8;
		float variable 				= st.y;
		ret 						= clamp(variable, minVal, maxVal);
	} 
	else  { // Part IV
		float y 					= cos(5.*TWOPI*st.y); 	// oscillate between +1 and -1
		                             						// 5 times, vertically
		y 							= (y+1.0)*0.5; 			// map [-1,1] to [0,1]
		ret 						= clamp(y, 0.2, 0.8);
	}
	
	pixel 							= vec3(ret); // make a color out of return value.

	gl_FragColor	= vec4(pixel, 1.0);

}
