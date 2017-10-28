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

// "smoothstep" function is like step function but instead of a
// sudden jump from 0 to 1 at the edge, it makes a smooth transition
// in a given interval
// http://en.wikipedia.org/wiki/Smoothstep

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
	
	/// divide the screen into four parts horizontally for different
	// examples
	if(st.x < 1./5.) { // Part I
		float edge = 0.5;
		ret 						= step(edge, st.y); // simple step function
	} 
	else if(st.x < 2./5.) { // Part II
		// linearstep (not a builtin function)
		float edge0 				= 0.45;
		float edge1 				= 0.55;
		float t 					= (st.y - edge0)/(edge1 - edge0);
		// when st.y == edge0 => t = 0.0
		// when st.y == edge1 => t = 1.0
		// RHS is a linear function of y
		// so, between edge0 and edge1, t has a linear transition
		// between 0.0 and 1.0
		float t1 					= clamp(t, 0.0, 1.0);
		// t will have negative values when t<edge0 and
		// t will have greater than 1.0 values when t>edge1
		// but we want it be constraint between 0.0 and 1.0
		// so, clamp it!		
		ret 						= t1;
	} 
	else if(st.x < 3./5.) { // Part III
		// implementation of smoothstep
		float edge0 				= 0.45;
		float edge1 				= 0.55;
		float t 					= clamp((st.y - edge0)/(edge1 - edge0), 0.0, 1.0);
		float t1 					= 3.0*t*t - 2.0*t*t*t;
		// previous interpolation was linear. Visually it does not
		// give an appealing, smooth transition.
		// To achieve smoothness, implement a cubic Hermite polynomial
		// 3*t^2 - 2*t^3
		ret 						= t1;
	}
	else if(st.x < 4./5.) { // Part IV
		ret 						= smoothstep(0.45, 0.55, st.y);
	}
	else if(st.x < 5./5.) { // Part V
		// smootherstep, a suggestion by Ken Perlin
		float edge0 				= 0.45;
		float edge1 				= 0.55;
		float t 					= clamp((st.y - edge0)/(edge1 - edge0), 0.0, 1.0);		
		// 6*t^5 - 15*t^4 + 10*t^3
		float t1 					= t*t*t*(t*(t*6. - 15.) + 10.);
		ret 						= t1;
		// faster transition and still smoother
		// but computationally more involved.
	}	
		
	pixel 							= vec3(ret); // make a color out of return value.
	
	gl_FragColor	= vec4(pixel, 1.0);

}
