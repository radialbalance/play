#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415

uniform vec2 u_resolution;
//uniform vec2 u_mouse;

float stroke( float xPos, float radius, float width ){
		float d 	= step ( radius , xPos + width * 0.5) - 
					  step ( radius, xPos - width * 0.5 );
		return clamp( d, 0.0, 1.0);
}

float circleSDF ( vec2 st ){
	return length (st -.5) * 2;
}

vec2 rotate( vec2 st, float angle ){
	st = mat2( cos(angle), -sin(angle), 
			sin(angle), cos(angle)) * (st - 0.5);
	return st + .5;
}

void main() {
	//vec2 mouseCoord	= u_mouse / u_resolution;
	vec2 st				= gl_FragCoord.xy / u_resolution;
	vec3 color 			= vec3( 0.0 );
	float loops			= 6.0;
	for (float i = 0; i < loops ; i ++){
		float circle    = circleSDF(st + vec2(-0.25, 0.0));
		st 				= rotate(st, radians( (i/ float(loops -1) )* 360 * PI));
		color 			+= stroke (circle, .5, .025);
	}
	gl_FragColor		= vec4(color, 1.0);

}
