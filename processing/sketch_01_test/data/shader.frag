#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
	vec2 st			= gl_FragCoord.st / u_resolution;
	vec2 mouse 		= u_mouse / u_resolution; 
	vec3 color		= vec3(0.0);
	float blue		= sin(u_time);
	color			= vec3(st * mouse, blue);
	gl_FragColor 	= vec4(color, 1.0);
}
