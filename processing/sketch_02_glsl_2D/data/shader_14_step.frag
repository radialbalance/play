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
// Tutorial 14
// BUILT-IN FUNCTIONS: STEP
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// "step" function is the Heaviside step function :-)
// http://en.wikipedia.org/wiki/Heaviside_step_function
// 
// f(x0, x) = {1 x>x0, 
//            {0 x<x0

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
	
	float xMax 						= u_resolution.x / u_resolution.y;
	
	vec3 bgCol 						= vec3(0.0); // black
	vec3 col1 						= vec3(0.216, 0.471, 0.698); // blue
	vec3 col2 						= vec3(1.00, 0.329, 0.298); // yellow
	vec3 col3 						= vec3(0.867, 0.910, 0.247); // red

	vec3 pixel 						= bgCol;
	
	float edge, variable, ret;
	
	// divide the screen into five parts horizontally
	// for different examples
	if(st.x < -0.6*xMax) { // Part I
		variable 					= st.y;
		edge 						= 0.2;
		if( variable > edge ) { // if the "variable" is greater than "edge"
			ret 					= 1.0;          // return 1.0
		} else {                // if the "variable" is less than "edge"
			ret 					= 0.0;          // return 0.0
		}
	} 
	else if(st.x < -0.2*xMax) { // Part II
		variable 					= st.y;
		edge 						= -0.2;
		ret 						= step(edge, variable); // step function is equivalent to the
		                            						// if block of the Part I
	} 
	else if(st.x < 0.2*xMax) { // Part III
		// "step" returns either 0.0 or 1.0.
		// "1.0 - step" will inverse the output
		ret 						= 1.0 - step(0.5, st.y); // Mirror the step function around edge
	} 
	else if(st.x < 0.6*xMax) { // Part IV
		// if y-coordinate is smaller than -0.4 ret is 0.3
		// if y-coordinate is greater than -0.4 ret is 0.3+0.5=0.8
		ret 						= 0.3 + 0.5*step(-0.4, st.y);
	}
	else { // Part V
		// Combine two step functions to create a gap
		ret 						= step(-0.3, st.y) * (1.0 - step(0.2, st.y));
		// "1.0 - ret" will create a gap
	}
	
	pixel 							= vec3(ret); // make a color out of return value.

	gl_FragColor	= vec4(pixel, 1.0);

}
