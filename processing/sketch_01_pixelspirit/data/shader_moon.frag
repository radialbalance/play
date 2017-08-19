#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415

uniform vec2 u_resolution;
//uniform vec2 u_mouse;

// float stroke( float xPos, float center, float width ){
// 		float d 	= step ( center , xPos + width * 0.5) - 
// 					  step ( center, xPos - width * 0.5 );
// 		return clamp( d, 0.0, 1.0);
// }

float circleSDF ( vec2 st ){
	return length (st -.5) * 2;
}

float fill( float x, float size){
	return 1.0 - step (size, x);
}

void main() {
	//vec2 mouseCoord	= u_mouse / u_resolution;
	vec2 st			= gl_FragCoord.xy / u_resolution;
	vec3 color 		= vec3( 0.0 );
	// float sdf		= .5 + ( st.x - st.y) * .5;
	color 			+= fill (circleSDF(st), .65);
	vec2 offset		= vec2(.1, .05);
	color 			-= fill (circleSDF(st-offset), .5);
	gl_FragColor	= vec4(color, 1.0);

}
