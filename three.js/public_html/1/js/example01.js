function init(){
    camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
    camera.position.z = 5;
    
    var v1 = new THREE.Vector3(0.0, 0.5, 0);
    var v2 = new THREE.Vector3(-0.5, -0.5, 0);
    var v3 = new THREE.Vector3(0.5, -0.5, 0);

    var face = new THREE.Face3(0, 1, 2);
    
    var geom = new THREE.Geometry();
    geom.vertices.push(v1);
    geom.vertices.push(v2);
    geom.vertices.push(v3);
    geom.faces.push(face);
    
    var triangle = new THREE.Mesh(geom);
    
    scene = new THREE.Scene();
    scene.add(triangle);
    
    renderer = new THREE.WebGLRenderer();
    document.body.appendChild(renderer.domElement)
}

function main(){
    requestAnimationFrame(main);
    renderer.render(scene, camera)
}