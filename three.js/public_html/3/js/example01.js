var tx = -5.5;
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
    square.rotation.z += speed;
    if (square.position.x >= -4 && square.position.y === -3){
        square.position.x += speed;
        square.material.color.setHex(0x0ff000);
    }
    if (square.position.x >= 3 && square.position.y >= -3){
        square.position.y += speed;
        square.material.color.setHex(0xff0000);
    }
    if ( square.position.y >= 3){
        square.position.x -= speed;
        square.material.color.setHex(0x0000ff);
    }
    if (square.position.x <= -4){
        square.position.y -= speed;
        square.material.color.setHex(0xffff00);
    }   
    renderer.render(scene, camera);
}

function main(){
    square.position.x = -4;
    square.position.y = -3;
    requestAnimationFrame(animate);
}