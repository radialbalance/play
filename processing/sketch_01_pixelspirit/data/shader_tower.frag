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

// float circleSDF ( vec2 st ){
// 	return length (st -.5) * 2;
// }

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

float flip ( float v, float pct){
	return mix (v , 1.0 - v, pct);
}

void main() {
	//vec2 mouseCoord	= u_mouse / u_resolution;
	vec2 st			= gl_FragCoord.xy / u_resolution;
	vec3 color 		= vec3( 0.0 );
	float rect		= rectSDF (st , vec2 (0.5, 1.0));
	float diag 		= (st.x + st.y) * 0.5;
	color 			+= flip( fill(rect, 0.6), stroke(diag, 0.5, 0.01));
	// color 			+= fill (rect, 0.5);
	// float cross 	= crossSDF( st, 0.75);
	// color 			*= step ( 0.5, fract (cross * 4.0));
	// color 			*= step ( 1.0, cross);
	// color 			+= fill (cross, 0.5);
	// color 			+= stroke (rect, 0.65, 0.05);
	// color 			+= stroke (rect, 0.75, 0.015);
	gl_FragColor	= vec4(color, 1.0);

}
