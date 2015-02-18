//John Dobson
//2/17/15

var shaderProgram;
var gl;
var points;
var canvas;
var transformMatrix;
var uVertexTranslation

	//initialize transformation matrix
	Tx = 0;
	Ty = 0;
	Tz = 0;
	
	var vertices = new Float32Array([
		// left column
          0.0, 0.0, 1.0, 0.0, 0.0,
          0.075, 0.0, 1.0, 0.0, 0.0,
          0.0, 0.375, 1.0, 0.0, 0.0, 
          0.0, 0.375, 1.0, 0.0, 0.0, 
          0.075, 0.0, 1.0, 0.0, 0.0, 
          0.075, 0.375, 1.0, 0.0, 0.0, 
 
          // right top rung
          0.075, 0.0, 0.0, 1.0, 1.0, 
          0.25, 0.0, 0.0, 1.0, 1.0, 
          0.075, 0.075, 0.0, 1.0, 1.0, 
          0.075, 0.075, 0.0, 1.0, 1.0, 
          0.25, 0.0, 0.0, 1.0, 1.0, 
          0.25, 0.075, 0.0, 1.0, 1.0, 
 
          // right middle rung
          0.075, 0.15, 1.0, 1.0, 0.0, 
          0.1675, 0.15, 1.0, 1.0, 0.0, 
          0.075, 0.225, 1.0, 1.0, 0.0, 
          0.075, 0.225, 1.0, 1.0, 0.0, 
          0.1675, 0.15, 1.0, 1.0, 0.0, 
          0.1675, 0.225, 1.0, 1.0, 0.0, 
		  
		  // left top rung
		  -0.175, 0.0, 0.0, 1.0, 1.0, 
		  0.0, 0.0, 0.0, 1.0, 1.0,
		  -0.175, 0.075, 0.0, 1.0, 1.0, 
		  -0.175, 0.075, 0.0, 1.0, 1.0, 
		  0.0, 0.0, 0.0, 1.0, 1.0, 
		  0.0, 0.075, 0.0, 1.0, 1.0, 
		  
		  // left middle rung
		  -0.0875, 0.15, 1.0, 1.0, 0.0, 
		  0.0, 0.15, 1.0, 1.0, 0.0, 
		  -0.0875, 0.225, 1.0, 1.0, 0.0, 
		  -0.0875, 0.225, 1.0, 1.0, 0.0,
		  0.0, 0.15, 1.0, 1.0, 0.0, 
		  0.0, 0.225, 1.0, 1.0, 0.0
	]);	
	
	var n = 30;	
	
function handleKeyDown(event){
		switch(event.keyCode){
			case 49: //'1' Key pressed
				Tx = 0;
				Ty = 0;
				Tz = 0;
				break;
			case 65: //A - Left
				if (Tx <= -0.70){
					Tx = -0.825;
					break;
				}else{
				Tx += -0.1;
				break;
				}
			case 83: //S - Down
				if (Ty <= -0.90){
					Ty = -1.0;
					break;
				}else{
				Ty += -0.1;
				break;}
			case 68: //D - Right
				if (Tx >= 0.7){
					Tx = 0.75;
					break;
				}else{
					Tx += 0.1 
				break;}
			case 87: //W- -Up
				if (Ty >= 0.6){
					Ty = 0.625;
					break;
				}else{
				Ty += 0.1 
				break;}
		}
	};

window.onload = function init()
{
	canvas = document.getElementById( "gl-canvas" );
	//initGL
	gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 0.5, 0.5, 0.5, 1.0 );

	document.onkeydown=handleKeyDown;
	
	//initialize shaders
	shaderProgram = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( shaderProgram );
	gl.program = shaderProgram;
	

	
	//Call function initVertexBuffers
		//create position buffer
	var shapeVertexBuffer = gl.createBuffer();
	if (!shapeVertexBuffer) {
		console.log('Failed to create buffer object');
		return false;
	}
	gl.bindBuffer(gl.ARRAY_BUFFER, shapeVertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	var FSIZE = vertices.BYTES_PER_ELEMENT;
	
	// Associate our shader position variables with our position data buffer
	var vertexPositionAttribute = gl.getAttribLocation( shaderProgram, "aVertexPosition");
	if (vertexPositionAttribute <0) {
		console.log('Failed to get hte storage location of vertexPositionAttribute');
		return -1;
	}
	gl.vertexAttribPointer(vertexPositionAttribute, 2, gl.FLOAT, false, FSIZE*5, 0);
	gl.enableVertexAttribArray(vertexPositionAttribute);

	// Associate shader color variables with our color buffer
	var vertexColorAttribute = gl.getAttribLocation( shaderProgram, "aVertexColor");
	if(vertexColorAttribute <0){
		console.log('Failed to get the storage location of vertexColorAttribute');
		return -1;
	}
	gl.vertexAttribPointer(vertexColorAttribute, 3, gl.FLOAT, false, FSIZE*5, FSIZE*2);
	gl.enableVertexAttribArray(vertexColorAttribute);
	
	
	//Translation
	uVertexTranslation = gl.getUniformLocation( shaderProgram, "uVertexTranslation");
	transformMatrix = mat4();
	
	
	render();
}
	

	
function render(){
	gl.clear( gl.COLOR_BUFFER_BIT );

	transformMatrix = translate(Tx, Ty, Tz);
	gl.uniformMatrix4fv(uVertexTranslation, false, flatten(transformMatrix));
	gl.drawArrays(gl.TRIANGLES,0, n);
	
	window.requestAnimFrame(render);
	
}
    
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
