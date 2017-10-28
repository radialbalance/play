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
// Tutorial 2
// SOLID COLOR
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

#define PI 3.1415

uniform vec2 u_resolution;
//uniform vec2 u_mouse;
uniform float u_time;

void main() {
	vec2 st			= gl_FragCoord.st / u_resolution;
	//vec2 mouse 		= u_mouse / u_resolution; 
	vec3 color		= vec3(1.0, 1.0, 0.0);
	gl_FragColor		= vec4(color, 1.0);

 	// Uğur Güney
	//
	// "fragColor" is the output variable of the shader.
	// Its value determines the image on the screen.
	// This shaders sets its value to be the yellow color.

}
