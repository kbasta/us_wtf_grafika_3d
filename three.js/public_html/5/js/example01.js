var scene, camera, renderer;

function init(){
    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(70, aspect, 1, 10000);
    camera.position.z = 15;
    scene = new THREE.Scene();
    
    // cieniowanie płaskie
    //mesh = new THREE.Mesh(new THREE.TorusGeometry(5 , 3, 16, 30), new THREE.MeshPhongMaterial({shading: THREE.FlatShading}));
    // cieniowanie Gourauda
    //mesh = new THREE.Mesh(new THREE.TorusGeometry(5 , 3, 16, 30), new THREE.MeshLambertMaterial({shading: THREE.SmoothShading}));
    // cienieowanie Phonga
    mesh = new THREE.Mesh(new THREE.TorusGeometry(5 , 3, 16, 30), new THREE.MeshPhongMaterial({shading: THREE.SmoothShading}));
    scene.add(mesh);
    
    var light = new THREE.DirectionalLight(0xc62ab2, 1, 500);
    light.position.set(10, 10, 45);
    scene.add(light);
    
    control();
    
    renderer = new THREE.WebGLRenderer();
    //renderer.setClearColor(0x00ff00, 1);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    buildGUI();
    
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function control(){
//    control = new THREE.OrbitControls(camera);
//    control = new THREE.TrackballControls(camera);
//    control.rotateSpeed = 5.0;
//    control.zoomSpeed = 1.0;
//    control.panSpeed = 0.1;
}

function rotateMeshes(){
    mesh.rotation.y += 0.02;
    mesh.rotation.z += 0.02;
    mesh.rotation.x += 0.01;
}

function animate() {
    requestAnimationFrame(animate);
    rotateMeshes();
    //control.update();
    renderer.render(scene, camera);
}

function main(){
    init();
    requestAnimationFrame(animate);
}