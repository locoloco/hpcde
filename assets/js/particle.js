const particleWave = () => {
	const heroBanner = document.querySelector(".hero-equal-height");
	let w = heroBanner.clientWidth;
	let h = heroBanner.clientHeight;
	const dpr = window.devicePixelRatio;
  
	const fov = 50;
	const fovRad = fov * (Math.PI / 180);
	const dist = h / 2 / Math.tan(fovRad);
  
	const clock = new THREE.Clock();
	const pointSize = 2 * dpr;
  
	// const renderer = new THREE.WebGLRenderer();
	const renderer = new THREE.WebGLRenderer( { alpha: true } );
	renderer.setSize(w, h);
	renderer.setClearColor(new THREE.Color("#fff"), 1);
	renderer.setPixelRatio(dpr);
	// renderer.setClearColor( color );
	renderer.setClearAlpha( 0.1 );
  
	const container = document.getElementById("webgl-canvas");
	container.appendChild(renderer.domElement);
  
	const camera = new THREE.PerspectiveCamera(fov, w / h, 1, dist * 8);
	camera.position.x = 0;
	camera.position.y = 50;
	camera.position.z = 100;
  
	const scene = new THREE.Scene();
  
	// TODO: This fog isn't working for some reason
	const fogColor = '#fff'; // white
	const near = 1.8;
	const far = 2;
	scene.fog = new THREE.Fog(fogColor, near, far);
	// scene.background = new THREE.Color(fogColor);
	scene.background = null;
  
	const geo = new THREE.BufferGeometry();
	const positions = [];
  
	const width = 200 * (w / h);
	const depth = 200;
	const distance = 5;
  
	for (let x = 0; x < width; x += distance) {
	  for (let z = 0; z < depth; z += distance) {
		positions.push(-width / 2 + x, -30, -depth / 2 + z);
	  }
	}
	const positionAttribute = new THREE.Float32BufferAttribute(positions, 3);
	geo.setAttribute("position", positionAttribute);
  
	const mat = new THREE.ShaderMaterial({
	  uniforms: {
		u_time: {
		  value: 0.0 },
  
		color1: {
		  value: new THREE.Color("#66d0b6") },
  
		color2: {
		  value: new THREE.Color("#6a569c") },
  
		color3: {
		//   value: new THREE.Color("#f16078") },
		  value: new THREE.Color("#88b4ee") },
  
		color4: {
		  value: new THREE.Color("#6a569c") },
  
		color5: {
		  value: new THREE.Color("#66d0b6") },
  
		resolution: { type: "v2", value: new THREE.Vector2(w * dpr, h * dpr) },
		pointSize: { value: pointSize } },
  
	  vertexShader: `
		  precision highp float;
		  #define M_PI 3.1415926535897932384626433832795
		  
		  uniform float u_time;
		  uniform float pointSize;
		  
		  void main() {
			vec3 p = position;
			p.y += (
			   cos(p.x / M_PI * 8.0 + u_time * 1.5) * 15.0 +
			   sin(p.z / M_PI * 8.0 + u_time * 1.5) * 15.0 + 
			   60.0
			 ) ;
			
			gl_PointSize = pointSize;
			gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
		  }   
	  
	  `,
	  fragmentShader: `
		  precision highp float;
		  
		  uniform vec3 color1;
		  uniform vec3 color2;
		  uniform vec3 color3;
		  uniform vec3 color4;
		  uniform vec3 color5;
		  uniform vec2 resolution;
		  
		  void main() {
			// create circles instead of squares
			if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
			
			float x = gl_FragCoord.x;
			float step1 = 0.25;
			float step2 = 0.45;
			float step3 = 0.55;
			float step4 = 0.75;
			float step5 = 1.00;
			
			float mixValue = x / resolution.x;
			
			// create color stops using 'mix', and convert the progress through each 'step'
			// to a value between 0 and 1
			vec3 mixedColor;
			if(mixValue < step1) {
			  mixedColor = mix(color1, color2, mixValue / step1);
			} else if (mixValue >= step1 && mixValue < step2) {
			  mixedColor = mix(color2, color3, ((mixValue - step1) / (step2 - step1)));
			} else if (mixValue >= step2 && mixValue < step3) {
			  mixedColor = color3;
			} else if (mixValue >= step3 && mixValue < step4) {
			  mixedColor = mix(color3, color4, ((mixValue - step3) / (step4 - step3)));
			} else {
			  mixedColor = mix(color4, color5, ((mixValue - step4) / (step5 - step4)));
			}
			
			gl_FragColor = vec4(mixedColor, 1.0);
		  }
	  ` });
  
  
	const mesh = new THREE.Points(geo, mat);
	scene.add(mesh);
  
	function render() {
	  const time = clock.getElapsedTime();
	  mesh.material.uniforms.u_time.value = time;
	  renderer.render(scene, camera);
	  requestAnimationFrame(render);
	}
	render();
  
	function onWindowResize() {
	  w = heroBanner.clientWidth;
	  h = heroBanner.clientHeight;
	  camera.aspect = w / h;
	  camera.updateProjectionMatrix();
	  renderer.setSize(w, h);
	}
	window.addEventListener("resize", onWindowResize);
  };
  
  window.addEventListener("load", particleWave);