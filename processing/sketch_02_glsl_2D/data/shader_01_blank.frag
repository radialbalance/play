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
// Tutorial 1
// VOID. BLANK SCREEN.
// - - 

#define PI 3.1415

uniform vec2 u_resolution;
//uniform vec2 u_mouse;
uniform float u_time;

void main() {
	vec2 st			= gl_FragCoord.st / u_resolution;
	//vec2 mouse 		= u_mouse / u_resolution; 
	vec3 color		= vec3(0.0);
	gl_FragColor		= vec4(color, 1.0);

	// Uğur Güney
	// "main" function is called several times per second to produce
	// the shader effect.
	// The system aims to produces a speed of 60 frames per second (FPS).
	// But if the GLSL script is computationally hard, then the frame
	// rate drops. (You can read the frame rate at the info bar below
	// the screen.
	//
	// Because we are not doing anything in the function
	// this shader will produce a black screen.
}

