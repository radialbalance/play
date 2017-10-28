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
// Tutorial 18
// ANTI-ALIASING WITH SMOOTHSTEP
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// A shader can be created by first constructing individual parts
// and composing them together.
// There are different ways of how to combine different parts.
// In the previous disk example, different disks were drawn on top
// of each other. There was no mixture of layers. When disks
// overlap, only the last one is visible.
//
// Let's learn mixing different data types (in this case vec3's
// representing colors


#define PI 3.1415
#define TWOPI 6.28318530718

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


void main() {
	
	vec2 st				= (gl_FragCoord.xy / u_resolution) * 2 - 1;
	float ts			= gl_FragCoord.x / u_resolution.x;
	vec2 aspect 		= u_resolution/ u_resolution.x;
	st 					*= aspect;
	st.x 				-= 0.15;
	
	float xMax 						= u_resolution.x / u_resolution.y;
	
	vec3 bgCol 						= vec3(0.3);
	vec3 col1 						= vec3(0.216, 0.471, 0.698); // blue
	vec3 col2 						= vec3(1.00, 0.329, 0.298); // yellow
	vec3 col3 						= vec3(0.867, 0.910, 0.247); // red

	vec3 pixel 						= bgCol;
	float m;
	
	float radius 					= 0.2; // increase this to see the effect better
	if( ts < 0.25 ) { // Part I
		// no interpolation, yes aliasing
		m 							= step( 	radius, 
												length(st - vec2(-0.5*xMax-0.4,0.0)) );
		// if the distance from the center is smaller than radius,
		// then mix value is 0.0
		// otherwise the mix value is 1.0
		pixel 						= mix(	col1, 
											bgCol, 
											m);
	}
	else if( ts < 0.5 ) { // Part II
		// linearstep (first order, linear interpolation)
		m 							= linearstep( 	radius-0.005, 
													radius+0.005, 
													length(st - vec2(-0.0*xMax-0.4,0.0)) );
		// mix value is linearly interpolated when the distance to the center
		// is 0.005 smaller and greater than the radius.
		pixel 						= mix(	col1, 
											bgCol, 
											m);
	}	
	else if( ts < 0.75 ) { // Part III
		// smoothstep (cubical interpolation)
		m 							= smoothstep( 	radius-0.005, 
													radius+0.005, 
													length(st - vec2(0.5*xMax-0.4,0.0)) );
		pixel 						= mix(	col1, 
											bgCol, 
											m);
	}
	else if( ts < 1.0 ) { // Part IV
		// smootherstep (sixth order interpolation)
		m 							= smootherstep( 	radius-0.005, 
														radius+0.005, 
														length(st - vec2(1.0*xMax-0.4,0.0)) );
		pixel 						= mix(	col1, 
											bgCol, 
											m);
	}

	gl_FragColor	= vec4(pixel, 1.0);

}
