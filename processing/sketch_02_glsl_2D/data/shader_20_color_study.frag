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
// Tutorial 20
// COLOR ADDITION AND SUBSTRACTION
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// How to draw a shape on top of another, and how will the layers
// below, affect the higher layers?
//
// In the previous shape drawing functions, we set the pixel
// value from the function. This time the shape function will
// just return a float value between 0.0 and 1.0 to indice the
// shape area. Later that value can be multiplied with some color
// and used in determining the final pixel color.

// A function that returns the 1.0 inside the disk area
// returns 0.0 outside the disk area
// and has a smooth transition at the radius


#define PI 3.1415
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
//uniform vec2 u_mouse;
uniform float u_time;
uniform float uRadius 		= 0.35;
uniform vec2 uOffset1 		= vec2(	0.75, 0.3);
uniform vec2 uOffset2 		= vec2(	1.0, 0.0);
uniform vec2 uOffset3 		= vec2(	0.8, 0.25);

// functions
// functions
float disk(vec2 r, vec2 center, float radius) {
	float distanceFromCenter = length(r-center);
	float outsideOfDisk = smoothstep( radius-0.005, radius+0.005, distanceFromCenter);
	float insideOfDisk = 1.0 - outsideOfDisk;
	return insideOfDisk;
}

void main() {
	
	vec2 st				= gl_FragCoord.xy / u_resolution;
	vec2 st2			= (gl_FragCoord.xy / u_resolution) * 2 - 1;

	vec2 aspect 		= u_resolution/ u_resolution.x;
	st 					*= aspect;
	
	vec3 black 						= vec3(0.0);
	vec3 white 						= vec3(1.0);
	vec3 gray 						= vec3(0.3);
	vec3 col1 						= vec3(0.216, 0.471, 0.698); // blue
	vec3 col2 						= vec3(1.00, 0.329, 0.298); // red
	vec3 col3 						= vec3(0.867, 0.910, 0.247); // yellow
	
	vec3 ret;
	float d;
	
	if(st.x < 1./3.) { // Part I
		// opaque layers on top of each other
		ret 						= gray;
		// assign a gray value to the pixel first
		d 							= disk(st2, vec2(-0.75,0.3), uRadius);
		ret 						= mix(ret, col1, d); // mix the previous color value with
		    						                     // the new color value according to
		    						                     // the shape area function.
		    						                     // at this line, previous color is gray.
		d 							= disk(st2, vec2(-0.65,0.0), uRadius);
		ret 						= mix(ret, col2, d);
		d 							= disk(st2, vec2(-0.7,-0.3), uRadius); 
		ret							= mix(ret, col3, d); // here, previous color can be gray,
		   							                     // blue or pink.
	} 
	else if(st.x < 2./3.) { // Part II
		// Color addition
		// This is how lights of different colors add up
		// http://en.wikipedia.org/wiki/Additive_color
		ret 						= black; // start with black pixels
		ret 						+= disk(st2, vec2(0.0,0.3), uRadius)*col1; // add the new color
		    						                                     // to the previous color
		ret 						+= disk(st2, vec2(0.1,0.0), uRadius)*col2;
		ret 						+= disk(st2, vec2(0.05,-0.3), uRadius)*col3;
		// when all components of "ret" becomes equal or higher than 1.0
		// it becomes white.
	} 
	else if(st.x < 3./3.) { // Part III
		// Color substraction
		// This is how dye of different colors add up
		// http://en.wikipedia.org/wiki/Subtractive_color
		ret 						= white; // start with white
		ret 						-= disk(st2, vec2(0.75,0.3), uRadius)*col1;
		ret 						-= disk(st2, vec2(0.65,0.0), uRadius)* col2;
		ret 						-= disk(st2, vec2(0.7,-0.25), uRadius)* col3;			
		// when all components of "ret" becomes equals or smaller than 0.0
		// it becomes black.
	}
	
	vec3 pixel 						= ret;

	gl_FragColor	= vec4(pixel, 1.0);

}
