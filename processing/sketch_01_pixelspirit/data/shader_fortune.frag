#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415
#define TWO_PI 6.28318530718
#define QRT_PI .78539816339

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

float hexSDF( vec2 st ){
	st = abs( st * 2 - 1 );
	return max( abs(st.y), st.x * 0.866025 + st.y * 0.5);
}

float starSDF(vec2 st, int V, float s){
	st = st * 4.0 - 2.0;
	float a = atan( st.y, st.x) / TWO_PI;
	float seg = a * float (V);
	a = ((floor(seg) + 0.5) / float(V) + mix(s, -s, step(0.5, fract(seg)))) * TWO_PI;
	return abs( dot(vec2(cos(a), sin(a)), st));
}

float raysSDF( vec2 st, int N){
	st -= 0.5;
	return fract( atan( st.y, st.x) / TWO_PI * float(N));
}

void main() {
	vec2 st 	= gl_FragCoord.st/ u_resolution;
	vec3 color 	= vec3( 0.0 );

	float sdf 	= polySDF( st.yx, 8);
	color 		+= fill( sdf, 0.5);
	color 		*= stroke( raysSDF(st, 8), 0.5, 0.2);
	color 		*= step( 0.27, sdf);
	color 		+= stroke( sdf, 0.2, 0.05);
	color 		+= stroke( sdf, 0.6, 0.1);

	gl_FragColor	= vec4(color, 1.0);

}
