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
    
    var light = new THREE.PointLight(0xff00ff, 1, 500);
    light.position.set(10, 10, 50);
    scene.add(light);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function setTexture(path){
    path = 'img/' + path;
    var texture = new THREE.TextureLoader().load(path);
    var material = new THREE.MeshBasicMaterial({map: texture});
    return material;
}

function rotateMeshes(){
    mesh.rotation.y += 0.02;
    mesh.rotation.z += 0.02;
    mesh.rotation.x += 0.005;
}

function animate() {
    requestAnimationFrame(animate);
    rotateMeshes();
    renderer.render(scene, camera);
}

function main(){
    init();
    requestAnimationFrame(animate);
}