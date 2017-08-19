#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415

uniform vec2 u_resolution;
//uniform vec2 u_mouse;

float stroke( float xPos, float center, float width ){
		float d 	= step ( center , xPos + width * 0.5) - 
					  step ( center, xPos - width * 0.5 );
		return clamp( d, 0.0, 1.0);
}

void main() {
	//vec2 mouseCoord	= u_mouse / u_resolution;
	vec2 st			= gl_FragCoord.xy / u_resolution;
	vec3 color 		= vec3( 0.0 );
	float offset	= cos( st.y * PI ) * .15;
	color 			+= stroke ( st.x, offset + .25 , .1);
	color 			+= stroke ( st.x, offset + .5 , .1);
	color 			+= stroke ( st.x, offset + .75 , .1);
	gl_FragColor	= vec4(color, 1.0);

}
