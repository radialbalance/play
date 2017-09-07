#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415
#define TWO_PI 2 * PI

uniform vec2 u_resolution;
//uniform vec2 u_mouse;

uniform float u_time;


float stroke( float xPos, float center, float width ){
		float d 	= step ( center , xPos + width * 0.5) - 
					  step ( center, xPos - width * 0.5 );
		return clamp( d, 0.0, 1.0);
}

 float circleSDF ( vec2 st ){
 	return length (st -.5) * 2;
}

float fill( float x, float size){
	return 1.0 - step (size, x);
}

float  rectSDF ( vec2 st, vec2 size){
	st = st * 2.0 - 1.0;
	// * 2.0 - 1.0 is commonly used to change range from 0 - 1 to be -1 to 1.
	return max ( abs ( st.x / size.x), abs ( st.y / size.y));
}

float crossSDF ( vec2 st, float crossSize){
	vec2 size = vec2 ( .25, crossSize);
	return min ( rectSDF(st, size.xy), rectSDF(st, size.yx));
}

float flip ( float value, float boundary){
	return mix (value , 1.0 - value, boundary);
	// 1.0 - v is the inverse of v
}

float vesicaSDF (vec2 st, float w){
	vec2 offset = vec2 ( w * .5, 0 );
	return max (circleSDF ( st - offset ), circleSDF( st + offset ));
}

float triSDF (vec2 st){
	st = ( st * 2.0 - 1 ) * 2.0;
	return max( abs(st.x) * 0.866025 + st.y * 0.5, -st.y * 0.5 );
}

float rhombSDF(vec2 st){
	return max(triSDF(st), triSDF(vec2(st.x, 1-st.y)));
}

vec2 rotate(vec2 st, float a){
	st = mat2(cos(a), -sin(a), 
			   sin(a), cos(a)) * (st - .5); 
	return st + .5;
}

float polySDF(vec2 st, int Vertices){
	st = st * 2.0 - 1.0;
	// Multiplying by 2 and subtracting by 1 changes the range to -0.5 to 0.5. 
	//This changes our coordinate space to move middle of our coordinate space to the center of our screen.
	float a = atan( st.x , st.y ) + PI;
	float r = length(st);
	float v = TWO_PI / float(Vertices);
	return cos(floor (0.5 + a/v) * v - a) * r;
}

void main() {
	vec2 st 	= gl_FragCoord.st/ u_resolution;
	vec3 color 	= vec3( 0.0 );
	float d1	= polySDF( st, 5 );
	//color 		+= d1;
	vec2 ts 	= vec2( st.x, 1 - st.y );
	float d2 	= polySDF(ts, 5);
	color 		+= fill( d1, 0.75 ) * fill( fract(d1 * 5.0), 0.5 );
	color 		-= fill( d1, 0.6 ) * fill( fract(d2 * 4.9), 0.45 );
	gl_FragColor	= vec4(color, 1.0);

}
