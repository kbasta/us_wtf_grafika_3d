var tx = -4.5;
var speed = 0.05;

function createSquare(){
    var geom = new THREE.Geometry();
    
    geom.vertices.push(new THREE.Vector3(0.5, 0.5, 0));
    geom.vertices.push(new THREE.Vector3(-0.5, 0.5, 0));
    geom.vertices.push(new THREE.Vector3(-0.5, -0.5, 0));
    geom.vertices.push(new THREE.Vector3(0.5, -0.5, 0));

    geom.faces.push(new THREE.Face3(0,1,2));
    geom.faces.push(new THREE.Face3(0,2,3));
    
    return geom;
}

function init(){
    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, aspect, 1, 1000);
    camera.position.z = 8;
    
    var material = new THREE.MeshBasicMaterial({color: 0xff0000});
    square = new THREE.Mesh(createSquare(), material);
    
    scene = new THREE.Scene();
    scene.add(square);
    
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

function animate() {
    requestAnimationFrame(animate);
    square.position.x = tx;
    tx += speed;
    renderer.render(scene, camera);
    
}

function main(){
    requestAnimationFrame(main);
    renderer.render(scene, camera);
}