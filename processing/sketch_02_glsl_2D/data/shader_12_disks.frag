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
// Tutorial 12
// DISKS
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Let's draw disks
//
// So, in GLSL we don't give a command of "draw this disk here with that
// color". Instead we use an indirect command such as "if the pixel 
// coordinate is inside this disk, put that color for the pixel"
// The indirect commands are a bit counter intuitive until you
// get used to that way of thinking.

#define PI 3.1415

uniform vec2 u_resolution;
//uniform vec2 u_mouse;
uniform float u_time;

//functions

void main() {
	
	vec2 st				= (gl_FragCoord.xy / u_resolution) * 2 - 1;
	vec2 aspect 		= u_resolution/ u_resolution.x;
	st 					*= aspect;
	

	vec3 bgCol 						= vec3(0.3);
	vec3 col1 						= vec3(0.216, 0.471, 0.698); // blue
	vec3 col2 						= vec3(1.00, 0.329, 0.298); // yellow
	vec3 col3 						= vec3(0.867, 0.910, 0.247); // red

	vec3 pixel 						= bgCol;
	
	// To draw a shape we should know the analytic geometrical
	// expression of that shape.
	// A circle is the set of points that has the same distance from
	// it its center. The distance is called radius.
	// The distance from the coordinate center is sqrt(x*x + y*y)
	// Fix the distance as the radius will give the formula for
	// a circle at the coordinate center
	// sqrt(x*x + y*y) = radius
	// The points inside the circle, the disk, is given as
	// sqrt(x*x + y*y) < radius
	// Squaring both sides will give
	// x*x + y*y < radius*radius
	float radius 					= 0.8;
	if( st.x * st.x + st.y * st.y < radius * radius ) {
		pixel = col1;
	}
	
	// There is a shorthand expression for sqrt(v.x*v.x + v.y*v.y)
	// of a given vector "v", which is "length(v)"
	if( length(st) < 0.3) {
		pixel = col3;
	}
	
	// draw a disk of which center is not at (0,0).
	// Say the center is at c: (c.x, c.y). 
	// The distance of any point r: (r.x, r.y) to c is 
	// sqrt((r.x-c.x)^2+(r.y-c.y)^2)
	// define a distance vector d: (r.x - c.x, r.y - c.y)
	// in GLSL d can be calculated "d = r - c".
	// Just as in division, substraction of two vectors is done
	// component by component.
	// Then, length(d) means sqrt(d.x^2+d.y^2)
	// which is the distance formula we are looking for.
	vec2 center = vec2(0.9, -0.4);
	vec2 d = st - center;
	if( length(d) < 0.6) {
		pixel = col2;
	}
	// This shifting of the center of the shape works for any
	// kind of shape. If you have a formula in terms of r
	// f(r) = 0, then f(r-c)=0 expresses the same geometric shape
	// but its coordinate is shifted by c.

	gl_FragColor	= vec4(pixel, 1.0);

}
