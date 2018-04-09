function init(){
    camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
    camera.position.z = 5;
    
    var v1 = new THREE.Vector3(0, 2, 0);
    var v2 = new THREE.Vector3(-2, 0, 0);
    var v3 = new THREE.Vector3(2, -2, 0);
    var v4 = new THREE.Vector3(-2, 2, 0);

    var face = new THREE.Face3(0, 1, 3);
    var face1 = new THREE.Face3(0, 2, 4);
    
    var geom = new THREE.Geometry();
    geom.vertices.push(v4);
    geom.vertices.push(v2);
    geom.vertices.push(v3);
    geom.faces.push(face);
    
    var geom1 = new THREE.Geometry();
    geom1.vertices.push(v1);
    geom1.vertices.push(v2);
    geom1.vertices.push(v4);
    geom1.faces.push(face1);
    
    geom.faces[0].vertexColors[0] = new THREE.Color(0xFF0000);
    geom.faces[0].vertexColors[1] = new THREE.Color(0xFF00FF);
    geom.faces[0].vertexColors[2] = new THREE.Color(0x0000FF);
    
    geom1.faces[0].vertexColors[0] = new THREE.Color(0xFF00FF);
    geom1.faces[0].vertexColors[1] = new THREE.Color(0xFF0000);
    geom1.faces[0].vertexColors[2] = new THREE.Color(0x0000FF);
    
    var material = new THREE.MeshBasicMaterial({vertexColors:THREE.VertexColors});
    var triangle = new THREE.Mesh(geom, material);
    var triangle1 = new THREE.Mesh(geom1, material);
    
    scene = new THREE.Scene();
    scene.add(triangle);
    scene.add(triangle1);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    //camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function main(){
    requestAnimationFrame(main);
    renderer.render(scene, camera)
}