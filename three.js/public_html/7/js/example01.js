var scene, camera, renderer;

function init(){
    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(70, aspect, 1, 10000);
    camera.position.z = 10;
    camera.position.x = 2;
    scene = new THREE.Scene();
    
    var light = new THREE.DirectionalLight(0xffffff, 1, 500);
    var light1 = new THREE.DirectionalLight(0xffffff, 1, 500);
    light.position.set(10, -45, 45);
    light1.position.set(10, 100, 45);
    scene.add(light);
    scene.add(light1);

    var color = "#fff";
    var material = new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        shading: THREE.FlatShading,
        side: THREE.DoubleSide
    });
    var material1 = new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        shading: THREE.FlatShading,
        side: THREE.DoubleSide
    });
    
    var loader = new THREE.OBJLoader();
    //load (url: String , onLoad: Function, onPrograss: function, onError: function)
    loader.load('obj/P.obj',  function(object){
       var l = object.children.length;
       for (var i = 0; i < l; i++){
           object.children[i].material = material1;
       }
       mesh1 = object;
       mesh1.position.x = -4;
       scene.add(mesh1);
       buildGUI();
    });
    loader.load('obj/Shelby.obj',  function(object){
       var l = object.children.length;
       for (var i = 0; i < l; i++){
           object.children[i].material = material;
       }
       mesh2 = object;
       mesh2.position.x = 4;
       mesh2.position.y = -1;
       scene.add(mesh2);
       buildGUI();
    });
    
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize, false);
    control();
    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function control(){
    controls = new THREE.TrackballControls(camera, renderer.domElement);
}

function rotateMeshes(){
    mesh1.rotation.y += 0.001;
    mesh2.rotation.y += 0.001;
}

function animate() {
    controls.update();
    requestAnimationFrame(animate);
    rotateMeshes();
    renderer.render(scene, camera);
    
}

function main(){
    init();
}