#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
//uniform vec2 u_mouse;

void main() {
	//vec2 mouseCoord	= u_mouse / u_resolution;
	vec2 st			= gl_FragCoord.xy / u_resolution;
	vec3 color 		= vec3( 0.0 );
	color 			+= step ( 0.5 , (st.x + st.y) * 0.5 );
	gl_FragColor	= vec4(color, 1.0);

}
